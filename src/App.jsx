import React, { useState , useRef , useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Sparkles, Moon, Waves, ArrowRight, X, Calendar, User, Mail, CheckCircle, Download ,
  Star,
  MapPin,
  Quote,
  Menu,
  Play,
  Compass, 
  ArrowLeft,
  Instagram,
  Linkedin,
  Wind,
  Sun,
  ArrowUpRight,
  MoveRight,
  ArrowDown,
  Globe,
  ShieldCheck,
  Clock,
  Minus,
  Plus
} from "lucide-react";
import PaymentSection1 from "./components/PaymentSection1";
import VoiceOfTarotOfferings from "./components/VoiceOfTarotOfferings";
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
const handleScroll = (e) => {
    // 1. Prevent the default 'snap' behavior of the <a> tag
    e.preventDefault();
    
    // 2. Find the element by ID
    const target = document.getElementById('offerings');
  
    if (target) {
      // 3. Smoothly scroll to it
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };
  return (
    <nav className="fixed z-50 w-full border-b bg-stone-50/90 backdrop-blur-md border-stone-200">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-none bg-stone-900">
              <span className="font-serif text-xl font-bold text-white">V</span>
            </div>
            <span className="font-serif text-xl font-bold tracking-wide uppercase text-stone-900">
              VoiceOfTarot
            </span>
          </div>
        
          {/* Desktop Links */}
          <div className="items-center hidden space-x-12 text-sm font-medium tracking-widest uppercase md:flex text-stone-600">
            <a
              href="#vision"
              className="transition-colors hover:text-stone-900"
            >
              Vision
            </a>
            <a
              href="#Mentor"
              className="transition-colors hover:text-stone-900"
            >
              The Mentor
            </a>
            
            <a
              href="#offerings" 
            onClick={handleScroll}
              className="transition-colors hover:text-stone-900"
            >
              Offerings
            </a>
            <a
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="block font-medium text-stone-900"
            >
              Gallery
            </a>
            
            <button
  onClick={() => {
    const element = document.getElementById('offerings');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }}
  className="px-8 py-3 text-white transition-all duration-300 bg-stone-900 hover:bg-stone-800"
>
  Reserve Seat
</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-900"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="p-6 space-y-4 border-b md:hidden bg-stone-50 border-stone-200">
          <a
            href="#vision"
            onClick={() => setIsOpen(false)}
            className="block font-medium text-stone-900"
          >
            Vision
          </a>
          <a
            href="#Mentor"
            onClick={() => setIsOpen(false)}
            className="block font-medium text-stone-900"
          >
            Mentor
          </a>
          <a
            href="#Offerings"
            onClick={() => setIsOpen(false)}
            className="block font-medium text-stone-900"
          >
            Offerings
          </a>
          <a
            href="#gallery"
            onClick={() => setIsOpen(false)}
            className="block font-medium text-stone-900"
          >
            Gallery
          </a>
          
          <a
            href="#register"
            onClick={() => setIsOpen(false)}
            className="block font-bold text-stone-900"
          >
            Reserve
          </a>
        </div>
      )}
    </nav>
  );
};
const Vision = () => {
  const pillars = [
    {
      title: "Strategic Intuition",
      desc: "Learn to use Tarot not as fortune-telling, but as a visual map for decision-making and cognitive clarity.",
    },
    {
      title: "Solar Energetics",
      desc: "Techniques to manage your 'inner sun'—the confidence and vital energy required to lead and create.",
    },
    {
      title: "Professional Sangha",
      desc: "Connect with a curated circle of high-achievers who value depth, discretion, and spiritual growth.",
    },
  ];

  return (
    <section id="vision" className="py-24 bg-stone-100">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-3xl mb-16">
          <h2 className="mb-6 font-serif text-4xl text-stone-900">
            The Philosophy
          </h2>
          <p className="text-xl leading-relaxed text-stone-600">
            Modern life rewards the hustle, but success requires the pause.
            Sunbathe is a high-frequency environment where we strip away the
            noise to hear your inner voice.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div key={i} className="p-8 bg-white border border-stone-200">
              <div className="w-10 h-px mb-6 bg-amber-700"></div>
              <h3 className="mb-4 font-serif text-xl text-stone-900">
                {pillar.title}
              </h3>
              <p className="leading-relaxed text-stone-500">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
const reviews = [
    {
      quote: "Sapna's approach is clinical yet deeply spiritual. She helped me navigate a massive corporate pivot with a clarity I couldn't find in any boardroom.",
      author: "Ananya R.",
      role: "Creative Director",
    },
    {
      quote: "The Sunbathe retreat was the first time in years I felt my nervous system actually settle. The solar work is life-changing.",
      author: "Vikram S.",
      role: "Tech Mentor",
    },
    {
      quote: "VoiceOfTarot doesn't just give answers; they give you the tools to find your own. An essential experience for any modern leader.",
      author: "Priya M.",
      role: "Strategy Consultant",
    },
  ];
  return (
    <section className="py-24 bg-[#FCFBF8] overflow-hidden">
      <div className="px-6 mx-auto max-w-7xl">
        



        
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT: THE CURVY VIDEO PLAYER */}
          <div className="relative group">
            {/* Organic Background Blobs for Depth */}
            <div className="absolute w-64 h-64 rounded-full -top-10 -left-10 bg-amber-100/50 blur-3xl" />
            <div className="absolute rounded-full -bottom-10 -right-10 w-80 h-80 bg-stone-200/40 blur-3xl" />

            {/* The Main Curvy Video Container */}
            <motion.div 
              initial={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              animate={{ 
                borderRadius: isPlaying 
                  ? "20px" // Becomes more stable when playing
                  : "60% 40% 30% 70% / 60% 30% 70% 40%" 
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="relative overflow-hidden border shadow-2xl aspect-square md:aspect-video lg:aspect-square border-stone-200 bg-stone-900"
            >
              <video
                ref={videoRef}
                src="https://path-to-your-video.mp4" // YOUR TESTIMONIAL VIDEO HERE
                className="object-cover w-full h-full"
                poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000" // Man Portrait
                onEnded={() => setIsPlaying(false)}
              />

              {/* Aesthetic Play Overlay */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/40 backdrop-blur-[2px] cursor-pointer"
                    onClick={togglePlay}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-xl text-stone-900"
                    >
                      <Play fill="currentColor" size={28} className="ml-1" />
                    </motion.div>
                    <p className="mt-4 font-serif text-xs italic tracking-widest text-white uppercase">
                      Watch His Story
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Floating Quote Tag */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-stone-100 hidden md:block max-w-[200px]">
              <div className="flex text-amber-500 mb-2 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              <p className="text-[10px] uppercase tracking-tighter font-bold text-stone-400">Trusted Guidance</p>
            </div>
          </div>

          {/* RIGHT: THE CONTENT */}
          <div className="flex flex-col space-y-8">
            <Quote className="w-12 h-12 text-amber-200/60" />
            
            <h2 className="font-serif text-4xl leading-tight md:text-5xl text-stone-900">
              "The clarity I found with Sapna was <span className="italic underline text-stone-500 decoration-amber-200 underline-offset-8">unprecedented</span>."
            </h2>

            <p className="text-lg leading-relaxed text-stone-600">
              As a founder, the noise is constant. This wasn't just a reading; it was a clinical realignment of my purpose and strategy. Sapna bridges the gap between the mystical and the professional in a way that just works.
            </p>

            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-sm font-bold tracking-widest uppercase text-stone-900">Vikram Sethi</h4>
              <p className="text-xs tracking-wide text-stone-400">Tech Entrepreneur & Mentor</p>
            </div>

            <div  className="flex gap-4">
              <button onClick={() => {
    const element = document.getElementById('offerings');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }} className="px-8 py-3 text-xs font-bold tracking-widest uppercase transition-colors bg-stone-900 text-stone-50 hover:bg-stone-800">
                <a href="#register">Book Your Experience</a> 
              </button>
            </div>
          </div>

        </div>
        <div className="grid gap-8 mt-20 -mb-12 md:grid-cols-3">
          {reviews.map((rev, i) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={i}
              className="flex flex-col justify-between p-10 border bg-stone-50 border-stone-100"
            >
              <div>
                <div className="flex gap-1 mb-6 text-amber-600">
                  {[...Array(5)].map((_, star) => (
                    <Star key={star} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mb-8 font-serif text-lg italic leading-relaxed text-stone-700">
                  "{rev.quote}"
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-stone-900">
                  {rev.author}
                </p>
                <p className="text-xs tracking-wide text-stone-500">
                  {rev.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
};
const Hero = () => {
  return (
    <section className="relative flex items-center min-h-screen pt-20 bg-stone-50">
      <div className="grid items-center w-full grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:px-8 lg:grid-cols-2">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:pr-12"
        >
          <span className="inline-block py-1 px-3 border border-stone-300 text-stone-500 text-xs tracking-[0.2em] uppercase mb-6">
            Exclusive Event
          </span>
          <h1 className="font-serif text-5xl lg:text-7xl text-stone-900 leading-[1.1] mb-8">
            The <span className="italic text-amber-700">Sunbathe</span> <br />{" "}
            Initiative.
          </h1>
          <p className="max-w-lg mb-10 text-lg leading-relaxed text-stone-600">
            A curated spiritual immersion for the modern professional. Realign
            your intuition through advanced Tarot systems and solar energy work.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#register"
              className="flex items-center gap-4 px-8 py-4 text-white transition-all group bg-stone-900 hover:bg-stone-800"
            >
              <span className="text-sm font-medium tracking-widest uppercase">
                Secure Access
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <Star className="w-4 h-4 fill-amber-700 text-amber-700" />
              <span>Limited to 30 Seats</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] w-full"
        >
          <div className="absolute inset-0 bg-stone-200"></div>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Serene Environment"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute max-w-xs p-6 border-l-4 shadow-xl bottom-8 left-8 bg-white/90 backdrop-blur border-amber-700">
            <p className="font-serif text-lg italic text-stone-800">
              "Clarity is the ultimate luxury."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Mentor = () => {
  return (
    <section id="Mentor" className="py-24 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Mentor Image (Left) */}
          <div className="relative lg:col-span-5">
            <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative">
              <img
                src="/Founder_Image.jpeg"
                alt="Mentor Portrait"
                className="object-cover w-full h-full transition-all duration-700 hover:scale-105d"
              />
            </div>
            {/* Minimal Decoration */}
            <div className="absolute w-32 h-32 border-b-2 border-r-2 -bottom-6 -right-6 border-stone-300"></div>
          </div>

          {/* Mentor Content (Right) */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="mb-8">
              <h3 className="mb-2 text-sm font-bold tracking-widest uppercase text-amber-700">
                The Mentor
              </h3>
              <h2 className="mb-6 font-serif text-4xl lg:text-5xl text-stone-900">
                Sapna Shahri
              </h2>
              <div className="w-20 h-px bg-stone-300"></div>
            </div>

            <p className="mb-6 text-lg leading-relaxed text-stone-600">
              As the visionary behind{" "}
              <span className="font-semibold text-stone-900">VoiceOfTarot</span>
              , Sapna has spent over a decade guiding individuals by blending
              ancient esoteric wisdom with modern-day clarity and conscious
              living.
            </p>

            <p className="mb-8 text-lg leading-relaxed text-stone-600">
              “VoiceOfTarot was born from the need for inner silence in an
              increasingly noisy world. It is not just about tarot readings, but
              a space for recalibration — created for leaders, creatives, and
              seekers who are ready to realign, gain clarity, and move forward
              with purpose.”
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block font-serif text-3xl text-stone-900">
                  18yr+
                </span>
                <span className="text-sm tracking-wider uppercase text-stone-500">
                  Experience
                </span>
              </div>
              <div>
                <span className="block font-serif text-3xl text-stone-900">
                  1k+
                </span>
                <span className="text-sm tracking-wider uppercase text-stone-500">
                  Clients Worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};




// const VoiceOfTarotOfferings = () => {
//   const pillars = [
//     {
//       icon: <Compass size={24} />,
//       title: "Intuitive Guidance",
//       desc: "Deeply personalized tarot explorations of love, career, and soul purpose. We bridge the gap between your current path and your highest alignment.",
//       label: "Insight"
//     },
//     {
//       icon: <Sparkles size={24} />,
//       title: "Spiritual Coaching",
//       desc: "Transforming confusion into manifestation. I combine tarot wisdom with practical coaching to help you align with your truest desires.",
//       label: "Growth"
//     },
//     {
//       icon: <Moon size={24} />,
//       title: "Meditation Facilitation",
//       desc: "Guided journeys designed to silence external noise, opening the gateway to your own inner wisdom and profound peace.",
//       label: "Stillness"
//     },
//     {
//       icon: <Waves size={24} />,
//       title: "Sound Healing",
//       desc: "Energy balancing through sacred frequencies. We work with your chakras to promote emotional, spiritual, and energetic harmony.",
//       label: "Healing"
//     },
//   ];

//   return (
//     <section id="offerings" className="py-24 bg-[#f4f4f2]">
//       <div className="max-w-6xl px-6 mx-auto">
        
//         {/* HEADER SECTION */}
//         <div className="max-w-3xl mb-20">
//           <div className="inline-block px-4 py-1 mb-6 rounded-full bg-stone-200/50">
//             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-600">18+ Years of Mastery</p>
//           </div>
//           <h2 className="mb-6 font-serif text-5xl leading-tight md:text-6xl text-stone-900">
//             The <span className="italic ">Practice.</span>
//           </h2>
//           <p className="text-lg font-light leading-relaxed text-stone-500">
//             Blending ancient wisdom with intuitive insight to facilitate your unique spiritual evolution and clarity.
//           </p>
//         </div>

//         {/* INTERACTIVE CARDS */}
//        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//   {pillars.map((item, idx) => (
//     <div
//       key={idx}
//       className="relative p-10 overflow-hidden transition-all duration-500 border rounded-sm cursor-default group bg-stone-100 border-stone-200/60 hover:shadow-2xl"
//     >
//       {/* ANIMATED BORDER OVERLAY */}
//       {/* This span creates the black border "draw" effect */}
//       <span className="absolute inset-0 border-2 border-black transition-all duration-500 ease-in-out [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0_0_0_0)] pointer-events-none z-20"></span>

//       {/* ICON & LABEL */}
//       <div className="relative z-10 flex items-start justify-between mb-10">
//         <div className="p-3 transition-all duration-500 bg-white shadow-sm text-stone-400 group-hover:text-black group-hover:scale-110">
//           {item.icon}
//         </div>
//         <span className="text-[10px] font-bold tracking-[0.25em] text-stone-300 group-hover:text-stone-400 transition-colors uppercase">
//           {item.label}
//         </span>
//       </div>

//       {/* TEXT CONTENT */}
//       <div className="relative z-10">
//         <h3 className="mb-4 font-serif text-2xl transition-all duration-500 text-stone-900 group-hover:italic group-hover:translate-x-1">
//           {item.title}
//         </h3>
        
//         <p className="mb-8 text-sm leading-relaxed transition-colors duration-500 text-stone-500 group-hover:text-stone-800">
//           {item.desc}
//         </p>

//         {/* INTERACTIVE CTA */}
//         <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-black transition-all cursor-pointer">
//           <span className="relative">
//             View Details
//             <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-500 group-hover:w-full"></span>
//           </span>
//           <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
//         </div>
//       </div>

//       {/* SUBTLE BACKGROUND DECOR */}
//       <div className="absolute transition-colors duration-700 pointer-events-none -bottom-4 -right-4 text-stone-200/20 group-hover:text-stone-200/40">
//         {React.cloneElement(item.icon, { size: 100 })}
//       </div>
//     </div>
//   ))}
// </div>

//         {/* OUTCOMES SECTION */}
        

//       </div>
//     </section>
//   );
// };


// const VoiceOfTarotOfferings = () => {
//   const [loading, setLoading] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null); // For Registration Modal
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
//   const [showCalendly, setShowCalendly] = useState(false);
//   const [isBooked, setIsBooked] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState(null);

//   const BACKEND_URL = "http://localhost:5000";
//   const CALENDLY_URL = "https://calendly.com/rushikesh-khedekar22-spit/30min";

//   const events = [
//     { id: "service_tarot", title: "Intuitive Guidance", price: 2100, label: "Insight", icon: <Compass size={24} />, desc: "Deeply personalized tarot explorations of soul purpose." },
//     { id: "service_coaching", title: "Spiritual Coaching", price: 5000, label: "Growth", icon: <Sparkles size={24} />, desc: "Transforming confusion into manifestation and clarity." },
//     { id: "service_healing", title: "Sound Healing", price: 3500, label: "Healing", icon: <Waves size={24} />, desc: "Energy balancing through sacred frequencies and chakras." },
//   ];

//   // --- 1. SCRIPT & EVENT LISTENERS ---
//   useEffect(() => {
//     const handleCalendlyEvent = (e) => {
//       if (e.data.event === 'calendly.event_scheduled') setIsBooked(true);
//     };
//     window.addEventListener('message', handleCalendlyEvent);
//     return () => window.removeEventListener('message', handleCalendlyEvent);
//   }, []);

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = src;
//       script.onload = () => resolve(true);
//       document.body.appendChild(script);
//     });
//   };

//   // --- 2. PAYMENT LOGIC ---
//   const handleFinalPayment = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const rzpLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
//     const calLoaded = await loadScript('https://assets.calendly.com/assets/external/widget.js');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: selectedEvent.price, serviceId: selectedEvent.id }),
//       });
//       const data = await response.json();

//       const options = {
//         key: data.key_id,
//         amount: data.amount,
//         currency: data.currency,
//         name: "VoiceOfTarot",
//         order_id: data.id,
//         prefill: { name: formData.name, email: formData.email, contact: formData.phone },
//         handler: async (paymentResponse) => {
//           const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(paymentResponse),
//           });
//           const verification = await verifyRes.json();
//           if (verification.success) {
//             setPaymentDetails({ paymentId: paymentResponse.razorpay_payment_id, ...selectedEvent });
//             setShowCalendly(true);
//             setSelectedEvent(null); // Close registration modal
//           }
//         },
//         theme: { color: "#000000" },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- 3. RECEIPT GENERATOR ---
//   const downloadReceipt = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.text("VOICE OF TAROT", 105, 20, { align: "center" });
//     doc.autoTable({
//       startY: 40,
//       head: [['Field', 'Details']],
//       body: [
//         ['Customer', formData.name],
//         ['Email', formData.email],
//         ['Service', paymentDetails.title],
//         ['Payment ID', paymentDetails.paymentId],
//         ['Amount', `INR ${paymentDetails.price}`],
//       ],
//       headStyles: { fillColor: [0, 0, 0] }
//     });
//     doc.save(`Receipt_${paymentDetails.paymentId}.pdf`);
//   };

//   if (showCalendly) {
//     return (
//       <div className="fixed inset-0 z-[100] bg-black overflow-y-auto py-12 px-6">
//         <div className="grid max-w-6xl gap-12 mx-auto lg:grid-cols-2">
//           <div className="space-y-6 text-white">
//             <h2 className="font-serif text-5xl italic">Payment Success.</h2>
//             <p className="text-stone-400">Book your {paymentDetails?.title} slot below.</p>
//             {isBooked && (
//               <button onClick={downloadReceipt} className="flex items-center gap-3 bg-white text-black px-8 py-4 font-bold uppercase text-[10px] tracking-widest">
//                 <Download size={16}/> Download Receipt
//               </button>
//             )}
//           </div>
//           <div className="p-2 bg-white rounded">
//             <div className="calendly-inline-widget" data-url={CALENDLY_URL} style={{ height: '600px' }}></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section id="offerings" className="py-24 bg-[#f4f4f2] min-h-screen">
//       <div className="max-w-6xl px-6 mx-auto">
//         <div className="max-w-3xl mb-20">
//           <h2 className="mb-4 font-serif text-5xl md:text-6xl text-stone-900">Upcoming <span className="italic">Events.</span></h2>
//           <p className="text-stone-500">Select a practice to begin your journey.</p>
//         </div>

//         <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//           {events.map((item) => (
//             <div key={item.id} className="p-8 transition-all bg-white border border-stone-200 group hover:shadow-xl">
//               <div className="mb-6 transition-colors text-stone-400 group-hover:text-black">{item.icon}</div>
//               <h3 className="mb-4 font-serif text-2xl">{item.title}</h3>
//               <p className="mb-8 text-sm text-stone-500">{item.desc}</p>
//               <button 
//                 onClick={() => setSelectedEvent(item)}
//                 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:gap-4 transition-all"
//               >
//                 Register Now <ArrowRight size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* REGISTRATION MODAL */}
//       {selectedEvent && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="relative w-full max-w-md p-10 bg-white">
//             <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4"><X size={20} /></button>
//             <h3 className="mb-2 font-serif text-3xl italic">Register.</h3>
//             <p className="mb-8 text-xs tracking-widest uppercase text-stone-500">{selectedEvent.title} — ₹{selectedEvent.price}</p>
            
//             <form onSubmit={handleFinalPayment} className="space-y-4">
//               <div className="relative">
//                 <User size={16} className="absolute left-3 top-3.5 text-stone-400" />
//                 <input required placeholder="Full Name" className="w-full py-3 pl-10 pr-4 text-sm border border-stone-200 focus:outline-black" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
//               </div>
//               <div className="relative">
//                 <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
//                 <input required type="email" placeholder="Email Address" className="w-full py-3 pl-10 pr-4 text-sm border border-stone-200 focus:outline-black" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
//               </div>
//               <button type="submit" disabled={loading} className="w-full bg-black text-white py-4 font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-stone-800 transition-all">
//                 {loading ? "Processing..." : "Pay & Book Slot"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };





{/* <PaymentSection/> */}
// const PaymentSection = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showCalendly, setShowCalendly] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState(null);
  
//   // 1. Service Pricing Configuration
//   const SERVICES = {
//     tarot: { name: "Tarot Reading", price: 2100, id: "service_tarot" },
//     coaching: { name: "Spiritual Coaching", price: 5000, id: "service_coaching" },
//     healing: { name: "Sound Healing", price: 3500, id: "service_healing" },
//   };

//   const [selectedService, setSelectedService] = useState('tarot');

//   const BACKEND_URL = "http://localhost:5000";
//   const CALENDLY_URL = "https://calendly.com/rushikesh-khedekar22-spit/30min";

//   // Load Calendly script
//   useEffect(() => {
//     if (showCalendly && !document.querySelector('script[src*="calendly"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://assets.calendly.com/assets/external/widget.js';
//       script.async = true;
//       document.body.appendChild(script);

//       const link = document.createElement('link');
//       link.href = 'https://assets.calendly.com/assets/external/widget.css';
//       link.rel = 'stylesheet';
//       document.head.appendChild(link);
//     }
//   }, [showCalendly]);

//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     const isLoaded = await loadRazorpay();
//     if (!isLoaded) {
//       setError("Payment gateway failed to load. Please check your connection.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // Create Order with the DYNAMIC price based on selection
//       const response = await fetch(`${BACKEND_URL}/api/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           amount: SERVICES[selectedService].price,
//           serviceId: SERVICES[selectedService].id 
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to create order");
//       const data = await response.json();

//       const options = {
//         key: data.key_id,
//         amount: data.amount,
//         currency: data.currency,
//         name: "VoiceOfTarot",
//         description: `${SERVICES[selectedService].name} Session`,
//         order_id: data.id,
//         handler: async (paymentResponse) => {
//           const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(paymentResponse),
//           });

//           const verification = await verifyRes.json();
//           if (verification.success) {
//             // Instead of redirecting, show Calendly
//             setPaymentDetails({
//               paymentId: paymentResponse.razorpay_payment_id,
//               service: selectedService,
//               serviceName: SERVICES[selectedService].name
//             });
//             setShowCalendly(true);
//             setLoading(false);
//           } else {
//             setError("Verification failed.");
//             setLoading(false);
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             setLoading(false);
//           }
//         },
//         theme: { color: "#000000" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const handleBackToSelection = () => {
//     setShowCalendly(false);
//     setPaymentDetails(null);
//   };

//   // Calendly View
//   if (showCalendly) {
//     return (
//       <section id="booking" className="py-24 text-white bg-black">
//         <div className="max-w-6xl px-6 mx-auto lg:px-8">
//           <div className="mb-8">
//             <button
//               onClick={handleBackToSelection}
//               className="flex items-center gap-2 text-sm transition-colors text-stone-400 hover:text-white"
//             >
//               <ArrowLeft size={16} />
//               Back to Services
//             </button>
//           </div>

//           <div className="grid items-start grid-cols-1 gap-16 lg:grid-cols-2">
//             {/* Left: Booking Confirmation */}
//             <div className="space-y-12 lg:sticky lg:top-24">
//               <div>
//                 <div className="inline-block px-4 py-1 mb-6 border border-stone-700">
//                   <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-stone-500">Payment Successful</p>
//                 </div>
//                 <h2 className="font-serif text-6xl italic tracking-tight leading-[1.1] text-white mb-4">Book Your Session.</h2>
//                 <p className="max-w-md text-base leading-relaxed text-stone-400">
//                   Your payment has been confirmed. Select a convenient time for your {paymentDetails?.serviceName} session.
//                 </p>
//               </div>

//               <div className="p-8 border border-stone-800 bg-stone-900/50">
//                 <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 mb-4">Booking Details</p>
                
//                 <div className="space-y-4">
//                   <div className="flex justify-between pb-3 border-b border-stone-800">
//                     <span className="text-sm text-stone-400">Service</span>
//                     <span className="text-sm font-medium">{paymentDetails?.serviceName}</span>
//                   </div>
//                   <div className="flex justify-between pb-3 border-b border-stone-800">
//                     <span className="text-sm text-stone-400">Payment ID</span>
//                     <span className="font-mono text-xs text-stone-300">{paymentDetails?.paymentId?.substring(0, 20)}...</span>
//                   </div>
//                   <div className="flex justify-between pb-3 border-b border-stone-800">
//                     <span className="text-sm text-stone-400">Amount Paid</span>
//                     <span className="text-sm font-medium">₹{SERVICES[paymentDetails?.service]?.price?.toLocaleString('en-IN')}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-stone-400">Validity</span>
//                     <span className="text-sm font-medium">30 Days</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6 bg-black border border-stone-700">
//                 <div className="flex items-start gap-4">
//                   <div className="p-2 rounded bg-stone-900">
//                     <Calendar size={20} className="text-stone-400" />
//                   </div>
//                   <div>
//                     <p className="mb-2 text-xs font-bold tracking-wider uppercase text-stone-400">Next Steps</p>
//                     <p className="text-sm leading-relaxed text-stone-300">
//                       Choose your preferred date and time from the calendar. You'll receive a confirmation email with meeting details.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right: Calendly Widget */}
//             <div className="relative">
//               <div className="relative overflow-hidden bg-white border shadow-2xl border-stone-200">
//                 <div 
//                   className="calendly-inline-widget" 
//                   data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=000000&text_color=262626&background_color=ffffff`}
//                   style={{ minWidth: '320px', height: '700px' }}
//                 ></div>
//               </div>
//               <p className="mt-4 text-[9px] text-center text-stone-400 tracking-wider">
//                 Powered by Calendly • Secure Scheduling
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Payment View (Original)
//   return (
//     <section id="register" className="py-24 text-white bg-black">
//       <div className="max-w-6xl px-6 mx-auto lg:px-8">
//         <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">

//           <div className="space-y-12">
//             <div>
//               <div className="inline-block px-4 py-1 mb-6 border border-stone-700">
//                 <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-stone-500">Secure Your Session</p>
//               </div>
//               <h2 className="font-serif text-6xl italic tracking-tight leading-[1.1] text-white mb-4">The Selection.</h2>
//               <p className="max-w-md text-base leading-relaxed text-stone-400">Choose the modality that resonates with your current journey.</p>
//             </div>

//             {/* SERVICE SELECTOR UI */}
//             <div className="space-y-4">
//               {Object.keys(SERVICES).map((key) => (
//                 <div 
//                   key={key}
//                   onClick={() => setSelectedService(key)}
//                   className={`p-6 border transition-all cursor-pointer flex justify-between items-center ${
//                     selectedService === key ? 'border-white bg-stone-900' : 'border-stone-800 bg-transparent hover:border-stone-600'
//                   }`}
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedService === key ? 'border-white' : 'border-stone-600'}`}>
//                       {selectedService === key && <div className="w-2 h-2 bg-white rounded-full"></div>}
//                     </div>
//                     <span className="text-sm font-medium tracking-widest uppercase">{SERVICES[key].name}</span>
//                   </div>
//                   <span className="font-serif text-lg">₹{SERVICES[key].price}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-white opacity-90"></div>
//             <div className="relative text-black border shadow-2xl p-14 bg-white/80 backdrop-blur-sm border-stone-200/50">
//               <div className="flex items-end justify-between pb-10 mb-12 border-b-2 border-stone-200">
//                 <div>
//                   <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 mb-3">Confirmation</p>
//                   <h3 className="font-serif text-4xl italic leading-none text-stone-900">{SERVICES[selectedService].name}</h3>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-serif text-3xl italic text-stone-900">₹{SERVICES[selectedService].price.toLocaleString('en-IN')}</p>
//                   <p className="text-[9px] tracking-wider uppercase text-stone-400 mt-1">Total Payable</p>
//                 </div>
//               </div>

//               <div className="mb-14 space-y-7">
//                 <div className="flex items-center gap-5 text-stone-900">
//                   <div className="p-2 rounded bg-stone-100"><Calendar size={20} className="text-stone-600" /></div>
//                   <div>
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1">Validity</p>
//                     <span className="text-sm font-semibold tracking-wide">30 Days from Purchase</span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-5 text-stone-900">
//                   <div className="p-2 rounded bg-stone-100"><MapPin size={20} className="text-stone-600" /></div>
//                   <div>
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1">Location</p>
//                     <span className="text-sm font-semibold tracking-wide">Digital / In-Person (Mumbai)</span>
//                   </div>
//                 </div>
//               </div>

//               {error && (
//                 <div className="p-4 mb-6 text-xs text-red-800 border border-red-200 rounded bg-red-50">{error}</div>
//               )}

//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className="w-full bg-black text-white py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-stone-900 disabled:opacity-50 transition-all flex items-center justify-center gap-4"
//               >
//                 {loading ? "Initializing..." : "Proceed to Pay"}
//                 {!loading && <ArrowRight size={16} />}
//               </button>

//               <p className="mt-6 text-[9px] text-center text-stone-400 tracking-wider">Secure payment via Razorpay</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };


// const PaymentSection = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Constants - use environment variables
//   const EVENT_PRICE = 4999;
//   const BACKEND_URL = "http://localhost:5000";
//   const CALENDLY_URL = "https://calendly.com/your-profile";

//   // Load Razorpay SDK Script
//   const loadRazorpay = () => {
//     return new Promise((resolve) => {
//       if (window.Razorpay) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle the Payment Process
//   const handlePayment = async () => {
//     setLoading(true);
//     setError(null);

//     // Load Razorpay SDK
//     const isLoaded = await loadRazorpay();
//     if (!isLoaded) {
//       setError(
//         "Payment gateway failed to load. Please check your internet connection and try again."
//       );
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1. Create Order on Backend
//       const response = await fetch(`${BACKEND_URL}/api/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: EVENT_PRICE }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to create order");
//       }

//       const data = await response.json();

//       if (!data.id || !data.key_id) {
//         throw new Error("Invalid order response");
//       }

//       // Check if in mock mode
//       if (data.mock) {
//         console.warn("⚠️ MOCK MODE: This is a test transaction");
//         alert(
//           "⚠️ MOCK MODE ACTIVE\n\nYou are testing without real Razorpay credentials.\nThe payment gateway will not open.\n\nOnce you add real keys, this will work normally."
//         );

//         // Simulate successful payment for testing
//         const mockPaymentResponse = {
//           razorpay_order_id: data.id,
//           razorpay_payment_id: `pay_mock_${Date.now()}`,
//           razorpay_signature: "mock_signature",
//         };

//         // Verify mock payment
//         const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(mockPaymentResponse),
//         });

//         const verification = await verifyRes.json();
//         if (verification.success) {
//           alert(
//             "✅ MOCK PAYMENT SUCCESSFUL!\n\nIn real mode, you would be redirected to Calendly now."
//           );
//           // Uncomment when you want to test Calendly redirect:
//           // window.location.href = `${CALENDLY_URL}?payment_id=${mockPaymentResponse.razorpay_payment_id}`;
//         }

//         setLoading(false);
//         return;
//       }

//       // 2. Initialize Razorpay Checkout
//       const options = {
//         key: data.key_id,
//         amount: data.amount,
//         currency: data.currency,
//         name: "VoiceOfTarot",
//         description: "Sunbathe Immersion Pass",
//         order_id: data.id,
//         handler: async (paymentResponse) => {
//           try {
//             // 3. Verify Payment on Backend
//             const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(paymentResponse),
//             });

//             if (!verifyRes.ok) {
//               throw new Error("Payment verification failed");
//             }

//             const verification = await verifyRes.json();

//             if (verification.success) {
//               // Success! Redirect to Calendly
//               window.location.href = `${CALENDLY_URL}?payment_id=${paymentResponse.razorpay_payment_id}`;
//             } else {
//               setError(
//                 "Security verification failed. Please contact support with your payment ID: " +
//                   paymentResponse.razorpay_payment_id
//               );
//             }
//           } catch (verifyError) {
//             console.error("Verification Error:", verifyError);
//             setError(
//               "Payment verification failed. Please contact support with your payment ID: " +
//                 paymentResponse.razorpay_payment_id
//             );
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             setLoading(false);
//             setError(
//               "Payment cancelled. Please try again if you wish to proceed."
//             );
//           },
//         },
//         prefill: {
//           name: "",
//           email: "",
//           contact: "",
//         },
//         notes: {
//           event: "Sunbathe 2026",
//         },
//         theme: {
//           color: "#000000",
//           backdrop_color: "rgba(0, 0, 0, 0.5)",
//         },
//         retry: {
//           enabled: true,
//           max_count: 3,
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       // Handle payment failures
//       rzp.on("payment.failed", function (response) {
//         console.error("Payment Failed:", response.error);
//         setError(
//           `Payment failed: ${
//             response.error.description || "Unknown error"
//           }. Please try again.`
//         );
//         setLoading(false);
//       });

//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       setError(error.message || "Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <section id="register" className="py-24 text-white bg-black">
//       <div className="max-w-6xl px-6 mx-auto lg:px-8">
//         <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
//           {/* CONTENT */}
//           <div className="space-y-12">
//             <div>
//               <div className="inline-block px-4 py-1 mb-6 border border-stone-700">
//                 <p className="text-[9px] font-bold tracking-[0.35em] uppercase text-stone-500">
//                   Exclusive Experience
//                 </p>
//               </div>
//               <h2 className="font-serif text-6xl italic tracking-tight leading-[1.1] text-white mb-4">
//                 The Invitation.
//               </h2>
//               <p className="max-w-md text-base leading-relaxed text-stone-400">
//                 An intimate convergence of mindfulness, mysticism, and culinary
//                 artistry in the heart of Mumbai.
//               </p>
//             </div>
//             <div className="pt-4 space-y-6">
//               {[
//                 "All-access immersion",
//                 "Gourmet dining experience",
//                 "Limited edition tarot deck",
//               ].map((item, i) => (
//                 <div key={i} className="flex items-start gap-4 group">
//                   <div className="mt-0.5">
//                     <CheckCircle
//                       size={18}
//                       className="transition-colors text-stone-700 group-hover:text-stone-500"
//                     />
//                   </div>
//                   <span className="text-sm uppercase tracking-[0.25em] text-stone-300 font-medium">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* PAYMENT CARD */}
//           <div className="relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-white opacity-90"></div>
//             <div className="relative p-14 text-black bg-white/80 backdrop-blur-sm border border-stone-200/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
//               <div className="flex items-end justify-between pb-10 mb-12 border-b-2 border-stone-200">
//                 <div>
//                   <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-stone-400 mb-3">
//                     Confirmation
//                   </p>
//                   <h3 className="font-serif text-4xl italic leading-none text-stone-900">
//                     Sunbathe '26
//                   </h3>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-serif text-3xl italic text-stone-900">
//                     ₹{EVENT_PRICE.toLocaleString("en-IN")}
//                   </p>
//                   <p className="text-[9px] tracking-wider uppercase text-stone-400 mt-1">
//                     Per Guest
//                   </p>
//                 </div>
//               </div>

//               <div className="mb-14 space-y-7">
//                 <div className="flex items-center gap-5 text-stone-900 group">
//                   <div className="p-2 transition-colors rounded bg-stone-100 group-hover:bg-stone-200">
//                     <Calendar size={20} className="text-stone-600" />
//                   </div>
//                   <div>
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1">
//                       Date
//                     </p>
//                     <span className="text-sm font-semibold tracking-wide">
//                       January 25, 2026
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-5 text-stone-900 group">
//                   <div className="p-2 transition-colors rounded bg-stone-100 group-hover:bg-stone-200">
//                     <MapPin size={20} className="text-stone-600" />
//                   </div>
//                   <div>
//                     <p className="text-[9px] font-bold uppercase tracking-wider text-stone-400 mb-1">
//                       Venue
//                     </p>
//                     <span className="text-sm font-semibold tracking-wide">
//                       The Leela, Mumbai
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-4 mb-6 border border-red-200 rounded bg-red-50">
//                   <p className="text-sm text-red-800">{error}</p>
//                 </div>
//               )}

//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className="w-full bg-gradient-to-r from-black to-stone-900 text-white py-6 text-xs font-bold uppercase tracking-[0.4em] hover:from-stone-900 hover:to-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-4 shadow-lg group"
//                 aria-label="Proceed to secure payment"
//               >
//                 {loading ? "Initializing..." : "Secure Admission"}
//                 {!loading && (
//                   <ArrowRight
//                     size={16}
//                     className="transition-transform group-hover:translate-x-1"
//                     aria-hidden="true"
//                   />
//                 )}
//               </button>

//               <p className="mt-6 text-[9px] text-center text-stone-400 tracking-wider">
//                 Secure payment powered by Razorpay
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Footer = () => {
  return (
    <footer className="py-16 border-t bg-stone-50 border-stone-200">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <div className="mb-2">
              <span className="font-serif text-lg font-bold tracking-widest uppercase text-stone-900">
                VoiceOfTarot
              </span>
            </div>
            <p className="text-xs tracking-wide text-stone-400">
              © 2026 VoiceOfTarot. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors text-stone-500 hover:text-stone-900"
            >
              <Instagram size={18} strokeWidth={1.5} />
              <span className="hidden text-xs font-medium tracking-widest uppercase sm:inline">
                Instagram
              </span>
            </a>

            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors text-stone-500 hover:text-stone-900"
            >
              <Linkedin size={18} strokeWidth={1.5} />
              <span className="hidden text-xs font-medium tracking-widest uppercase sm:inline">
                LinkedIn
              </span>
            </a>

            <a
              href="mailto:hello@voiceoftarot.com"
              className="flex items-center gap-2 transition-colors text-stone-500 hover:text-stone-900"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span className="hidden text-xs font-medium tracking-widest uppercase sm:inline">
                Connect
              </span>
            </a>
          </div>

          {/* Legal */}
          <div className="flex gap-6 text-[10px] font-medium tracking-widest uppercase text-stone-400">
            <a href="#" className="hover:text-stone-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-stone-600">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=80&w=800",
      title: "The Sanctuary",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
      title: "Rituals",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800",
      title: "Mindfulness",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      title: "Connection",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col items-end pb-8 mb-12 border-b border-stone-200">
          <span className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-2">
            Atmosphere
          </span>
          <h2 className="font-serif text-4xl text-stone-900">
            Inside the Sanctuary
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden group bg-stone-200 ${img.span}`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 transition-colors duration-500 bg-stone-900/20 group-hover:bg-transparent" />
              <div className="absolute transition-all duration-500 translate-y-4 opacity-0 bottom-6 left-6 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="px-3 py-1 text-xs font-medium tracking-widest text-white uppercase bg-stone-900/50 backdrop-blur-sm">
                  {img.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const ProfessionalQA = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    {
      q: "What can I expect from a private consultation?",
      a: "Each session is a strategic dialogue designed to bridge your current reality with your highest potential. We focus on actionable clarity, uncovering energetic blocks, and mapping out a clear path forward for your personal or professional evolution."
    },
    {
      q: "How should I prepare for our time together?",
      a: "Approach the session with an open mind and a specific area of focus. No prior experience with intuitive practices is required. I translate symbolic archetypes into grounded, practical insights that you can apply immediately to your life."
    },
    {
      q: "Is this approach predictive or advisory?",
      a: "The focus is on 'Intuitive Empowerment.' While we explore potential outcomes and timelines, the goal is to reveal the energies at play so you can make informed, powerful choices. You remain the architect of your own future."
    },
    {
      q: "Is my privacy and information protected?",
      a: "Absolute discretion is the foundation of my practice. Every consultation is held within a secure, sacred container. Your personal details, questions, and the insights shared remain strictly confidential at all times."
    }
  ];

  return (
    <section className="bg-black py-24 md:py-32 text-white border-t border-stone-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="mb-20">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-500 font-bold mb-4">Support</p>
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight">
            Frequently Asked <span className="italic text-stone-400">Questions.</span>
          </h2>
        </div>

        {/* NORMAL ACCORDION STRUCTURE */}
        <div className="space-y-px bg-stone-900 border-y border-stone-900">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-black overflow-hidden transition-all duration-500"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-serif transition-colors duration-300 ${activeIndex === index ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 ml-8 transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  {activeIndex === index ? (
                    <Minus size={20} strokeWidth={1} className="text-white" />
                  ) : (
                    <Plus size={20} strokeWidth={1} className="text-stone-600 group-hover:text-stone-400" />
                  )}
                </div>
              </button>

              <div 
                className={`grid transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-10 pr-12">
                    <p className="text-stone-500 font-light leading-relaxed text-base md:text-lg max-w-2xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL PROFESSIONAL CTA */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-stone-900">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500">Global Consultations Available</p>
          </div>
          
          <button 
            onClick={() => document.getElementById('offerings-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-white border-b border-white pb-1">
              Book Your Session
            </span>
            <div className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
              <ArrowUpRight size={16} />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
function App() {
  return (
    <div className="font-sans bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />
      <Hero />
      <Vision />
      <Mentor />

      <VoiceOfTarotOfferings />
      <Testimonials />
      <Gallery />
      {/* <PaymentSection /> */}
      <ProfessionalQA />
      <Footer />
    </div>
  );
}

export default App;
