import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import Image from "@/models/image";
import { NextResponse } from "next/server";

export async function PUT(request) {
  await connectMongoDB();
  const formData = await request.formData();

  const file = formData.get('image');
  const _id = formData.get('_id');
  const eventDetails = {
    title: formData.get('title'),
    host: formData.get('host'),
    date: formData.get('date'),
    time: formData.get('time'),
    location: formData.get('location'),
    description: formData.get('description'),
    topics: formData.getAll('topics')
  };

  try {
    let savedImage = null;

    if (file && file.size > 0) {
      const imageBuffer = Buffer.from(await file.arrayBuffer());
      const newImage = new Image({
        filename: file.name,
        contentType: file.type,
        data: imageBuffer
      });

      savedImage = await newImage.save();
    }

    const updatedEvent = {
      ...eventDetails,
      image: savedImage ? savedImage._id : null
    };

    await Event.findByIdAndUpdate(_id, updatedEvent);
    return NextResponse.json({ message: "Added Image" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const event = await Event.findOne({ _id: id });

  return NextResponse.json({ event }, { status: 200 })
}