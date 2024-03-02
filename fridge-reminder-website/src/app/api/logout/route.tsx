import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    cookies().delete("user_logged_in")
    redirect("../account")
}