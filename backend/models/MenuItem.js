import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true }, // Breakfast, Main Course, Dessert ...
    price: { type: Number, required: true, min: 0 },
    availability: { type: String, default: 'Available', trim: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('MenuItem', menuItemSchema);
