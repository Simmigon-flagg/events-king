import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, desc, speaker, date, time, location } = await request.json();
    await connectMongoDB();
    await Topic.create({  title, desc, speaker, date, time, location });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 })
}