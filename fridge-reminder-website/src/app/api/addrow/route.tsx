import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const token = cookies().get("user_id");
    if (!token) return

    const formData = await req.formData()
    const item_name = formData.get("item_name")?.toString()
    const expiry_date = formData.get("expire_date")?.toString()
    if (item_name == null || expiry_date == null) return

    await prisma.items.create({
        data: {
            name: item_name,
            expires: expiry_date,
            user_id: parseInt(token.value)
        },
    })

    redirect("../dashboard/table")
}