import prisma from "../../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const device_token = await req.json()

    // check that the device token that this json is coming from exists,
    // if it does it returns the device entry including device id
    const devices = await prisma.devices.findFirst ({
        where: {
            token: device_token.data
        }
    })

    if (!devices) {
        return NextResponse.json({
            "valid": false
        })
    }

    // return all contents associated with the device id
    const fridge_contents = await prisma.items.findMany({
        where: {
            device_id: devices?.id
        },
    });

    // return the contents as a JSON
    return NextResponse.json({
        "contents": fridge_contents
    })
}