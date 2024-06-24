import connectMongoDB from "@/lib/mongodb";
import Image from "@/models/image";

import { NextResponse } from "next/server";

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

