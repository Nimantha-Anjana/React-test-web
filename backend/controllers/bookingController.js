import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { crudController, asyncHandler } from './crudController.js';

const crud = crudController(Booking);

const DAY_MS = 86400000;

// SGH-1092 style reference; retries if it already exists
const generateReference = async () => {
  for (let i = 0; i < 10; i += 1) {
    const reference = `SGH-${Math.floor(1000 + Math.random() * 9000)}`;
    if (!(await Booking.exists({ reference }))) return reference;
  }
  return `SGH-${Date.now()}`;
};

// Public: the website Booking form.
// The visitor can NOT choose status / payment / amount - the server sets those.
// Body: { fullName, email, phone, roomId, checkIn, checkOut, adults, children, requests }
const create = asyncHandler(async (req, res) => {
  const { fullName, email, phone, roomId, checkIn, checkOut, adults, children, requests } = req.body || {};

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return res.status(400).json({ message: 'Check-out must be after check-in.' });
  }

  const room = await Room.findById(roomId);
  if (!room) return res.status(400).json({ message: 'Selected room does not exist.' });

  const nights = Math.round((end - start) / DAY_MS);

  const booking = await Booking.create({
    reference: await generateReference(),
    guest: { name: fullName, email, phone },
    room: { roomId: room._id, name: room.name, type: room.type, number: room.number },
    checkIn: start,
    checkOut: end,
    guestsCount: { adults: Number(adults) || 1, children: Number(children) || 0 },
    amount: room.price * nights, // calculated on the server, never trusted from the browser
    status: 'Pending',
    paymentStatus: 'Pending',
    requests,
  });

  res.status(201).json({
    reference: booking.reference,
    roomName: booking.room.name,
    nights,
    amount: booking.amount,
  });
});

export default { ...crud, create };
