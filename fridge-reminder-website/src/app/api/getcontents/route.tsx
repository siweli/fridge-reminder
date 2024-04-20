import prisma from "../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(req: NextRequest) {
    const device_token = await req.json()

    const devices = await prisma.devices.findFirst ({
        where: {
            token: device_token.data
        }
    })


    const fridge_contents = await prisma.items.findMany({
        where: {
            device_id: devices?.id
        },
    });

    return NextResponse.json({
        "contents": fridge_contents
    })
}