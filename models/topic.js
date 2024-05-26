import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema({
    title: String,
    desc: String,
}, {
    timestamps: true,
}
)