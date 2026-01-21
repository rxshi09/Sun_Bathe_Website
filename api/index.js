// require('dotenv').config();
// const express = require('express');
// const Razorpay = require('razorpay');
// const cors = require('cors');
// const crypto = require('crypto');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(express.json({ limit: '10kb' }));

// // CORS configuration - restrict to your frontend domain in production
// const allowedOrigins = process.env.NODE_ENV === 'production'
//   ? [process.env.FRONTEND_URL]
//   : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   optionsSuccessStatus: 200,
//   credentials: true
// };
// app.use(cors(corsOptions));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.'
// });
// app.use('/api/', limiter);

// // Stricter rate limit for payment routes
// const paymentLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: 'Too many payment attempts, please try again later.'
// });

// // Validate environment variables
// const requiredEnvVars = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'PORT'];
// requiredEnvVars.forEach(varName => {
//   if (!process.env[varName]) {
//     console.error(`Missing required environment variable: ${varName}`);
//     process.exit(1);
//   }
// });

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Input validation middleware
// const validateOrderCreation = (req, res, next) => {
//   const { amount } = req.body;
  
//   if (!amount || typeof amount !== 'number' || amount <= 0) {
//     return res.status(400).json({ 
//       error: 'Invalid amount provided' 
//     });
//   }

//   // Validate amount matches expected price (prevent manipulation)
//   const EXPECTED_AMOUNT = 4999;
//   if (amount !== EXPECTED_AMOUNT) {
//     return res.status(400).json({ 
//       error: 'Invalid payment amount' 
//     });
//   }

//   next();
// };

// const validatePaymentVerification = (req, res, next) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
//   if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//     return res.status(400).json({ 
//       error: 'Missing required payment details' 
//     });
//   }

//   next();
// };

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK' });
// });

// // 1. Create Order Route
// app.post('/api/create-order', paymentLimiter, validateOrderCreation, async (req, res) => {
//   try {
//     const options = {
//       amount: req.body.amount * 100, // Amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
//       notes: {
//         event: 'Sunbathe 2026',
//         created_at: new Date().toISOString()
//       }
//     };

//     const order = await razorpay.orders.create(options);
    
//     // Log order creation (use proper logging service in production)
//     console.log(`Order created: ${order.id} at ${new Date().toISOString()}`);
    
//     res.json({
//       id: order.id,
//       currency: order.currency,
//       amount: order.amount,
//       key_id: process.env.RAZORPAY_KEY_ID 
//     });
//   } catch (error) {
//     console.error('Order creation error:', error);
//     res.status(500).json({ 
//       error: 'Failed to create order. Please try again.' 
//     });
//   }
// });

// // 2. Verification Route
// app.post('/api/verify-payment', paymentLimiter, validatePaymentVerification, async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
//     hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//     const generated_signature = hmac.digest('hex');

//     if (generated_signature === razorpay_signature) {
//       // Optionally: Fetch payment details from Razorpay to verify status
//       try {
//         const payment = await razorpay.payments.fetch(razorpay_payment_id);
        
//         if (payment.status === 'captured' || payment.status === 'authorized') {
//           // Log successful payment
//           console.log(`Payment verified: ${razorpay_payment_id} at ${new Date().toISOString()}`);
          
//           // TODO: Save payment details to database
//           // TODO: Send confirmation email
          
//           res.json({ 
//             success: true, 
//             message: "Payment verified successfully",
//             payment_id: razorpay_payment_id
//           });
//         } else {
//           res.status(400).json({ 
//             success: false, 
//             message: "Payment not completed" 
//           });
//         }
//       } catch (fetchError) {
//         console.error('Error fetching payment details:', fetchError);
//         res.status(500).json({ 
//           success: false, 
//           message: "Verification error" 
//         });
//       }
//     } else {
//       console.warn(`Invalid signature attempt: ${razorpay_payment_id}`);
//       res.status(400).json({ 
//         success: false, 
//         message: "Invalid signature" 
//       });
//     }
//   } catch (error) {
//     console.error('Payment verification error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Verification failed" 
//     });
//   }
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   res.status(500).json({ 
//     error: 'Internal server error' 
//   });
// });

// const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
// });

// // Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received, closing server gracefully');
//   server.close(() => {
//     console.log('Server closed');
//     process.exit(0);
//   });
// });

// module.exports = app;


require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());
app.use(express.json({ limit: '10kb' }));

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// Rate limiting (Increased to 100 for dev/testing ease)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Increased from 10 to 50 so you don't get blocked while testing
  message: 'Too many payment attempts, please try again later.'
});

// Validate environment variables
const requiredEnvVars = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'PORT'];
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- FIXED VALIDATION MIDDLEWARE ---
const validateOrderCreation = (req, res, next) => {
  const { amount } = req.body;
  
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount provided' });
  }

  // ALLOWED PRICES: Tarot(2100), Healing(3500), Coaching(5000), Original(4999)
  const VALID_PRICES = [2100, 3500, 5000, 4999]; 
  
  if (!VALID_PRICES.includes(amount)) {
    return res.status(400).json({ 
      error: `Invalid payment amount. Received ${amount}. Expected one of: ${VALID_PRICES.join(', ')}` 
    });
  }

  next();
};

const validatePaymentVerification = (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing required payment details' });
  }

  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 1. Create Order Route
app.post('/api/create-order', paymentLimiter, validateOrderCreation, async (req, res) => {
  try {
    const isMockMode = process.env.RAZORPAY_KEY_ID === 'test_key_placeholder';
    
    if (isMockMode) {
      console.log('⚠️  MOCK MODE: Using fake order data');
      return res.json({
        id: `order_mock_${Date.now()}`,
        currency: 'INR',
        amount: req.body.amount * 100,
        key_id: 'rzp_test_mock123456',
        mock: true
      });
    }

    const options = {
      amount: req.body.amount * 100, // Razorpay takes amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`,
      notes: {
        event: 'VoiceOfTarot Session',
        created_at: new Date().toISOString()
      }
    };

    const order = await razorpay.orders.create(options);
    console.log(`Order created: ${order.id} | Amount: ${order.amount}`);
    
    res.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order. Please try again.' });
  }
});

// 2. Verification Route
app.post('/api/verify-payment', paymentLimiter, validatePaymentVerification, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (razorpay_order_id.startsWith('order_mock_')) {
      return res.json({ 
        success: true, 
        message: "Payment verified successfully (MOCK MODE)",
        payment_id: razorpay_payment_id
      });
    }

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is legit
      console.log(`Payment verified: ${razorpay_payment_id}`);
      res.json({ 
        success: true, 
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id
      });
    } else {
      console.warn(`Invalid signature attempt: ${razorpay_payment_id}`);
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
});

// Global error handlers
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});