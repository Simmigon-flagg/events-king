import connectMongoDB from "@/lib/mongodb";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function POST(request) {
    // const data = await request.json();    
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
  
    const imageBuffer = Buffer.from(await file.arrayBuffer());
    const newImage = new Image({
      filename: file.name,
      contentType: file.type,
      data: imageBuffer
    });
  
    try {
      const savedImage = await newImage.save();
  
      const newEvent = new Event({
        ...eventDetails,
        image: savedImage._id
      });
  
      const savedEvent = await newEvent.save();
  
      return new Response(JSON.stringify(savedEvent), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    // await connectMongoDB();
    // await Event.create({ ...data });
    // return NextResponse.json({ message: "Event Created" }, { status: 201 })
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

