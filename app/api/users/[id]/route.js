import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const editedUser = await request.json();
    console.log(editedUser)
    await connectMongoDB();
    await User.findByIdAndUpdate(id, editedUser);
    return NextResponse.json({ editedUser }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({ _id: id });

    return NextResponse.json({ user }, { status: 200 })
}