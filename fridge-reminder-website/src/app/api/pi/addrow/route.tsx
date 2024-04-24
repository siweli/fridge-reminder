import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../../libaries/prisma"

export async function POST(req: NextRequest) {
    const pi_json = await req.json()

    // check that the device token that this json is coming from exists,
    // if it does it returns the device entry including device id
    const device_exists = await prisma.devices.findFirst ({
        where: {
            token: pi_json.data
        }
    })

    if (!device_exists) {
        return NextResponse.json({
            "valid": false
        })
    }
    
    // if the device exists this adds the contents of the device
    await prisma.items.create({
        data: {
            name: pi_json.item_name,
            expires: pi_json.expires,
            device_id: device_exists.id
        },
    })

    return NextResponse.json({
        "valid": true
    })
}