import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    console.log(formData.get("test"))
    //return Response.json({message: formData.get("test")})
    redirect("../dashboard/input-test")
}