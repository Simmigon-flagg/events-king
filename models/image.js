import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
