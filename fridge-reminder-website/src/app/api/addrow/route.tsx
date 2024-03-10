import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const device_id = formData.get("device_id")?.toString()
    const item_name = formData.get("item_name")?.toString()
    const expiry_date = formData.get("expire_date")?.toString()
    if (item_name == null || expiry_date == null || device_id == null) return

    await prisma.items.create({
        data: {
            name: item_name,
            expires: expiry_date,
            device_id: parseInt(device_id)
        },
    })

    redirect("../dashboard/table")
}