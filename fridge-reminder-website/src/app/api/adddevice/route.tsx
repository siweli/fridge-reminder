import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const otp_code = formData.get("otpcode")?.toString()
    const user_id = cookies().get("user_id")

    if (otp_code == null || !user_id) return

    const device_otp = await prisma.device_temp.findUnique({
        where: {
            code: otp_code,
        }
    })

    async function delete_code(otp_code: string) {
        await prisma.device_temp.delete ({
            where: {
                code: otp_code
            }
        })
    }

    if (!device_otp) {
        console.log("code does not exist")
        return redirect("../account/devices")
        // return new NextResponse("code does not exist")
    }

    const device_exists = await prisma.devices.findUnique ({
        where: {
            token: device_otp.token
        }
    })

    if (device_exists) {
        console.log("device claimed already")
        delete_code(otp_code)
        // new NextResponse("device claimed already")
        return redirect("../account/devices")
        // return new NextResponse("device claimed already")
    }

    await prisma.devices.create ({
        data: {
            token: device_otp.token,
            user_id: parseInt(user_id.value)
        }
    })

    delete_code(otp_code)

    redirect("../account/devices")

}