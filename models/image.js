import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  filename: String,
  contentType: String,
  data: Buffer
}, {
  timestamps: true,
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
