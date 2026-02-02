// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Compass, Sparkles, Waves, ArrowRight, X, User,
//   Mail, CheckCircle, CalendarCheck, PartyPopper, Users, Music
// } from 'lucide-react';

// const VoiceOfTarotOfferings = () => {
//   // --- DATA STRUCTURE ---
//   const services = [
//     {
//       id: "tarot_1on1",
//       title: "1:1 Tarot Guidance",
//       price: "2,500",
//       icon: <Compass size={24} strokeWidth={1} />,
//       shortDesc: "Gain clarity on life situations, emotional patterns, and decisions through intuitive tarot guidance.",
//       bestFor: "Confusion, Crossroads, Emotional Reassurance",
//       fullDesc: "This session offers intuitive tarot guidance to help you understand your current situation, emotional patterns, and possible paths forward.",
//       details: [{ label: "Duration", value: "60 Minutes" }, { label: "Mode", value: "Online / Offline" }, { label: "Location", value: "Khar West" }],
//       hasOptions: false,
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
//     },
//     {
//       id: "sound_group",
//       title: "Group Sound Healing",
//       price: "1,500",
//       icon: <Users size={24} strokeWidth={1} />,
//       shortDesc: "A guided group experience using sound frequencies to relax the nervous system.",
//       bestFor: "Stress Relief, Emotional Grounding, Collective Healing",
//       fullDesc: "A collective healing session where sound frequencies are used to calm the nervous system and release emotional stress.",
//       details: [{ label: "Duration", value: "60 Minutes" }, { label: "Group Size", value: "Max 10" }, { label: "Location", value: "Khar West" }],
//       hasOptions: true,
//       options: [
//         { id: "opt_glu", label: "Glu Studios - Sun 8th Feb" },
//         { id: "opt_comm", label: "Community Studios - Sun 1st Feb" }
//       ],
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
//     },
//     {
//       id: "sound_1on1",
//       title: "1:1 Sound Healing",
//       price: "3,100",
//       icon: <Music size={24} strokeWidth={1} />,
//       shortDesc: "A deeply personalised healing session tailored to your emotional needs.",
//       bestFor: "Burnout, Anxiety, Emotional Blocks",
//       fullDesc: "A deeply nurturing one-on-one session using sound instruments to help your body shift from stress to safety.",
//       details: [{ label: "Duration", value: "60 Minutes" }, { label: "Mode", value: "In-Person Only" }, { label: "Location", value: "Khar West" }],
//       hasOptions: false,
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
//     },
//   ];

//   // --- STATE ---
//   const [loading, setLoading] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '', selectedOption: '' });
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [isFullyComplete, setIsFullyComplete] = useState(false);
//   const [countdown, setCountdown] = useState(8);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [bookedServices, setBookedServices] = useState([]);

//   const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;

//   // --- EFFECTS ---
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     const saved = localStorage.getItem('booked_tarot_sessions');
//     if (saved) setBookedServices(JSON.parse(saved));

//     return () => { if(document.body.contains(script)) document.body.removeChild(script); };
//   }, []);

//   useEffect(() => {
//     let timer;
//     if (isFullyComplete && countdown > 0) {
//       timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//     } else if (countdown === 0) {
//       setPaymentSuccess(false);
//       setIsFullyComplete(false);
//       setCountdown(8);
//     }
//     return () => clearInterval(timer);
//   }, [isFullyComplete, countdown]);

//   useEffect(() => {
//     document.body.style.overflow = (paymentSuccess || selectedEvent || isFullyComplete) ? 'hidden' : 'unset';
//   }, [paymentSuccess, selectedEvent, isFullyComplete]);

//   useEffect(() => {
//     const handleCalendlyEvent = (e) => {
//       if (e.data.event === 'calendly.event_scheduled') {
//         const newBookedList = [...bookedServices, paymentDetails.id];
//         setBookedServices(newBookedList);
//         localStorage.setItem('booked_tarot_sessions', JSON.stringify(newBookedList));
//         setIsFullyComplete(true);
//       }
//     };
//     window.addEventListener('message', handleCalendlyEvent);
//     return () => window.removeEventListener('message', handleCalendlyEvent);
//   }, [bookedServices, paymentDetails]);

//   // --- HANDLERS ---
//   const handleFinalPayment = async () => {
//     if (!formData.name || !formData.email) return alert("Please fill in all fields");
//     if (selectedEvent.hasOptions && !formData.selectedOption) return alert("Please select a session date/location");

//     setLoading(true);
//     try {
//       // Clean price string for numeric processing
//       const numericPrice = parseInt(selectedEvent.price.replace(/,/g, ''));

//       const response = await fetch(`${BACKEND_URL}/api/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: numericPrice, serviceId: selectedEvent.id }),
//       });
//       const data = await response.json();

//       const options = {
//         key: data.key_id,
//         amount: data.amount,
//         name: "Voice Of Tarot",
//         order_id: data.id,
//         prefill: { name: formData.name, email: formData.email },
//         handler: (res) => {
//           const bData = {
//             paymentId: res.razorpay_payment_id,
//             id: selectedEvent.id,
//             title: selectedEvent.title,
//             price: selectedEvent.price,
//             calendlyUrl: selectedEvent.calendlyUrl,
//             userName: formData.name,
//             userEmail: formData.email,
//           };
//           setPaymentDetails(bData);
//           setPaymentSuccess(true);
//           setSelectedEvent(null);
//         },
//         theme: { color: "#1c1c1c" },
//       };
//       new window.Razorpay(options).open();
//     } catch (err) { alert("Error connecting to payment gateway"); } finally { setLoading(false); }
//   };

//   return (
//     <section id='offerings' className="py-16 md:py-24 bg-[#FAF9F6] min-h-screen text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
//       <div className="max-w-6xl px-6 mx-auto">

//         {/* HEADER */}
//         <div className="max-w-2xl mb-16 space-y-4 md:mb-24">
//           <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Curated Practices</p>
//           <h2 className="font-serif text-5xl leading-tight tracking-tight md:text-7xl">
//             Upcoming <span className="italic font-light text-stone-500">Events.</span>
//           </h2>
//           <p className="text-base font-light md:text-lg text-stone-500">Select a modality to begin your transformation.</p>
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {services.map((item, index) => {
//             const isBooked = bookedServices.includes(item.id);
//             return (
//               <motion.div
//                 key={item.id}
//                 whileHover="hover"
//                 className="group relative bg-white p-8 md:p-10 flex flex-col justify-between min-h-[550px] transition-all duration-500 hover:shadow-2xl"
//               >
//                 {/* 4-SIDE TRACE ANIMATION */}
//                 <motion.span variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0 }} className="absolute top-0 left-0 w-full h-[2px] bg-stone-900 origin-left transition-transform duration-500" />
//                 <motion.span variants={{ hover: { scaleY: 1 } }} initial={{ scaleY: 0 }} className="absolute top-0 right-0 w-[2px] h-full bg-stone-900 origin-top transition-transform duration-500 delay-75" />
//                 <motion.span variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0 }} className="absolute bottom-0 right-0 w-full h-[2px] bg-stone-900 origin-right transition-transform duration-500 delay-150" />
//                 <motion.span variants={{ hover: { scaleY: 1 } }} initial={{ scaleY: 0 }} className="absolute bottom-0 left-0 w-[2px] h-full bg-stone-900 origin-bottom transition-transform duration-500 delay-225" />
//                 <div className="absolute inset-0 border border-stone-200 z-[-1]" />

//                 <div className="relative z-10">
//                   <div className="flex items-start justify-between mb-8 transition-colors md:mb-12 text-stone-300 group-hover:text-stone-900">
//                     {item.icon}
//                     <span className="text-[10px] font-bold tracking-widest">0{index+1}</span>
//                   </div>
//                   <h3 className="mb-4 font-serif text-2xl md:mb-6 md:text-3xl">{item.title}</h3>
//                   <p className="mb-4 text-sm font-light leading-relaxed text-stone-500">{item.shortDesc}</p>

//                   <div className="mb-6 space-y-1">
//                      <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block">Best For</span>
//                      <p className="text-[11px] italic text-stone-600 leading-relaxed">{item.bestFor}</p>
//                   </div>

//                   <ul className="space-y-2 md:space-y-3">
//                     {item.details.map((d, i) => (
//                       <li key={i} className="flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400">
//                         <div className="w-1 h-1 transition-colors rounded-full bg-stone-200 group-hover:bg-stone-900" />
//                         {d.label}: <span className="ml-1 text-stone-600">{d.value}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="relative z-10 pt-6 border-t md:pt-8 border-stone-100">
//                   <div className="flex items-center justify-between mb-4 md:mb-6">
//                     <div>
//                       <span className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Exchange</span>
//                       <span className="text-xl font-light md:text-2xl">₹{item.price}</span>
//                     </div>
//                     {!isBooked ? (
//                       <motion.button
//                         onClick={() => setSelectedEvent(item)}
//                         whileHover={{ x: 5, backgroundColor: "#1c1c1c", color: "#fff" }}
//                         className="flex items-center justify-center w-10 h-10 transition-all border rounded-full md:w-12 md:h-12 border-stone-200"
//                       >
//                         <ArrowRight size={18} strokeWidth={1} />
//                       </motion.button>
//                     ) : (
//                       <div className="text-emerald-500"><CheckCircle size={24} /></div>
//                     )}
//                   </div>
//                   {isBooked && (
//                     <button
//                       onClick={() => setSelectedEvent(item)}
//                       className="w-full bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-700 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-stone-200"
//                     >
//                       Book Another Session
//                     </button>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* REGISTRATION OVERLAY */}
//       <AnimatePresence>
//         {selectedEvent && (
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[110] bg-white flex flex-col md:flex-row overflow-hidden h-[100dvh]"
//           >
//             {/* Left/Top Panel */}
//             <div className="w-full md:w-5/12 bg-[#1c1c1c] text-white p-8 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800 shrink-0">
//               <div className="relative z-10">
//                 <button onClick={() => setSelectedEvent(null)} className="flex items-center gap-2 mb-8 transition-colors md:mb-20 text-stone-400 hover:text-white group">
//                   <X size={16} className="transition-transform group-hover:rotate-90" />
//                   <span className="text-[9px] uppercase tracking-[0.2em]">Exit</span>
//                 </button>
//                 <h3 className="mb-4 font-serif text-3xl leading-tight md:text-6xl">{selectedEvent.title}</h3>
//                 <p className="hidden max-w-sm mb-10 text-lg font-light md:block text-stone-400">{selectedEvent.fullDesc}</p>
//                 <div className="hidden pt-10 border-t md:block border-stone-800">
//                   <ul className="space-y-4">
//                     {selectedEvent.details.map((d, i) => (
//                       <li key={i} className="flex items-center gap-4 text-sm font-light text-stone-300">
//                         <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />{d.label}: {d.value}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className="flex items-center justify-between pt-4 border-t md:block md:pt-10 border-stone-800">
//                 <span className="text-[10px] uppercase tracking-widest text-stone-500 md:block md:mb-2">Total Exchange</span>
//                 <span className="text-2xl font-light md:text-5xl">₹{selectedEvent.price}</span>
//               </div>
//             </div>

//             {/* Right Panel: Form */}
//             <div className="w-full md:w-7/12 bg-[#FAF9F6] p-8 md:p-20 flex items-start md:items-center justify-center overflow-y-auto">
//               <div className="w-full max-w-sm">
//                 <h4 className="mb-10 font-serif text-2xl italic md:mb-16 md:text-4xl">Enrollment Details</h4>
//                 <div className="space-y-8 md:space-y-12">
//                   <div className="relative group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Full Name</label>
//                     <div className="flex items-center py-3 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
//                       <User size={16} className="mr-3 text-stone-300" />
//                       <input required value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full text-lg font-light bg-transparent focus:outline-none" placeholder="Your Name" />
//                     </div>
//                   </div>
//                   <div className="relative group">
//                     <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Email Address</label>
//                     <div className="flex items-center py-3 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
//                       <Mail size={16} className="mr-3 text-stone-300" />
//                       <input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full text-lg font-light bg-transparent focus:outline-none" placeholder="email@domain.com" />
//                     </div>
//                   </div>

//                   {/* Options Dropdown if hasOptions is true */}
//                   {selectedEvent.hasOptions && (
//                     <div className="relative group">
//                       <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Select Session</label>
//                       <select
//                         required
//                         value={formData.selectedOption}
//                         onChange={(e)=>setFormData({...formData, selectedOption:e.target.value})}
//                         className="w-full py-3 text-lg font-light bg-transparent border-b appearance-none border-stone-200 focus:outline-none"
//                       >
//                         <option value="">Choose a date & location</option>
//                         {selectedEvent.options.map(opt => (
//                           <option key={opt.id} value={opt.id}>{opt.label}</option>
//                         ))}
//                       </select>
//                     </div>
//                   )}

//                   <button onClick={handleFinalPayment} disabled={loading} className="relative w-full py-5 overflow-hidden text-white transition-all rounded-sm md:py-8 group bg-stone-900 hover:bg-black disabled:bg-stone-300">
//                     <span className="relative z-10 font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase">{loading ? "Processing..." : "Secure Payment"}</span>
//                     <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-stone-800 group-hover:translate-y-0" />
//                   </button>
//                   <p className="text-[8px] text-center uppercase tracking-widest text-stone-400">Encrypted & Secure Transaction</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* POST-PAYMENT & CALENDLY */}
//       <AnimatePresence>
//         {paymentSuccess && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[120] bg-white flex flex-col h-[100dvh] overflow-hidden">
//             {!isFullyComplete && (
//               <div className="px-6 py-4 md:px-8 md:py-6 border-b border-stone-100 flex justify-between items-center bg-[#FAF9F6] shrink-0">
//                 <div className="flex items-center gap-4">
//                   <div className="items-center justify-center hidden w-12 h-12 bg-white border rounded-full sm:flex border-stone-200">
//                     <CalendarCheck className="text-stone-900" size={20} />
//                   </div>
//                   <div>
//                     <h4 className="font-serif text-xl md:text-2xl">Confirm Your Slot</h4>
//                     <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Secure ID: {paymentDetails?.paymentId?.slice(-12)}</p>
//                   </div>
//                 </div>
//                 <div className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-stone-900 text-white rounded-full">Step 2: Scheduling</div>
//               </div>
//             )}

//             <div className="relative flex-grow bg-white">
//               {!isFullyComplete ? (
//                 <iframe
//                   src={`${paymentDetails?.calendlyUrl}?embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1c1c1c&text_color=1c1c1c&name=${encodeURIComponent(paymentDetails?.userName || '')}&email=${encodeURIComponent(paymentDetails?.userEmail || '')}`}
//                   width="100%" height="100%" frameBorder="0" title="Calendly"
//                 ></iframe>
//               ) : (
//                 <div className="absolute inset-0 z-[130] bg-[#FAF9F6] flex items-center justify-center p-6">
//                   <div className="w-full max-w-2xl space-y-10 text-center">
//                     <div className="flex justify-center">
//                       <div className="relative">
//                         <svg className="w-32 h-32 transform -rotate-90">
//                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-stone-200" />
//                           <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * countdown / 8)} className="transition-all duration-1000 ease-linear text-stone-900" />
//                         </svg>
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <PartyPopper size={40} className="text-stone-900 animate-bounce" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <p className="text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Enrollment Complete</p>
//                       <h2 className="font-serif text-5xl tracking-tight md:text-6xl">Thank You, <span className="italic">{paymentDetails?.userName.split(' ')[0]}.</span></h2>
//                       <p className="max-w-md mx-auto leading-relaxed text-stone-500">Your session for <span className="font-semibold text-stone-900">{paymentDetails?.title}</span> has been confirmed.</p>
//                     </div>
//                     <div className="flex flex-col items-center gap-6 pt-10">
//                       <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Returning home in <span className="text-sm font-bold text-stone-900">{countdown}</span>s</p>
//                       <button onClick={() => { setPaymentSuccess(false); setIsFullyComplete(false); }} className="text-[11px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1">Return Now</button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// };

// export default VoiceOfTarotOfferings;

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ArrowRight,
  X,
  Music,
  CheckCircle,
  Calendar,
  ShieldCheck,
  User,
  Mail,
  PartyPopper,
  MapPin,
  Users,
  Clock,
  ChevronRight,
  CreditCard,
} from "lucide-react";

const VoiceOfTarotOfferings = () => {
  const services = [
    {
      id: "tarot_1on1",
      title: "1:1 Tarot Guidance",
      price: 2500,
      icon: <Compass size={32} strokeWidth={1.2} />,
      shortDesc: "Clarity on life decisions and emotional patterns.",
      fullDesc:
        "Focuses on what you need to see, acknowledge, and align with. This session offers intuitive guidance to help you understand your current situation and possible paths forward.",
      bestFor: "Emotional patterns, soul alignment, and life paths.",
      hasOptions: false,
      details: [
        { label: "Duration", value: "60 Minutes" },
        { label: "Mode", value: "Online / Offline" },
        { label: "Location", value: "Khar West" },
      ],
    },
    {
      id: "sound_group",
      title: "Group Sound Healing",
      price: 1500,
      icon: <Users size={32} strokeWidth={1.2} />,
      shortDesc: "Collective frequencies to restore balance.",
      fullDesc:
        "A collective healing session where sound frequencies are used to calm the nervous system, release emotional stress, and restore balance. No prior experience needed.",
      bestFor: "Stress release, nervous system regulation, and community.",
      hasOptions: true,
      options: [
        {
          id: "glu_studios",
          label: "Glu Studios - Sunday 8th Feb",
          location: "Khar West",
          size: "10 people",
        },
        {
          id: "community_studios",
          label: "Community Studios - Sunday 1st Feb",
          location: "Khar West",
          size: "10 people",
        },
      ],
      details: [
        { label: "Duration", value: "60 Minutes" },
        { label: "Location", value: "Khar West" },
        { label: "Group Size", value: "10 Max" },
      ],
    },
    {
      id: "sound_1on1",
      title: "1:1 Personal Sound",
      price: 3100,
      icon: <Music size={32} strokeWidth={1.2} />,
      shortDesc: "Deeply nurturing personal energetic reset.",
      fullDesc:
        "Designed around your emotional state. Using sound instruments and intuitive guidance, the session helps your body shift from stress to safety.",
      bestFor: "Personal energetic shift, deep rest, and trauma release.",
      hasOptions: false,
      details: [
        { label: "Duration", value: "60 Minutes" },
        { label: "Mode", value: "In-person" },
        { label: "Location", value: "Khar West" },
      ],
    },
  ];

  const BACKEND_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : window.location.origin;

  // UI States
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Info, 2: Slots, 3: Payment

  // Data States
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedOption: "",
  });
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [countdown, setCountdown] = useState(8);

  // Auto-redirect logic
  useEffect(() => {
    let timer;
    if (paymentSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      handleClose();
    }
    return () => clearTimeout(timer);
  }, [paymentSuccess, countdown]);

  const handleClose = () => {
    setSelectedEvent(null);
    setBookingStep(1);
    setSelectedSlot(null);
    setPaymentSuccess(false);
    setCountdown(8);
    setFormData({ name: "", email: "", selectedOption: "" });
  };

  const fetchSlots = useCallback(
    async (serviceId, signal) => {
      setFetchingSlots(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/slots/${serviceId}`, {
          signal,
        });
        const data = await res.json();
        setAvailableSlots(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") setAvailableSlots([]);
      } finally {
        setFetchingSlots(false);
      }
    },
    [BACKEND_URL],
  );

  useEffect(() => {
    const controller = new AbortController();
    if (selectedEvent && !selectedEvent.hasOptions && bookingStep === 2) {
      fetchSlots(selectedEvent.id, controller.signal);
    }
    return () => controller.abort();
  }, [selectedEvent, bookingStep, fetchSlots]);

  const handleSlotClick = async (slot) => {
    setIsProcessing(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/lock-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: slot._id }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedSlot(slot);
        setBookingStep(3);
      } else {
        alert("This slot was just taken. Please choose another.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!formData.name || !formData.email)
      return alert("Please fill in your details.");

    setIsProcessing(true);
    try {
      const orderRes = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedEvent.price,
          slotId: selectedSlot ? selectedSlot._id : null,
          isGroup: selectedEvent.hasOptions,
        }),
      });
      const orderData = await orderRes.json();

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: "INR",
        name: "Voice of Tarot",
        description: selectedEvent.title,
        order_id: orderData.id,
        handler: async (res) => {
          const verify = await fetch(`${BACKEND_URL}/api/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...res,
              slotId: selectedSlot?._id,
              userDetails: formData,
              serviceName: selectedEvent.title,
              amount: selectedEvent.price,
              option: formData.selectedOption,
            }),
          });
          const verifyData = await verify.json();
          if (verifyData.success) setPaymentSuccess(true);
        },
        prefill: { name: formData.name, email: formData.email },
        theme: { color: "#111111" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment initialization failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-24 bg-[#FAF9F6] min-h-screen text-stone-900 selection:bg-stone-200 font-sans">
      <div className="px-6 mx-auto max-w-7xl">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center mb-4 space-x-4"
          >
            <div className="h-[1px] w-12 bg-stone-300"></div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-bold">
              Offerings
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl italic md:text-8xl text-stone-950"
          >
            Sacred Spaces
          </motion.h2>
        </header>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {services.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedEvent(item)}
              className="group relative bg-white border border-stone-100 p-12 flex flex-col justify-between min-h-[500px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-16">
                  <div className="p-4 transition-colors rounded-full bg-stone-50 group-hover:bg-stone-950 group-hover:text-white">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-stone-300">
                    /0{index + 1}
                  </span>
                </div>

                <h3 className="mb-4 font-serif text-3xl transition-all group-hover:translate-x-1">
                  {item.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-stone-500 line-clamp-2">
                  {item.shortDesc}
                </p>

                <div className="space-y-4">
                  {item.details.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-stone-400"
                    >
                      <span className="w-1 h-1 rounded-full bg-stone-300" />
                      {d.label}:{" "}
                      <span className="font-medium text-stone-900">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-end justify-between pt-10 mt-10 border-t border-stone-50">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">
                    Exchange
                  </span>
                  <span className="text-2xl italic font-light">
                    ₹{item.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                  Book Now <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Booking Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col md:flex-row overflow-hidden h-[100dvh]"
          >
            {/* Left Column: Context (Sticky) */}
            <div className="hidden md:flex md:w-[400px] lg:w-[450px] bg-stone-950 text-white p- md:p-8 flex-col justify-between overflow-y-auto">
              <div>
                <button
                  onClick={handleClose}
                  className="flex items-center gap-2 mb-16 transition-colors text-stone-500 hover:text-white group"
                >
                  <X size={18} />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold">
                    Cancel Booking
                  </span>
                </button>

                <span className="px-3 py-1 border border-stone-800 rounded-full text-[9px] uppercase tracking-widest text-stone-400 mb-6 inline-block">
                  Selection
                </span>
                <h3 className="mb-6 font-serif text-5xl italic leading-tight">
                  {selectedEvent.title}
                </h3>
                <p className="mb-12 text-sm italic leading-relaxed font-extralight text-stone-400">
                  {selectedEvent.fullDesc}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-stone-900">
                      <MapPin size={16} className="text-stone-400" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-tighter text-stone-500">
                        Location
                      </p>
                      <p className="text-xs">
                        {
                          selectedEvent.details.find(
                            (d) => d.label === "Location",
                          )?.value
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-stone-900">
                      <Clock size={16} className="text-stone-400" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-tighter text-stone-500">
                        Duration
                      </p>
                      <p className="text-xs">
                        {
                          selectedEvent.details.find(
                            (d) => d.label === "Duration",
                          )?.value
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 mt-10 border-t border-stone-900">
                <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                  Total Investment
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-light">
                    ₹{selectedEvent.price}
                  </span>
                  <span className="text-[10px] text-stone-600">
                    Incl. of all taxes
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Steps */}
            <div className="flex-1 bg-[#FAF9F6] p-8 md:p-20 overflow-y-auto">
              {!paymentSuccess ? (
                <div className="max-w-xl mx-auto">
                  {/* Progress Indicator */}
                  <div className="flex items-center gap-4 mb-20">
                    {[1, 2, 3].map((step) => (
                      <React.Fragment key={step}>
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] transition-all duration-500 ${bookingStep >= step ? "bg-stone-950 border-stone-950 text-white" : "border-stone-200 text-stone-400"}`}
                        >
                          {bookingStep > step ? (
                            <CheckCircle size={14} />
                          ) : (
                            step
                          )}
                        </div>
                        {step < 3 && (
                          <div
                            className={`flex-1 h-[1px] ${bookingStep > step ? "bg-stone-950" : "bg-stone-200"}`}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Step 1: User Info */}
                  {bookingStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <h4 className="mb-2 font-serif text-3xl italic">
                        Your Information
                      </h4>
                      <p className="mb-12 text-xs tracking-widest uppercase text-stone-400">
                        Where should we send your confirmation?
                      </p>
                      <div className="space-y-12">
                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-widest text-stone-500 mb-2 block font-bold">
                            Full Name
                          </label>
                          <input
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full py-4 text-xl font-light transition-colors bg-transparent border-b outline-none border-stone-200 focus:border-stone-950"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="relative">
                          <label className="text-[9px] uppercase tracking-widest text-stone-500 mb-2 block font-bold">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full py-4 text-xl font-light transition-colors bg-transparent border-b outline-none border-stone-200 focus:border-stone-950"
                            placeholder="hello@sanctuary.com"
                          />
                        </div>
                        <button
                          disabled={!formData.name || !formData.email}
                          onClick={() => setBookingStep(2)}
                          className="flex items-center justify-center w-full gap-3 py-6 text-[10px] font-bold uppercase tracking-[0.4em] bg-stone-950 text-white hover:bg-stone-800 disabled:bg-stone-200 transition-all"
                        >
                          Continue to Schedule <ChevronRight size={14} />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Slot Selection */}
                  {bookingStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="font-serif text-3xl italic">
                          Select Session
                        </h4>
                        <button
                          onClick={() => setBookingStep(1)}
                          className="text-[9px] uppercase tracking-widest border-b border-stone-400"
                        >
                          Back
                        </button>
                      </div>

                      {selectedEvent.hasOptions ? (
                        <div className="grid gap-4">
                          {selectedEvent.options.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  selectedOption: opt.label,
                                });
                                setBookingStep(3);
                              }}
                              className="flex items-center justify-between p-8 text-left transition-all bg-white border rounded-sm border-stone-100 hover:border-stone-950 group"
                            >
                              <div>
                                <p className="mb-1 text-xs font-bold tracking-widest uppercase">
                                  {opt.label}
                                </p>
                                <p className="text-[10px] text-stone-400">
                                  {opt.location} • {opt.size}
                                </p>
                              </div>
                              <ChevronRight
                                size={16}
                                className="text-stone-300 group-hover:text-stone-950"
                              />
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {fetchingSlots ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                              <div className="w-6 h-6 border-2 rounded-full border-stone-200 border-t-stone-950 animate-spin" />
                              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                Consulting the alignment...
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              {availableSlots.map((slot) => (
                                <button
                                  key={slot._id}
                                  onClick={() => handleSlotClick(slot)}
                                  className="p-6 text-left transition-all bg-white border rounded-sm hover:border-stone-950 group"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-stone-950">
                                      {new Date(
                                        slot.startTime,
                                      ).toLocaleDateString(undefined, {
                                        weekday: "long",
                                      })}
                                    </span>
                                    <Calendar
                                      size={12}
                                      className="text-stone-200"
                                    />
                                  </div>
                                  <p className="text-lg font-light">
                                    {new Date(
                                      slot.startTime,
                                    ).toLocaleDateString(undefined, {
                                      day: "numeric",
                                      month: "short",
                                    })}
                                  </p>
                                  <p className="text-sm text-stone-400">
                                    {new Date(
                                      slot.startTime,
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </p>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Step 3: Confirmation/Payment */}
                  {bookingStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <h4 className="font-serif text-3xl italic">
                          Finalize Booking
                        </h4>
                        <button
                          onClick={() => setBookingStep(2)}
                          className="text-[9px] uppercase tracking-widest border-b border-stone-400"
                        >
                          Back
                        </button>
                      </div>

                      <div className="p-8 mb-12 space-y-6 bg-white border border-stone-100">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400">
                            Attendee
                          </span>
                          <span className="text-xs font-medium">
                            {formData.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-stone-400">
                            Session
                          </span>
                          <span className="text-xs font-medium">
                            {selectedSlot
                              ? new Date(selectedSlot.startTime).toLocaleString(
                                  [],
                                  { dateStyle: "medium", timeStyle: "short" },
                                )
                              : formData.selectedOption}
                          </span>
                        </div>
                        <div className="h-[1px] bg-stone-50 w-full" />
                        <div className="flex items-center justify-between text-stone-950">
                          <span className="text-[10px] uppercase tracking-widest font-bold">
                            Total
                          </span>
                          <span className="font-serif text-lg">
                            ₹{selectedEvent.price}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-stone-950 text-white py-6 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-stone-800 transition-all disabled:bg-stone-200"
                      >
                        {isProcessing ? (
                          "Connecting to Gateway..."
                        ) : (
                          <>
                            Confirm & Pay <CreditCard size={14} />
                          </>
                        )}
                      </button>
                      <p className="mt-6 text-center text-[9px] uppercase tracking-widest text-stone-400">
                        Secure 256-bit SSL encrypted payment
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="relative mb-12">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="75"
                        stroke="#e7e5e4"
                        strokeWidth="1"
                        fill="transparent"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="75"
                        stroke="#0c0a09"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="471"
                        strokeDashoffset={471 - (471 * countdown) / 8}
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle
                        size={48}
                        strokeWidth={1}
                        className="text-stone-950 animate-pulse"
                      />
                    </div>
                  </div>

                  <h2 className="mb-4 font-serif text-5xl">Confimed.</h2>
                  <p className="max-w-xs mb-12 text-sm font-light leading-relaxed text-stone-500">
                    The space is held for you,{" "}
                    <strong>{formData.name.split(" ")[0]}</strong>. A
                    confirmation and calendar invite have been sent to{" "}
                    {formData.email}.
                  </p>

                  <button
                    onClick={handleClose}
                    className="px-12 py-4 border border-stone-200 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-950 hover:text-white transition-all"
                  >
                    Return to Home ({countdown}s)
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VoiceOfTarotOfferings;
