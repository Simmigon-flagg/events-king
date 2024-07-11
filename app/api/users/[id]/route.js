import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const editedUser = await request.json();
    console.log("editedUser")
    console.log(editedUser.user._id)
    await connectMongoDB();
    await User.findByIdAndUpdate(editedUser.user._id, editedUser?.user);
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
        role: userData.role,
        firstname: userData.firstname,                
        lastname: userData.lastname,
        company: userData.company,
        phone: userData.phone,
        aboutme: userData.aboutme,
        description: userData.description,
        presentation: userData.presentation
    }
    return NextResponse.json({ user }, { status: 200 })
}