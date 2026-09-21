import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    regDate: { type: Date, default: Date.now },
    totalBookings: { type: Number, default: 0, min: 0 },
    lastVisit: { type: Date },
    status: { type: String, enum: ['New', 'Returning', 'Active'], default: 'New' },
    avatar: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
