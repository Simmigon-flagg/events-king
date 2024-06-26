import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { title, description, speaker, date, time, location } = await request.json();
    const topic = await Topic.create({ title, description, speaker, date, time, location });
    return NextResponse.json({ topic }, { status: 201 })
}

export async function GET() {

    const topics = await Topic.find();
    return NextResponse.json({ topics }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete Topic" }, { status: 200 })
}

