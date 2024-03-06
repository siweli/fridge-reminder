import prisma from "../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(req: NextRequest) {
    const device_token = await req.json()
    const otp_code = randomBytes(2).toString("hex")

    

    const temp_code = await prisma.device_temp.create ({
        data: {
            token: device_token.data,
            code: otp_code,
        }
    })

    return NextResponse.json({
        "code": otp_code
    })
}

export async function GET(req: NextRequest) {
    const otp_code = randomBytes(2).toString("hex")

    // const a = await prisma.devices.create({
    //     data: {
    //         token: "ignore",
    //         user_id: undefined,
    //         code: otp_code,
    //     }
    // })

    // const a = await prisma.device_temp.create({
    //     data: {
    //         code: otp_code,
    //     }
    // })

    return NextResponse.json({
        // "id": a.id, 
        "code": otp_code
    })
}