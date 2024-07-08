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
    const userData = await User.findOne({ _id: id });
    const user = {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        events: userData.events,
        topics: userData.topics,
    }
    return NextResponse.json({ user }, { status: 200 })
}