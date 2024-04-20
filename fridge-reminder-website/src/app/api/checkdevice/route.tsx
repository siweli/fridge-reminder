import prisma from "../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const device_token = await req.json()

    const device_exists = await prisma.devices.findFirst ({
        where: {
            token: device_token.data
        }
    })

    if (device_exists) {
        return NextResponse.json({
            "claimed": true
        })
    } else {
        return NextResponse.json({
            "claimed": false
        })
    }
}