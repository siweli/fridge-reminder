import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const user = formData.get("username")?.toString()
    const pass = formData.get("password")?.toString()
    if (user == null || pass == null) return

    await prisma.users.create({
        data: {
            name: user,
            password: pass,
        },
    })

    const login = await prisma.users.findMany({
        where: {
            name: user,
            password: pass,
        },
    });

    // cookies().set('token', user, {maxAge: 30})
    cookies().set("user_logged_in", user)
    cookies().set("user_id", login[0].id.toString())
    redirect("../account")
}