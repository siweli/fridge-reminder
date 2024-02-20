import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    // console.log(formData.get("id"))
    return Response.json({message: formData.get("id")})
    // redirect("../dashboard/table")
}