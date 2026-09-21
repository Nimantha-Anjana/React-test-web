import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // Hotel, Rooms, Dining, Facilities, Events
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    description: { type: String, trim: true },
    url: { type: String, required: true, trim: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryImage', galleryImageSchema);
