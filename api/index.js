// import express from 'express';
// import Razorpay from 'razorpay';
// import cors from 'cors';
// import crypto from 'crypto';
// import helmet from 'helmet';
// import dotenv from 'dotenv';

// dotenv.config();
// const app = express();

// app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(express.json());

// // Multi-environment CORS logic
// const allowedOrigins = [
//   process.env.FRONTEND_URL, // e.g., https://sun-bathe-website.vercel.app
//   'http://localhost:5173'
// ].filter(Boolean);

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order
// app.post('/api/create-order', async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay expects paise
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`
//     });
//     // We send back the key_id so the frontend knows which key to use
//     res.status(200).json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Verify Payment
// app.post('/api/verify-payment', async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//   const sign = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSign = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(sign.toString())
//     .digest("hex");

//   if (razorpay_signature === expectedSign) {
//     res.status(200).json({ success: true });
//   } else {
//     res.status(400).json({ success: false });
//   }
// });

// export default app; // Required for Vercel

import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import crypto from 'crypto';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();

// --- 1. SCHEMAS ---
const slotSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  startTime: { type: Date, required: true },
  isBooked: { type: Boolean, default: false },
  lockedUntil: { type: Date, default: null },
});

const bookingSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  serviceName: String,
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
  paymentId: String,
  orderId: String,
  amount: Number,
  bookedAt: { type: Date, default: Date.now }
});

const Slot = mongoose.models.Slot || mongoose.model('Slot', slotSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// --- 2. DB CONNECTION ---
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("🌿 MongoDB Connected");
  } catch (err) { console.error("❌ MongoDB Error:", err); }
};

// --- 3. EMAIL CONFIG (UPDATED FOR GMAIL/SPIT) ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // USE THE 16-CHAR APP PASSWORD
  },
});

// Verify connection on start
transporter.verify((error) => {
  if (error) console.log("❌ Email Auth failed: Use an App Password!");
  else console.log("📧 Email Server Ready");
});

const sendConfirmationEmail = async (booking, slot) => {
  const dateStr = new Date(slot.startTime).toLocaleString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  
  const mailOptions = {
    from: `"Voice of Tarot" <${process.env.EMAIL_USER}>`,
    to: [booking.userEmail, process.env.ADMIN_EMAIL],
    subject: `Booking Confirmed: ${booking.serviceName}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #111;">Session Confirmed!</h2>
        <p>Hi <b>${booking.userName}</b>,</p>
        <p>Your 1:1 session for <b>${booking.serviceName}</b> is successfully booked.</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          <p><b>Date/Time:</b> ${dateStr}</p>
          <p><b>Payment ID:</b> ${booking.paymentId}</p>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">Voice of Tarot Guidance</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to " + booking.userEmail);
  } catch (err) { console.error("📧 Email failed:", err.message); }
};

// --- 4. MIDDLEWARE ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- 5. ROUTES ---

app.post('/api/admin/create-slots', async (req, res) => {
  await connectDB();
  try {
    const { serviceId, dates } = req.body; 
    const slotObjects = dates.map(d => ({ serviceId, startTime: new Date(d) }));
    await Slot.insertMany(slotObjects);
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/slots/:serviceId', async (req, res) => {
  await connectDB();
  try {
    const slots = await Slot.find({ serviceId: req.params.serviceId, isBooked: false, $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] }).sort({ startTime: 1 });
    res.json(slots);
  } catch (err) { res.status(500).json([]); }
});

app.post('/api/lock-slot', async (req, res) => {
  await connectDB();
  const lockExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const slot = await Slot.findOneAndUpdate({ _id: req.body.slotId, isBooked: false, $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] }, { lockedUntil: lockExpiry }, { new: true });
  res.json({ success: !!slot });
});

app.post('/api/create-order', async (req, res) => {
  const order = await razorpay.orders.create({ amount: req.body.amount * 100, currency: "INR", receipt: `rcpt_${Date.now()}` });
  res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
});

app.post('/api/verify-payment', async (req, res) => {
  await connectDB();
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, slotId, userDetails, serviceName, amount } = req.body;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");

    if (razorpay_signature === expectedSign) {
      const slot = await Slot.findByIdAndUpdate(slotId, { isBooked: true, lockedUntil: null }, { new: true });
      const newBooking = new Booking({ userName: userDetails.name, userEmail: userDetails.email, serviceName, slotId, paymentId: razorpay_payment_id, orderId: razorpay_order_id, amount });
      await newBooking.save();
      
      // Trigger Email
      sendConfirmationEmail(newBooking, slot);
      
      res.json({ success: true });
    } else { res.status(400).json({ success: false }); }
  } catch (err) { res.status(500).json({ error: err.message }); }
});

export default app;

const PORT = 5001;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
}