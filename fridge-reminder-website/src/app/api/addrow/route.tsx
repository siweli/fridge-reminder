import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const device_id = formData.get("device_id")?.toString()
    const item_name = formData.get("item_name")?.toString()
    const expiry_date = formData.get("expire_date")?.toString()
    if (item_name == null || expiry_date == null || device_id == null) return // satisfies an error with null form data
    if (item_name == "" || expiry_date == "" || device_id == "") { // dont allow empty entries
        redirect("../dashboard/table?id="+device_id)
    }

    await prisma.items.create({ // create the item in the database
        data: {
            name: item_name,
            expires: expiry_date,
            device_id: parseInt(device_id)
        },
    })

    redirect("../dashboard/table?id="+device_id)
}