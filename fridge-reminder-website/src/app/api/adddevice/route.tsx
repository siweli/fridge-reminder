import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const otp_code = formData.get("otpcode")?.toString()
    const user_id = cookies().get("user_id")

    if (!user_id) return
    if (otp_code == null) return


    const device_otp = await prisma.device_temp.findUnique({
        where: {
            code: otp_code,
        }
    })

    if (!device_otp) return

    await prisma.devices.create ({
        data: {
            token: device_otp.token,
            user_id: parseInt(user_id.value)
        }
    })

    await prisma.device_temp.delete ({
        where: {
            code: otp_code
        }
    })

    redirect("../account/devices")

}