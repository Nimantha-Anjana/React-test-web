import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDesc: { type: String, trim: true },
    fullDesc: { type: String, trim: true },
    category: { type: String, required: true, trim: true }, // Wellness, Transportation, Dining ...
    price: { type: String, trim: true }, // text on purpose: "From $35", "Contact us"
    availability: { type: String, trim: true },
    openingTime: { type: String, default: '00:00' }, // "HH:MM"
    closingTime: { type: String, default: '23:59' },
    icon: { type: String, trim: true }, // bootstrap-icons class used by the admin panel
    image: { type: String, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
