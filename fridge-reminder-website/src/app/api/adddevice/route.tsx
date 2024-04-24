import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const otp_code = formData.get("otpcode")?.toString()
    const user_id = cookies().get("user_id")

    if (otp_code == null || !user_id) return // check form data is not null and if a user is logged in

    const device_otp = await prisma.device_temp.findUnique({ // get the device token associated with the code (if any)
        where: {
            code: otp_code,
        }
    })

    async function delete_code(otp_code: string) { // function to delete the otp code if it exists as this is used multiple times
        await prisma.device_temp.delete ({
            where: {
                code: otp_code
            }
        })
    }

    if (!device_otp) { // if the code didn't exist then return user to devices page
        console.log("code does not exist")
        return redirect("../account/devices")
    }

    const device_exists = await prisma.devices.findFirst ({ // check if the device isn't already claimed
        where: {
            token: device_otp.token
        }
    })

    if (device_exists) { // if it is then redirect the user back and delete the otp code
        console.log("device claimed already")
        delete_code(otp_code)
        return redirect("../account/devices")
    }

    await prisma.devices.create ({ // if all checks passed then assign the user id logged in to the device token
        data: {
            token: device_otp.token,
            user_id: parseInt(user_id.value)
        }
    })

    delete_code(otp_code) // delete the code after it has been used
    redirect("../account/devices")
}