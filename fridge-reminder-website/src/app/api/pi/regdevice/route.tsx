import prisma from "../../../../libaries/prisma"
import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"

export async function POST(req: NextRequest) {
    const device_token = await req.json()

    // check that the device token that this json is coming from exists,
    // if it does it returns the device entry including device id
    const device_exists = await prisma.devices.findFirst ({
        where: {
            token: device_token.data
        }
    })

    // return that it is claimed
    if (device_exists) {
        return NextResponse.json({
            "claimed": true
        })
    }

    // generate a otp code that is 4 characters long
    const otp_code = randomBytes(2).toString("hex")

    // create a temporary record of this otp
    await prisma.device_temp.create ({
        data: {
            token: device_token.data,
            code: otp_code,
        }
    })

    // return that it is not claimed as well as the otp code
    return NextResponse.json({
        "claimed": false, "code": otp_code
    })
}