import connectMongoDB from "@/lib/mongodb";
import Picture from "@/models/picture";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const editedPicture = await request.json();
    
    await connectMongoDB();
    await Picture.findByIdAndUpdate(id, editedPicture);
    return NextResponse.json({ message: "Picture Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const image = await Picture.findOne({ _id: id });

    return NextResponse.json({ image }, { status: 200 })
}