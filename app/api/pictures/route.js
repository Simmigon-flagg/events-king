import connectMongoDB from "@/lib/mongodb";
import Picture from "@/models/picture";

import { NextResponse } from "next/server";

export async function POST(request) {
 
    await connectMongoDB();// Ensure the database is connected

    const formData = await request.formData();
    const file = formData.get('image');
    const eventDetails = {
        title: formData.get('title'),
        host: formData.get('host'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        description: formData.get('description'),
        topics: formData.getAll('topics')
    };

    const pictureBuffer = Buffer.from(await file.arrayBuffer());
    const newPicture = new Picture({
        filename: file.name,
        contentType: file.type,
        data: pictureBuffer
    });

    try {
        const savedPicture = await newPicture.save();

        const newEvent = new Event({
            ...eventDetails,
            picture: savedPicture._id
        });

        const savedEvent = await newEvent.save();

        return NextResponse.json({  savedEvent  }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Invalid picture" }, { status: 500 })
    }
}

export async function GET() {

    await connectMongoDB();
    const pictures = await Picture.find();
    console.log(pictures)
    return NextResponse.json({ pictures }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Picture.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete Event" }, { status: 200 })
}

