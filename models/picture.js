import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  data: Buffer,
  createdAt: { type: Date, default: Date.now },
});

// Create the Event model
const Picture = mongoose.models.Picture || mongoose.model('Picture', PictureSchema);

export default Picture;
