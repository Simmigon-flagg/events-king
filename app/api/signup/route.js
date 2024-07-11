import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        
        await connectMongoDB();

        const exists = await User.findOne({ $or: [{ name }, { email }] }).select("_id");

        if (!exists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({ name, email, password: hashedPassword })
            return NextResponse.json({ message: "User signed up" }, { status: 201 })
        }
        return NextResponse.json({ message: "Invalid User name of password" }, { status: 500 })

    } catch (error) {

        return NextResponse.json({
            message: "An error happened while signing up the user"
        }, { status: 500 })

    }
}
export async function GET() {

    await connectMongoDB();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete User" }, { status: 200 })
}