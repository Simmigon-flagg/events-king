import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, desc } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, desc });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 })
}

export async function GET() {

    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();    
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete Topic" },  { status: 200 })
}

