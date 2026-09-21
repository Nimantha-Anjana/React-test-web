import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: { type: String, trim: true },
    hours: { type: String, trim: true }, // "07:00 AM - 11:00 PM"
    location: { type: String, trim: true },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Restaurant', restaurantSchema);
