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


    const a = await prisma.devices.update({
        where: {
            code: otp_code,
        },
        data: {
            user_id: parseInt(user_id.value)
        }
    })

    redirect("../account/devices")

}