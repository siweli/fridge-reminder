import prisma from "../../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(req: NextRequest) {
    const device_token = await req.json()
    const otp_code = randomBytes(2).toString("hex")

    await prisma.device_temp.create ({
        data: {
            token: device_token.data,
            code: otp_code,
        }
    })

    return NextResponse.json({
        "code": otp_code
    })
}