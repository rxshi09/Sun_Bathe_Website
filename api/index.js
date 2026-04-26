// import express from 'express';
// import Razorpay from 'razorpay';
// import cors from 'cors';
// import crypto from 'crypto';
// import helmet from 'helmet';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import nodemailer from 'nodemailer';

// dotenv.config();
// const app = express();

// // --- 1. SCHEMAS ---
// const slotSchema = new mongoose.Schema({
//   serviceId: { type: String, required: true },
//   startTime: { type: Date, required: true },
//   isBooked: { type: Boolean, default: false },
//   lockedUntil: { type: Date, default: null },
// });

// const bookingSchema = new mongoose.Schema({
//   userName: String,
//   userEmail: String,
//   serviceName: String,
//   slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
//   paymentId: String,
//   orderId: String,
//   amount: Number,
//   bookedAt: { type: Date, default: Date.now }
// });

// const Slot = mongoose.models.Slot || mongoose.model('Slot', slotSchema);
// const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// // --- 2. DB CONNECTION ---
// const connectDB = async () => {
//   if (mongoose.connection.readyState >= 1) return;
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("🌿 MongoDB Connected");
//   } catch (err) { console.error("❌ MongoDB Error:", err); }
// };

// // --- 3. EMAIL CONFIG (UPDATED FOR GMAIL/SPIT) ---
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // USE THE 16-CHAR APP PASSWORD
//   },
// });

// // Verify connection on start
// transporter.verify((error) => {
//   if (error) console.log("❌ Email Auth failed: Use an App Password!");
//   else console.log("📧 Email Server Ready");
// });

// const sendConfirmationEmail = async (booking, slot) => {
//   const dateStr = new Date(slot.startTime).toLocaleString('en-IN', {
//     weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
//   });
  
//   const mailOptions = {
//     from: `"Voice of Tarot" <${process.env.EMAIL_USER}>`,
//     to: [booking.userEmail, process.env.ADMIN_EMAIL],
//     subject: `Booking Confirmed: ${booking.serviceName}`,
//     html: `
//       <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//         <h2 style="color: #111;">Session Confirmed!</h2>
//         <p>Hi <b>${booking.userName}</b>,</p>
//         <p>Your 1:1 session for <b>${booking.serviceName}</b> is successfully booked.</p>
//         <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
//           <p><b>Date/Time:</b> ${dateStr}</p>
//           <p><b>Payment ID:</b> ${booking.paymentId}</p>
//         </div>
//         <p style="margin-top: 20px; font-size: 12px; color: #888;">Voice of Tarot Guidance</p>
//       </div>
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("📧 Email sent to " + booking.userEmail);
//   } catch (err) { console.error("📧 Email failed:", err.message); }
// };

// // --- 4. MIDDLEWARE ---
// app.use(helmet({ crossOriginResourcePolicy: false }));
// app.use(express.json());
// app.use(cors());

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // --- 5. ROUTES ---

// app.post('/api/admin/create-slots', async (req, res) => {
//   await connectDB();
//   try {
//     const { serviceId, dates } = req.body; 
//     const slotObjects = dates.map(d => ({ serviceId, startTime: new Date(d) }));
//     await Slot.insertMany(slotObjects);
//     res.status(201).json({ success: true });
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// app.get('/api/slots/:serviceId', async (req, res) => {
//   await connectDB();
//   try {
//     const slots = await Slot.find({ serviceId: req.params.serviceId, isBooked: false, $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] }).sort({ startTime: 1 });
//     res.json(slots);
//   } catch (err) { res.status(500).json([]); }
// });

// app.post('/api/lock-slot', async (req, res) => {
//   await connectDB();
//   const lockExpiry = new Date(Date.now() + 10 * 60 * 1000);
//   const slot = await Slot.findOneAndUpdate({ _id: req.body.slotId, isBooked: false, $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] }, { lockedUntil: lockExpiry }, { new: true });
//   res.json({ success: !!slot });
// });

// app.post('/api/create-order', async (req, res) => {
//   const order = await razorpay.orders.create({ amount: req.body.amount * 100, currency: "INR", receipt: `rcpt_${Date.now()}` });
//   res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
// });

// app.post('/api/verify-payment', async (req, res) => {
//   await connectDB();
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, slotId, userDetails, serviceName, amount } = req.body;
//     const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");

//     if (razorpay_signature === expectedSign) {
//       const slot = await Slot.findByIdAndUpdate(slotId, { isBooked: true, lockedUntil: null }, { new: true });
//       const newBooking = new Booking({ userName: userDetails.name, userEmail: userDetails.email, serviceName, slotId, paymentId: razorpay_payment_id, orderId: razorpay_order_id, amount });
//       await newBooking.save();
      
//       // Trigger Email
//       sendConfirmationEmail(newBooking, slot);
      
//       res.json({ success: true });
//     } else { res.status(400).json({ success: false }); }
//   } catch (err) { res.status(500).json({ error: err.message }); }
// });

// export default app;

// const PORT = 5001;
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
// }


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
  option: String, // For group bookings
  paymentId: String,
  orderId: String,
  amount: Number,
  bookedAt: { type: Date, default: Date.now }
});

const Slot = mongoose.models.Slot || mongoose.model('Slot', slotSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// --- 2. DB CONNECTION ---
const connectDB = async (retries = 5) => {
  if (mongoose.connection.readyState >= 1) {
    console.log("🌿 MongoDB Already Connected");
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Attempting MongoDB connection (attempt ${attempt}/${retries})...`);
      
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        maxPoolSize: 10, // Maintain up to 10 socket connections
        bufferCommands: false, // Disable mongoose buffering
      });

      console.log("✅ MongoDB Connected Successfully");
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB Connection Error:', err);
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️  MongoDB Disconnected');
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB Reconnected');
      });

      return; // Success, exit the retry loop

    } catch (err) {
      console.error(`❌ MongoDB Connection Failed (attempt ${attempt}/${retries}):`, err.message);
      
      if (attempt === retries) {
        console.error("🚨 All MongoDB connection attempts failed. Server will start without DB connection.");
        console.error("💡 Check your MONGODB_URI in .env or ensure MongoDB is running locally/Atlas is active.");
        // Don't exit process - let server start, but DB operations will fail
        return;
      }
      
      // Exponential backoff: wait 1s, 2s, 4s, 8s, 16s
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// --- 3. EMAIL CONFIG ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email connection on startup
transporter.verify((error) => {
  if (error) console.log("⚠️  Email not configured:", error.message);
  else console.log("📧 Email Server Ready");
});

const sendConfirmationEmail = async (booking, slot) => {
  try {
    const dateStr = slot 
      ? new Date(slot.startTime).toLocaleString('en-IN', {
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit'
        })
      : booking.option;
    
    const mailOptions = {
      from: `"Voice of Tarot" <${process.env.EMAIL_USER}>`,
      to: [booking.userEmail, process.env.ADMIN_EMAIL].filter(Boolean),
      subject: `Booking Confirmed: ${booking.serviceName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #111;">Session Confirmed!</h2>
          <p>Hi <b>${booking.userName}</b>,</p>
          <p>Your session for <b>${booking.serviceName}</b> is successfully booked.</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
            <p><b>Date/Time:</b> ${dateStr}</p>
            <p><b>Amount:</b> ₹${booking.amount}</p>
            <p><b>Payment ID:</b> ${booking.paymentId}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Voice of Tarot Guidance</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to " + booking.userEmail);
  } catch (err) { 
    console.error("📧 Email failed:", err.message); 
  }
};

// --- 4. MIDDLEWARE ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- 5. PUBLIC ROUTES ---

// Get Public Slots (only available slots for booking)
app.get('/api/slots/:serviceId', async (req, res) => {
  await connectDB();
  try {
    const slots = await Slot.find({ 
      serviceId: req.params.serviceId, 
      isBooked: false, 
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] 
    }).sort({ startTime: 1 });
    res.json(slots);
  } catch (err) { 
    console.error('Get slots error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// Lock Slot for User
app.post('/api/lock-slot', async (req, res) => {
  await connectDB();
  try {
    const lockExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min lock
    const slot = await Slot.findOneAndUpdate(
      { 
        _id: req.body.slotId, 
        isBooked: false, 
        $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }] 
      }, 
      { lockedUntil: lockExpiry }, 
      { new: true }
    );
    res.json({ success: !!slot });
  } catch (err) {
    console.error('Lock slot error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create Payment Order
app.post('/api/create-order', async (req, res) => {
  try {
    const order = await razorpay.orders.create({ 
      amount: req.body.amount * 100, 
      currency: "INR", 
      receipt: `rcpt_${Date.now()}` 
    });
    res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('Create order error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Verify Payment and Finalize Booking
app.post('/api/verify-payment', async (req, res) => {
  await connectDB();
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      slotId, 
      userDetails, 
      serviceName, 
      amount,
      option 
    } = req.body;

    // Verify signature
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, error: 'Invalid signature' });
    }

    // Update slot if applicable
    let slot = null;
    if (slotId) {
      slot = await Slot.findByIdAndUpdate(
        slotId, 
        { isBooked: true, lockedUntil: null }, 
        { new: true }
      );
    }

    // Create booking record
    const newBooking = new Booking({ 
      userName: userDetails.name, 
      userEmail: userDetails.email, 
      serviceName, 
      slotId: slotId || null,
      option: option || null,
      paymentId: razorpay_payment_id, 
      orderId: razorpay_order_id, 
      amount 
    });
    await newBooking.save();
    
    // Send confirmation email (non-blocking)
    sendConfirmationEmail(newBooking, slot);
    
    res.json({ success: true });
  } catch (err) { 
    console.error('Verify payment error:', err);
    res.status(500).json({ success: false, error: err.message }); 
  }
});

// --- 6. ADMIN ROUTES ---

// Admin: Get Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  await connectDB();
  try {
    const totalBookings = await Booking.countDocuments();
    
    // Calculate total revenue
    const revenueData = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;
    
    // Count available slots per service (unlocked and unbooked only)
    const tarotSlots = await Slot.countDocuments({ 
      serviceId: 'tarot_1on1', 
      isBooked: false,
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }]
    });
    
    const soundSlots = await Slot.countDocuments({ 
      serviceId: 'sound_1on1', 
      isBooked: false,
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }]
    });

    const groupSlots = await Slot.countDocuments({ 
      serviceId: 'sound_group', 
      isBooked: false,
      $or: [{ lockedUntil: null }, { lockedUntil: { $lt: new Date() } }]
    });

    res.json({ 
      totalBookings, 
      totalRevenue, 
      openSlots: { tarot: tarotSlots, sound: soundSlots, group: groupSlots } 
    });
  } catch (err) { 
    console.error('Stats error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// Admin: Get All Bookings
app.get('/api/admin/bookings', async (req, res) => {
  await connectDB();
  try {
    const bookings = await Booking.find()
      .populate('slotId')
      .sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) { 
    console.error('Get bookings error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// Admin: Get All Slots for a Service (includes booked/locked)
app.get('/api/admin/slots/:serviceId', async (req, res) => {
  await connectDB();
  try {
    const slots = await Slot.find({ 
      serviceId: req.params.serviceId 
    }).sort({ startTime: 1 });
    res.json(slots);
  } catch (err) { 
    console.error('Get admin slots error:', err);
    res.status(500).json({ error: err.message }); 
  }
});

// Admin: Create Slots
app.post('/api/admin/create-slots', async (req, res) => {
  await connectDB();
  try {
    const { serviceId, dates } = req.body;
    
    if (!serviceId || !Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'serviceId and dates array required' 
      });
    }
    
    const slotObjects = dates.map(d => ({ 
      serviceId, 
      startTime: new Date(d) 
    }));
    
    await Slot.insertMany(slotObjects);
    res.status(201).json({ success: true, created: slotObjects.length });
  } catch (err) { 
    console.error('Create slots error:', err);
    res.status(500).json({ success: false, error: err.message }); 
  }
});

// Admin: Delete Slot
app.delete('/api/admin/slots/:id', async (req, res) => {
  
  await connectDB();
  try {
    const slot = await Slot.findByIdAndDelete(req.params.id);
    
    if (!slot) {
      return res.status(404).json({ 
        success: false, 
        error: 'Slot not found' 
      });
    }
    
    res.json({ success: true });
  } catch (err) { 
    console.error('Delete slot error:', err);
    res.status(500).json({ success: false, error: err.message }); 
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// --- 7. ERROR HANDLING ---
app.use((err, req, res, next) => {
  
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// --- 8. START SERVER ---
export default app;
export { connectDB };