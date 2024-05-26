import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, desc } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, desc });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 })
}