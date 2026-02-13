# Sound of Tarot - Booking Platform

A modern, elegant booking platform for tarot guidance and sound healing sessions. Built with React, Node.js, and MongoDB, featuring a beautiful UI, secure payment processing, and a comprehensive admin panel.

## 🌟 What This Project Does

**Sound of Tarot** (also branded as "Sound of Tarot") is a full-stack web application that allows clients to:

- **Browse Services**: View three types of healing sessions (1:1 Tarot, Group Sound Healing, 1:1 Personal Sound)
- **Book Sessions**: Select available time slots and complete secure payments via Razorpay
- **Receive Confirmations**: Automatic email confirmations after successful bookings
- **View Information**: Learn about the founder (Sapna Shahri), services, testimonials, and the philosophy behind the practice

**Admin Features**:
- **Dashboard**: View booking statistics, revenue, and availability
- **Calendar Management**: Create, view, and delete time slots for all services
- **Booking Management**: View all bookings with client details and payment information
- **Secure Access**: Password-protected admin portal

---

## 🎯 Key Features

### Frontend Features
- ✨ **Modern UI/UX**: Clean, minimalist design with smooth animations using Framer Motion
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid styling
- 🔄 **Dynamic Hero Slider**: Auto-rotating hero section with beautiful imagery
- 📅 **Interactive Booking Flow**: Multi-step booking process with slot selection
- 💳 **Payment Integration**: Secure Razorpay payment gateway integration
- 🎭 **Component-Based Architecture**: Modular React components for maintainability

### Backend Features
- 🔒 **Secure Payment Verification**: Cryptographic signature verification for payments
- 📧 **Email Notifications**: Automatic confirmation emails via Nodemailer
- 🗄️ **MongoDB Integration**: Persistent data storage for slots and bookings
- 🔐 **Slot Locking System**: Prevents double-booking with temporary slot locks
- 🛡️ **Security**: Helmet.js for security headers, CORS configuration
- 📊 **Admin API**: Complete REST API for admin operations

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **jsPDF** - PDF generation (for reports)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **Razorpay** - Payment gateway
- **Nodemailer** - Email service
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Development Tools
- **ESLint** - Code linting
- **Concurrently** - Run multiple scripts simultaneously
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
SunBathe/
├── api/
│   └── index.js              # Express server with all API routes
├── public/
│   ├── Founder_Image.jpeg    # Founder's image
│   └── v1.mp4                # Video asset
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation component
│   │   ├── Hero.jsx          # Hero section with slider
│   │   ├── Vision.jsx        # About/Vision section
│   │   ├── Mentor.jsx        # Founder introduction
│   │   ├── VoiceOfTarotOfferings.jsx  # Services & booking modal
│   │   ├── Testimonials.jsx  # Client testimonials
│   │   ├── Gallery.jsx       # Image gallery
│   │   ├── ProfessionalQA.jsx # FAQ section
│   │   ├── Footer.jsx        # Footer component
│   │   └── VoiceOfTarotAdmin.jsx  # Admin panel component
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── server.js                 # Server entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas account)
- **Gmail Account** (for sending emails, requires App Password)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd SunBathe
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all frontend and backend dependencies listed in `package.json`.

### Step 3: Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/Sound-of-tarot
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Sound-of-tarot

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_16_character_app_password

# Admin Email (receives booking notifications)
ADMIN_EMAIL=admin@example.com

# Server Port (optional, defaults to 5001)
PORT=5001
```

#### How to Get Razorpay Credentials:
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy Key ID and Key Secret

#### How to Get Gmail App Password:
1. Go to Google Account Settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a 16-character password for "Mail"
5. Use this password in `EMAIL_PASS`

### Step 4: Start the Development Servers

The project uses `concurrently` to run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend**: `http://localhost:5001` (Express server)

Alternatively, you can run them separately:

```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend
npm run dev:backend
```

### Step 5: Access the Application

- **Main Website**: Open `http://localhost:5173` in your browser
- **Admin Panel**: Navigate to `http://localhost:5173/admin`
  - Password: `admin123` (change this in production!)

---

## 📋 Step-by-Step Project Flow

### 1. **User Journey - Booking a Session**

#### Step 1.1: Landing Page
- User lands on the homepage (`/`)
- Sees animated hero slider showcasing services
- Scrolls through sections: Vision, Mentor, Services, Testimonials, Gallery, FAQ

#### Step 1.2: Service Selection
- User clicks "Book Now" on a service card (e.g., "1:1 Tarot Guidance")
- Booking modal opens with service details

#### Step 1.3: User Information
- User enters:
  - Full Name
  - Email Address
- Clicks "Continue to Schedule"

#### Step 1.4: Slot Selection
- **For 1:1 Sessions**: System fetches available slots from `/api/slots/:serviceId`
- **For Group Sessions**: System fetches group session dates/times
- User selects a preferred time slot
- System locks the slot for 10 minutes via `/api/lock-slot`

#### Step 1.5: Payment
- User reviews booking details
- Clicks "Confirm & Pay"
- System creates Razorpay order via `/api/create-order`
- Razorpay payment popup opens
- User completes payment

#### Step 1.6: Payment Verification
- Razorpay redirects back with payment details
- Backend verifies payment signature via `/api/verify-payment`
- If valid:
  - Slot is marked as booked in database
  - Booking record is created
  - Confirmation email is sent to user and admin
  - Success screen is shown
- User is redirected to homepage after 8 seconds

### 2. **Admin Journey - Managing Bookings**

#### Step 2.1: Admin Login
- Admin navigates to `/admin`
- Enters password: `admin123`
- Token is stored in localStorage

#### Step 2.2: Dashboard Overview
- Admin sees:
  - Total Bookings count
  - Total Revenue
  - Available Slots per service
- Can navigate to Calendar or Bookings tabs

#### Step 2.3: Calendar Management
- Admin selects service type (Tarot, Group Sound, 1:1 Sound)
- Views calendar grid with all slots
- **Adding Slots**:
  - Clicks on a date cell
  - Enters time (e.g., "10:00")
  - Confirms slot creation
  - Slot is saved via `/api/admin/create-slots`
- **Deleting Slots**:
  - Clicks delete icon on unbooked slot
  - Confirms deletion
  - Slot is removed via `/api/admin/slots/:id` DELETE

#### Step 2.4: Viewing Bookings
- Admin navigates to "Bookings" tab
- Sees all bookings with:
  - Client name and email
  - Service name
  - Date and time
  - Payment status
- Can search bookings by name or email

---

## 🔧 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/slots/:serviceId` | Get available slots for a service |
| POST | `/api/lock-slot` | Lock a slot for 10 minutes |
| POST | `/api/create-order` | Create Razorpay payment order |
| POST | `/api/verify-payment` | Verify payment and create booking |
| GET | `/api/health` | Health check endpoint |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get dashboard statistics |
| GET | `/api/admin/bookings` | Get all bookings |
| GET | `/api/admin/slots/:serviceId` | Get all slots (including booked) |
| POST | `/api/admin/create-slots` | Create new slots |
| DELETE | `/api/admin/slots/:id` | Delete a slot |

---

## 🗄️ Database Schema

### Slot Schema
```javascript
{
  serviceId: String,        // 'tarot_1on1', 'sound_group', 'sound_1on1'
  startTime: Date,          // Slot date and time
  isBooked: Boolean,        // Booking status
  lockedUntil: Date        // Temporary lock expiry
}
```

### Booking Schema
```javascript
{
  userName: String,         // Client name
  userEmail: String,        // Client email
  serviceName: String,      // Service booked
  slotId: ObjectId,         // Reference to Slot
  option: String,           // For group bookings
  paymentId: String,        // Razorpay payment ID
  orderId: String,          // Razorpay order ID
  amount: Number,           // Amount paid
  bookedAt: Date           // Booking timestamp
}
```

---

## 🎨 Component Breakdown

### Main Website Components

1. **Navbar** (`Navbar.jsx`)
   - Fixed navigation bar
   - Smooth scroll to sections
   - Mobile-responsive menu

2. **Hero** (`Hero.jsx`)
   - Auto-rotating slider (3 slides)
   - Animated transitions
   - Call-to-action buttons

3. **Vision** (`Vision.jsx`)
   - About section explaining the philosophy
   - Three pillars: Awareness, Alignment, Healing

4. **Mentor** (`Mentor.jsx`)
   - Founder introduction (Sapna Shahri)
   - Image with animated border
   - Experience and client statistics

5. **VoiceOfTarotOfferings** (`VoiceOfTarotOfferings.jsx`)
   - Service cards display
   - Multi-step booking modal
   - Payment integration
   - Success screen

6. **Testimonials** (`Testimonials.jsx`)
   - Client testimonials carousel

7. **Gallery** (`Gallery.jsx`)
   - Image gallery grid

8. **ProfessionalQA** (`ProfessionalQA.jsx`)
   - FAQ accordion section

9. **Footer** (`Footer.jsx`)
   - Contact information
   - Social media links

### Admin Components

1. **VoiceOfTarotAdmin** (`VoiceOfTarotAdmin.jsx`)
   - Main admin container
   - Login screen
   - Three tabs: Overview, Calendar, Bookings
   - Toast notifications
   - Modal confirmations

---

## 🔐 Security Features

1. **Payment Verification**: Cryptographic signature verification using HMAC-SHA256
2. **Slot Locking**: Prevents race conditions during booking
3. **Helmet.js**: Security headers protection
4. **CORS**: Configured for allowed origins
5. **Environment Variables**: Sensitive data stored in `.env`
6. **Admin Authentication**: Password-protected admin panel

---

## 📦 Building for Production

### Build Frontend

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

The project includes `vercel.json` configuration for Vercel deployment:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The `vercel.json` handles:
- API route proxying to `/api/index.js`
- SPA routing (all routes → `index.html`)

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check MongoDB Atlas connection string
- Verify network access in MongoDB Atlas IP whitelist

### Email Not Sending
- Verify Gmail App Password is correct (16 characters)
- Check if 2-Step Verification is enabled
- Ensure `EMAIL_USER` matches your Gmail address

### Payment Gateway Errors
- Verify Razorpay keys are correct
- Check if using Test keys in development
- Ensure webhook URLs are configured (if using webhooks)

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5001
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5001 | xargs kill
  ```

---

## 📝 Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb://localhost:27017/Sound-of-tarot` |
| `RAZORPAY_KEY_ID` | Yes | Razorpay Key ID | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Yes | Razorpay Key Secret | `xxxxx` |
| `EMAIL_USER` | Yes | Gmail address | `your-email@gmail.com` |
| `EMAIL_PASS` | Yes | Gmail App Password | `xxxx xxxx xxxx xxxx` |
| `ADMIN_EMAIL` | Yes | Admin notification email | `admin@example.com` |
| `PORT` | No | Backend server port | `5001` |

---

## 🎯 Services Offered

1. **1:1 Tarot Guidance** - ₹2,500
   - 60 minutes
   - Online/Offline
   - Location: Khar West

2. **Group Sound Healing** - ₹1,500
   - 60 minutes
   - In-person
   - Location: Khar West
   - Max 10 people

3. **1:1 Personal Sound** - ₹3,100
   - 60 minutes
   - In-person
   - Location: Khar West

---

## 📄 License

This project is private and proprietary.

---

## 👤 Author

Built for **Sound of Tarot** by Sapna Shahri

---

## 🤝 Contributing

This is a private project. For issues or suggestions, please contact the project maintainer.

---

## 📞 Support

For technical support or questions about the booking system, please contact the admin.

---

**Built with ❤️ using React, Node.js, and MongoDB**
