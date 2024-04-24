import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const user = formData.get("username")?.toString()
    const pass = formData.get("password")?.toString()
    if (user == null || pass == null) return // satisfies an error with null form data

    const login = await prisma.users.findMany({ // attempt to log the user in
        where: {
            name: user,
            password: pass,
        },
    });

    if (login.length === 0) { // if the log in fails then console logs the error and redirects user
        console.log("Wrong username or password")
        redirect("../account")
    }

    cookies().set("user_logged_in", user) // if the check passed then the logged in cookie is created
    cookies().set("user_id", login[0].id.toString()) // as well as the user id cookie
    
    redirect("../account")
}