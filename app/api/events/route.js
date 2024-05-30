import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { title, desc, host, date, time, location } = await request.json();
    await connectMongoDB();
    await Event.create({ title, desc, host, date, time, location });
    return NextResponse.json({ message: "Event Created" }, { status: 201 })
}

export async function GET() {

    await connectMongoDB();
    const events = await Event.find();
    return NextResponse.json({ events }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete Event" }, { status: 200 })
}

