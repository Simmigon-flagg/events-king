import connectMongoDB from "@/lib/mongodb";
import Image from "@/models/Image";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const editedImage = await request.json();
    
    await connectMongoDB();
    await Image.findByIdAndUpdate(id, editedImage);
    return NextResponse.json({ message: "Event Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const image = await Image.findOne({ _id: id });

    return NextResponse.json({ image }, { status: 200 })
}