import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    // dont know if need to check user id as item row id should be unique anyway
    const token = cookies().get("user_id");
    if (!token) return

    const formData = await req.formData()
    const item_row = formData.get("id")?.toString()
    if (item_row == null) return
    
    await prisma.items.delete({
        where: {
            id: parseInt(item_row),
        }
    })

    redirect("../dashboard/table")
}