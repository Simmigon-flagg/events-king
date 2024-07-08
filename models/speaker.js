import mongoose, { Schema } from "mongoose";

// Define the Event schema with topics as an optional array of references to Topic
const speakerSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,            
    title: String,
    phone: String,    
    aboutme: String,
    company: String,
    description: String,    
    presentation: String,
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic", default: [] }],     
    image: { type: Schema.Types.ObjectId, ref: "Image" } 
    
}, {
    timestamps: true,
});

// Create the Event model
const Speaker = mongoose.models.Speaker || mongoose.model("Speaker", speakerSchema);

export default Speaker;