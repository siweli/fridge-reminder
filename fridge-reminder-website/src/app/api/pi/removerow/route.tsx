import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../../libaries/prisma"

export async function POST(req: NextRequest) {
    const pi_json = await req.json()

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
    
    await prisma.items.delete({
        where: {
            id: parseInt(pi_json.id),
        }
    })

    return NextResponse.json({
        "valid": true
    })
}