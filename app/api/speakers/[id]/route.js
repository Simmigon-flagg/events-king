import connectMongoDB from "@/lib/mongodb";
import Speaker from "@/models/speaker";
import { NextResponse } from "next/server"

export async function PUT(request) {
    const updated = await request.json();
    
    await connectMongoDB();
    await Speaker.findByIdAndUpdate(updated._id, updated);
    const speaker = await Speaker.findOne({ _id: updated._id });
    console.log(speaker)
    return NextResponse.json({ speaker }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const speaker = await Speaker.findOne({ _id: id });
    return NextResponse.json({ speaker }, { status: 200 })
}