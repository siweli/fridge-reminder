import prisma from "../../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const device_contents = await req.json()
    console.log(device_contents.contents)

    const device_exists = await prisma.devices.findFirst ({
        where: {
            token: device_contents.token
        }
    })

    if (!device_exists) {
        return NextResponse.json({
            "error":"token not recognised"
        })
    }

    await prisma.items.deleteMany({
        where: {
            device_id: device_exists.id
        }
    })

    for (let i=0; i<device_contents.contents.length; i++) {
        await prisma.items.create({
            data: {
                name: device_contents.contents[i][0],
                expires: device_contents.contents[i][1],
                device_id: device_exists.id
            }
        })
    }

    // await prisma.device_temp.create ({
    //     data: {
    //         token: device_token.data,
    //         code: otp_code,
    //     }
    // })

    return NextResponse.json({
        "code": "received"
    })
}