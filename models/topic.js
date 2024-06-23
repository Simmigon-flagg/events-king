import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
    title: String,
    description: String,
    speaker: String,
    date: String,
    time: String,
<<<<<<< HEAD
    location: String
    
=======
    location: String,
    image: { type: Schema.Types.ObjectId, ref: "Image" } // Reference to the Image model
>>>>>>> 472208a680a7539df6aa8c4958226aa22a8fc46f
}, {
    timestamps: true,
}
)
const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema)

export default Topic;