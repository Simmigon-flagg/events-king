import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const editedEvent = await request.json();

    await connectMongoDB();
    await Event.findByIdAndUpdate(id, editedEvent);
    return NextResponse.json({ editedEvent }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const event = await Event.findOne({ _id: id });

    return NextResponse.json({ event }, { status: 200 })
}