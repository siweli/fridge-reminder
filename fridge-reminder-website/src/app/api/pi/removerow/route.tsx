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
    
    // delete the row associated with the row id passed through in the JSON
    await prisma.items.delete({
        where: {
            id: parseInt(pi_json.id),
        }
    })

    return NextResponse.json({
        "valid": true
    })
}