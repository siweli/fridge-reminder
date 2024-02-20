import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    console.log(formData.get("item_name"))
    console.log(formData.get("expire_date"))
    //return Response.json({message: formData.get("test")})
    redirect("../dashboard/table")
}