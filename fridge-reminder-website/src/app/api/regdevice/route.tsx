import prisma from "../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function GET(req: NextRequest) {
    const otp_code = randomBytes(2).toString("hex")

    const a = await prisma.devices.create({
        data: {
            token: "ignore",
            user_id: undefined,
            code: otp_code,
        }
    })

    return NextResponse.json({
        "id": a.id, 
        "code": otp_code
    })
}