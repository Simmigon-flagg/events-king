import connectMongoDB from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(response) {
    try {
        await connectMongoDB();
        const { email } = await response.json()
        const user_id = await User.findOne({ email }).select("_id");
    
        return NextResponse.json({ user })

    } catch (error) {

    }

}