import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true }, // Deluxe Room, Suite, Family Room ...
    price: { type: Number, required: true, min: 0 }, // per night
    guests: { type: Number, default: 2, min: 1 },
    bedType: { type: String, trim: true },
    status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Maintenance'], default: 'Available' },
    size: { type: String, trim: true },
    view: { type: String, trim: true },
    description: { type: String, trim: true },
    amenities: { type: [String], default: [] },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
