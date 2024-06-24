import connectMongoDB from "@/lib/mongodb";
import Image from "@/models/Image";

import { NextResponse } from "next/server";

export async function POST(request) {
    // await dbConnect(); 
    // await connectMongoDB();// Ensure the database is connected

    // const formData = await request.formData();
    // const file = formData.get('image');
    // const eventDetails = {
    //     title: formData.get('title'),
    //     host: formData.get('host'),
    //     date: formData.get('date'),
    //     time: formData.get('time'),
    //     location: formData.get('location'),
    //     description: formData.get('description'),
    //     topics: formData.getAll('topics')
    // };

    // const imageBuffer = Buffer.from(await file.arrayBuffer());
    // const newImage = new Image({
    //     filename: file.name,
    //     contentType: file.type,
    //     data: imageBuffer
    // });

    // try {
    //     const savedImage = await newImage.save();

    //     const newEvent = new Event({
    //         ...eventDetails,
    //         image: savedImage._id
    //     });

    //     const savedEvent = await newEvent.save();

    //     return NextResponse.json({  savedEvent  }, { status: 201 })
    // } catch (error) {
    //     return NextResponse.json({ message: "Invalid User name of password" }, { status: 500 })
    // }
}

export async function GET() {

    await connectMongoDB();
    const images = await Image.find();
    return NextResponse.json({ images }, { status: 200 })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Image.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete Event" }, { status: 200 })
}

