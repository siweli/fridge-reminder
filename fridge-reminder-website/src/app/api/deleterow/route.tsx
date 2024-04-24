import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    // dont know if need to check user id as item row id should be unique anyway
    const token = cookies().get("user_id"); // get currently logged in user
    if (!token) return

    const formData = await req.formData()
    const item_row = formData.get("id")?.toString()
    if (item_row == null) return // satisfies an error with null form data

    const row = await prisma.items.findUnique({ // ensure the row exists and get the device id for redirect
        where: {
            id: parseInt(item_row)
        }
    })

    const device_id = row?.device_id // assign to a temp variable before deleting
    
    await prisma.items.delete({ // delete the row
        where: {
            id: parseInt(item_row),
        }
    })

    redirect("../dashboard/table?id="+device_id) // redirect back to the table with device id as the query params
}