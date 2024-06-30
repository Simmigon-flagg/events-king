import connectMongoDB from "@/lib/mongodb";
import Speaker from "@/models/speaker";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { firstname, lastname, email, description } = await request.json();    
    const speaker = await Speaker.create({ firstname, lastname, email, description });
    return NextResponse.json({speaker}, { status: 201 })
}

export async function GET() {

    const speaker = await Speaker.find();
    return NextResponse.json( speaker , { status: 200 })
}

export async function PUT(request) {
    // const { id } = params;
    const updated = await request.json();
    console.log(updated)
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