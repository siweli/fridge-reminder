import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(req: NextRequest) {
    const data = await req.json()
    return Response.json(data)
}