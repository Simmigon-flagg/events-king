import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    title: String,
    desc: String,
    host: String,
    date: String,
    time: String,
    location: String
}, {
    timestamps: true,
}
)
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema)

export default Event;