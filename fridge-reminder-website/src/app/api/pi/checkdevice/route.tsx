import prisma from "../../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const device_token = await req.json()

    // check if the device is claimed yet
    const device_exists = await prisma.devices.findFirst ({
        where: {
            token: device_token.data
        }
    })

    // return an appropriate response based on if it is claimed or not
    if (device_exists) {
        return NextResponse.json({
            "claimed": true
        })
    }
    return NextResponse.json({
        "claimed": false
    })
}