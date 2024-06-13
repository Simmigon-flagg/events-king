import mongoose, { Schema } from "mongoose";

// Define the Event schema with topics as an optional array of references to Topic
const eventSchema = new Schema({
    title: String,
    host: String,
    date: String,
    time: String,
    location: String,
    description: String,
    topics: [{ type: Schema.Types.ObjectId, ref: "Topic", default: [] }] // Topics is optional, default to an empty array
}, {
    timestamps: true,
});

// Create the Event model
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
