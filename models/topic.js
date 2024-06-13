import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
    title: String,
    description: String,
    speaker: String,
    date: String,
    time: String,
    location: String
}, {
    timestamps: true,
}
)
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema)

export default Topic;