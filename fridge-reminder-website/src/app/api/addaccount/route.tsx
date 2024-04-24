import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import prisma  from "../../../libaries/prisma"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
    const formData = await req.formData()
    const user = formData.get("username")?.toString()
    const pass = formData.get("password")?.toString()
    if (user == "" || pass == "") { // check form data isnt empty
        console.log("user or password cannot be empty")
        redirect("../account")
    }
    if (user == null || pass == null) return // satisfies an error with null form data

    const user_exists = await prisma.users.findMany({ // find if username exists
        where: {
            name: user,
        },
    });

    if (user_exists.length !== 0) { // if user exists already then redirect
        console.log("user already exists")
        redirect("../account")
    }

    await prisma.users.create({ // if passed all checks then create the account
        data: {
            name: user,
            password: pass,
        },
    })

    const login = await prisma.users.findMany({ // log the user in to get the user id
        where: {
            name: user,
            password: pass,
        },
    });

    cookies().set("user_logged_in", user) // cookie for which username is logged in
    cookies().set("user_id", login[0].id.toString()) // cookie for which user id is logged in
    redirect("../account")
}