import connectMongoDB from "@/lib/mongodb";
import Speaker from "@/models/speaker";
import { NextResponse } from "next/server";

export async function POST(request) {

    const {
        firstname,
        lastname,
        email,
        title,
        company,
        phone,
        session,
        presentation,
        aboutme,
        photo
    } = await request.json();
  

    const speaker = await Speaker.create({
        firstname,
        lastname,
        email,
        title,
        company,
        phone,
        session,
        presentation,
        aboutme,
        photo
    });
    return NextResponse.json({ speaker }, { status: 201 })
}

export async function GET() {
    const speakers = await Speaker.find();
    return NextResponse.json({ speakers }, { status: 200 })
}


export async function PUT(request) {
    // const { id } = params;
    const updated = await request.json();
    await connectMongoDB();
    await Speaker.findByIdAndUpdate(updated._id, updated);
    const speaker = await Speaker.findOne({ _id: updated._id });

    return NextResponse.json({ speaker }, { status: 200 })
}

// export async function GET(request, { params }) {
//     const { id } = params;
//     await connectMongoDB();
//     const event = await Event.findOne({ _id: id });

//     return NextResponse.json({ event }, { status: 200 })
// }
export async function DELETE(request) {
    const _id = request.nextUrl.searchParams.get("id");

    await connectMongoDB();
    await Speaker.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Delete Event" }, { status: 200 })
}

