// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Compass, Sparkles, Waves, ArrowRight, X, User, 
//   Mail, CheckCircle, CalendarCheck, PartyPopper 
// } from 'lucide-react';

// const VoiceOfTarotOfferings = () => {
//   const [loading, setLoading] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '' });
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [isFullyComplete, setIsFullyComplete] = useState(false);
//   const [countdown, setCountdown] = useState(8);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [bookedServices, setBookedServices] = useState([]);

//   // Fixed the typo: window.location.origin
//   const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;

//   const events = [
//     { 
//       id: "service_tarot", 
//       title: "Intuitive Guidance", 
//       price: 2100, 
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
//       icon: <Compass size={24} strokeWidth={1} />, 
//       desc: "An intimate exploration of your soul's current transit and hidden opportunities.",
//       details: ["45 Minute Session", "Digital Summary", "1-on-1 Private Call"]
//     },
//     { 
//       id: "service_coaching", 
//       title: "Spiritual Coaching", 
//       price: 5000, 
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
//       icon: <Sparkles size={24} strokeWidth={1} />, 
//       desc: "Deep mentorship focused on manifesting your highest potential and clearing trauma.",
//       details: ["90 Minute Deep Dive", "Actionable Blueprint", "Recorded Session"]
//     },
//     { 
//       id: "service_healing", 
//       title: "Sound Healing", 
//       price: 3500, 
//       calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
//       icon: <Waves size={24} strokeWidth={1} />, 
//       desc: "Vibrational therapy designed to align your chakras and restore energetic peace.",
//       details: ["60 Minute Session", "Distance Frequency", "Aura Cleansing"]
//     },
//   ];

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);

//     const saved = localStorage.getItem('booked_tarot_sessions');
//     if (saved) setBookedServices(JSON.parse(saved));

//     const pending = localStorage.getItem('pending_tarot_booking');
//     if (pending) {
//       const pendingData = JSON.parse(pending);
//       setPaymentDetails(pendingData);
//       setFormData({ name: pendingData.userName, email: pendingData.userEmail });
//       setPaymentSuccess(true);
//     }
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
//         localStorage.removeItem('pending_tarot_booking');
//         setIsFullyComplete(true);
//       }
//     };
//     window.addEventListener('message', handleCalendlyEvent);
//     return () => window.removeEventListener('message', handleCalendlyEvent);
//   }, [bookedServices, paymentDetails]);

//   const handleFinalPayment = async () => {
//     if (!formData.name || !formData.email) return alert("Please fill in all fields");
//     setLoading(true);
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
//           localStorage.setItem('pending_tarot_booking', JSON.stringify(bData));
//           setPaymentDetails(bData);
//           setPaymentSuccess(true);
//           setSelectedEvent(null);
//         },
//         theme: { color: "#1c1c1c" },
//       };
//       new window.Razorpay(options).open();
//     } catch (err) { alert("Error: " + err.message); } finally { setLoading(false); }
//   };

//   return (
//     <section id='offerings' className="py-16 md:py-24 bg-[#FAF9F6] min-h-screen text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
//       <div className="max-w-6xl px-6 mx-auto">
        
//         {/* LEFT-ALIGNED HEADER */}
//         <div className="max-w-2xl mb-16 space-y-4 md:mb-24">
//           <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Curated Practices</p>
//           <h2 className="font-serif text-5xl leading-tight tracking-tight md:text-7xl">
//             Upcoming <span className="italic font-light text-stone-500">Events.</span>
//           </h2>
//           <p className="text-base font-light md:text-lg text-stone-500">Select a modality to begin your transformation.</p>
//         </div>

//         {/* CARDS GRID */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
//           {events.map((item, index) => {
//             const isBooked = bookedServices.includes(item.id);
//             return (
//               <motion.div
//                 key={item.id}
//                 whileHover="hover"
//                 className="group relative bg-white p-8 md:p-10 flex flex-col justify-between min-h-[500px] md:min-h-[550px] transition-all duration-500 hover:shadow-2xl"
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
//                   <p className="mb-6 text-sm font-light leading-relaxed md:mb-8 text-stone-500">{item.desc}</p>
//                   <ul className="space-y-2 md:space-y-3">
//                     {item.details.map((d, i) => (
//                       <li key={i} className="flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400">
//                         <div className="w-1 h-1 transition-colors rounded-full bg-stone-200 group-hover:bg-stone-900" /> {d}
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
//                       className="w-full bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-700 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-stone-200 hover:border-stone-900"
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

//       {/* REGISTRATION OVERLAY - Optimized for Mobile & Desktop */}
//       <AnimatePresence>
//         {selectedEvent && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }} 
//             className="fixed inset-0 z-[110] bg-white flex flex-col md:flex-row overflow-hidden h-[100dvh]"
//           >
//             {/* Left/Top Panel: Service Recap */}
//             <div className="w-full md:w-5/12 bg-[#1c1c1c] text-white p-8 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800 shrink-0">
//               <div className="relative z-10">
//                 <button onClick={() => setSelectedEvent(null)} className="flex items-center gap-2 mb-8 transition-colors md:mb-20 text-stone-400 hover:text-white group">
//                   <X size={16} className="transition-transform group-hover:rotate-90" />
//                   <span className="text-[9px] uppercase tracking-[0.2em]">Exit</span>
//                 </button>
//                 <h3 className="mb-4 font-serif text-3xl leading-tight md:text-6xl">{selectedEvent.title}</h3>
//                 <p className="hidden max-w-sm mb-10 text-lg font-light md:block text-stone-400">{selectedEvent.desc}</p>
//                 <div className="hidden pt-10 border-t md:block border-stone-800">
//                   <ul className="space-y-4">
//                     {selectedEvent.details.map((d, i) => (
//                       <li key={i} className="flex items-center gap-4 text-sm font-light text-stone-300">
//                         <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />{d}
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

//             {/* Right/Bottom Panel: Simplified Form */}
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
//                   <button onClick={handleFinalPayment} disabled={loading} className="relative w-full py-5 overflow-hidden text-white transition-all rounded-sm md:py-8 group bg-stone-900 hover:bg-black disabled:bg-stone-300">
//                     <span className="relative z-10 font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase">{loading ? "Wait..." : "Secure Payment"}</span>
//                     <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-stone-800 group-hover:translate-y-0" />
//                   </button>
//                   <p className="text-[8px] text-center uppercase tracking-widest text-stone-400">Encrypted & Secure Transaction</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* POST-PAYMENT & CALENDLY OVERLAY WITH SUCCESS SCREEN */}
//       <AnimatePresence>
//         {paymentSuccess && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             className="fixed inset-0 z-[120] bg-white flex flex-col h-[100dvh] overflow-hidden"
//           >
//             {/* STEP INDICATOR HEADER - Only show when not fully complete */}
//             {!isFullyComplete && (
//               <div className="px-6 py-4 md:px-8 md:py-6 border-b border-stone-100 flex justify-between items-center bg-[#FAF9F6] shrink-0">
//                 <div className="flex items-center gap-4 md:gap-6">
//                   <div className="items-center justify-center hidden w-12 h-12 bg-white border rounded-full sm:flex border-stone-200">
//                     <CalendarCheck className="text-stone-900" size={20} />
//                   </div>
//                   <div>
//                     <h4 className="font-serif text-xl md:text-2xl">Confirm Your Slot</h4>
//                     <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400 font-bold">
//                       Secure ID: {paymentDetails?.paymentId?.slice(-12)}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-stone-900 text-white rounded-full">
//                   Step 2: Scheduling
//                 </div>
//               </div>
//             )}

//             <div className="relative flex-grow bg-white">
//               {/* CALENDLY IFRAME - Hidden when complete */}
//               {!isFullyComplete ? (
//                 <iframe
//                   src={`${paymentDetails?.calendlyUrl}?embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1c1c1c&text_color=1c1c1c&name=${encodeURIComponent(paymentDetails?.userName || '')}&email=${encodeURIComponent(paymentDetails?.userEmail || '')}`}
//                   width="100%"
//                   height="100%"
//                   frameBorder="0"
//                   title="Calendly"
//                 ></iframe>
//               ) : (
//                 /* SUCCESS SCREEN - Shows after Calendly booking */
//                 <div className="absolute inset-0 z-[130] bg-[#FAF9F6] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
//                   <div className="w-full max-w-2xl space-y-10 text-center">
//                     <div className="flex justify-center">
//                       <div className="relative">
//                         {/* Circular Timer Visual */}
//                         <svg className="w-32 h-32 transform -rotate-90">
//                           <circle 
//                             cx="64" cy="64" r="60" 
//                             stroke="currentColor" 
//                             strokeWidth="2" 
//                             fill="transparent" 
//                             className="text-stone-200" 
//                           />
//                           <circle 
//                             cx="64" cy="64" r="60" 
//                             stroke="currentColor" 
//                             strokeWidth="2" 
//                             fill="transparent" 
//                             strokeDasharray="377" 
//                             strokeDashoffset={377 - (377 * countdown / 8)}
//                             className="transition-all duration-1000 ease-linear text-stone-900" 
//                           />
//                         </svg>
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <PartyPopper size={40} className="text-stone-900 animate-bounce" />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <p className="text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">
//                         Enrollment Complete
//                       </p>
//                       <h2 className="font-serif text-5xl tracking-tight md:text-6xl">
//                         Thank You, <span className="italic">{paymentDetails?.userName.split(' ')[0]}.</span>
//                       </h2>
//                       <p className="max-w-md mx-auto leading-relaxed text-stone-500">
//                         Your session for <span className="font-semibold text-stone-900">{paymentDetails?.title}</span> has been confirmed. 
//                         A calendar invitation has been sent to <span className="underline">{paymentDetails?.userEmail}</span>.
//                       </p>
//                     </div>

//                     <div className="flex flex-col items-center gap-6 pt-10">
//                       <div className="h-[1px] w-20 bg-stone-200" />
//                       <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">
//                         Returning to home screen in <span className="text-sm font-bold text-stone-900">{countdown}</span> seconds
//                       </p>
//                       <button 
//                         onClick={() => { setPaymentSuccess(false); setIsFullyComplete(false); setCountdown(8); }}
//                         className="text-[11px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-400 hover:border-stone-400 transition-colors"
//                       >
//                         Return Now
//                       </button>
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Users, Music, ArrowRight, X, 
  CheckCircle, ChevronDown 
} from 'lucide-react';

const VoiceOfTarotOfferings = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', sessionOption: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [countdown, setCountdown] = useState(8);

  const services = [
    { 
      id: "tarot_1on1", 
      title: "1:1 Tarot Guidance", 
      price: "2,500", 
      icon: <Compass size={24} strokeWidth={1} />, 
      shortDesc: "Gain clarity on life situations, emotional patterns, and decisions through intuitive tarot guidance.",
      bestFor: "Confusion, Crossroads, Emotional Reassurance",
      fullDesc: "This session offers intuitive tarot guidance to help you understand your current situation, emotional patterns, and possible paths forward.",
      details: [{ label: "Duration", value: "60 Minutes" }, { label: "Mode", value: "Online / Offline" }, { label: "Location", value: "Khar West" }],
      hasOptions: false
    },
    { 
      id: "sound_group", 
      title: "Group Sound Healing", 
      price: "1,500", 
      icon: <Users size={24} strokeWidth={1} />, 
      shortDesc: "A guided group experience using sound frequencies to relax the nervous system.",
      bestFor: "Stress Relief, Emotional Grounding, Collective Healing",
      fullDesc: "A collective healing session where sound frequencies are used to calm the nervous system and release emotional stress.",
      details: [{ label: "Duration", value: "60 Minutes" }, { label: "Group Size", value: "Max 10" }, { label: "Location", value: "Khar West" }],
      hasOptions: true,
      options: [
        { id: "opt_glu", label: "Glu Studios - Sun 8th Feb" },
        { id: "opt_comm", label: "Community Studios - Sun 1st Feb" }
      ]
    },
    { 
      id: "sound_1on1", 
      title: "1:1 Sound Healing", 
      price: "3,100", 
      icon: <Music size={24} strokeWidth={1} />, 
      shortDesc: "A deeply personalised healing session tailored to your emotional needs.",
      bestFor: "Burnout, Anxiety, Emotional Blocks",
      fullDesc: "A deeply nurturing one-on-one session using sound instruments to help your body shift from stress to safety.",
      details: [{ label: "Duration", value: "60 Minutes" }, { label: "Mode", value: "In-Person Only" }, { label: "Location", value: "Khar West" }],
      hasOptions: false
    },
  ];

  useEffect(() => {
    let timer;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      handleClose();
    }
    return () => clearInterval(timer);
  }, [isSubmitted, countdown]);

  useEffect(() => {
    document.body.style.overflow = (selectedEvent) ? 'hidden' : 'unset';
  }, [selectedEvent]);

  const handleBookClick = (service) => {
    setSelectedEvent(service);
    setFormData({ 
      name: '', email: '', phone: '', 
      sessionOption: service.hasOptions ? service.options[0].label : 'Standard Session' 
    });
    setIsSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // PREPARING DATA FOR YOUR SHEET/EMAIL
    const dataToSend = {
      service_chosen: selectedEvent.title,
      price_quoted: selectedEvent.price,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      preferred_date: formData.sessionOption
    };

    try {
      const response = await fetch("https://formspree.io/f/mbdgppyq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Submission failed. Check your internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedEvent(null);
    setIsSubmitted(false);
    setCountdown(8);
  };

  return (
    <section id='offerings' className="py-24 bg-[#FAF9F6] min-h-screen text-stone-900 font-sans">
      <div className="max-w-6xl px-6 mx-auto">
        
        <div className="max-w-2xl mb-20 space-y-4">
          <p className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold">Offerings</p>
          <h2 className="font-serif text-5xl md:text-7xl">Ways to Work <br/><span className="italic font-light text-stone-500">With Me.</span></h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((item, index) => (
            <div key={item.id} className="group relative bg-white p-8 flex flex-col justify-between min-h-[500px] border border-stone-100 transition-all hover:shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between mb-8 transition-colors text-stone-300 group-hover:text-amber-800">
                  {item.icon}
                  <span className="text-[10px] font-bold">0{index+1}</span>
                </div>
                <h3 className="mb-4 font-serif text-2xl md:text-3xl">{item.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-stone-500">{item.shortDesc}</p>
                <p className="text-[10px] font-bold uppercase text-stone-400 mb-1">Best For:</p>
                <p className="font-serif text-xs italic text-stone-600">{item.bestFor}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between pt-6 mt-8 border-t border-stone-100">
                <div>
                  <span className="text-[9px] uppercase text-stone-400 block">Exchange</span>
                  <span className="text-xl font-light md:text-2xl">₹{item.price}</span>
                </div>
                <button onClick={() => handleBookClick(item)} className="flex items-center justify-center w-12 h-12 transition-all border rounded-full text-stone-400 hover:bg-stone-900 hover:text-white">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-white md:bg-stone-900/40 md:backdrop-blur-sm flex md:items-center md:justify-center overflow-hidden">
            <div className="w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:max-w-5xl bg-white flex flex-col md:flex-row relative overflow-hidden">
              
              {/* Mobile Close */}
              <div className="flex items-center justify-between p-4 bg-white border-b md:hidden shrink-0">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Booking Request</span>
                  <button onClick={handleClose}><X size={20} /></button>
              </div>

              {/* Left Panel */}
              <div className="w-full md:w-5/12 bg-[#161615] text-white p-6 md:p-12 overflow-y-auto">
                <button onClick={handleClose} className="items-center hidden gap-2 mb-8 transition-colors md:flex text-stone-500 hover:text-white">
                  <X size={16} /> <span className="text-[9px] uppercase tracking-widest">Close</span>
                </button>
                <span className="text-amber-600 text-[10px] font-bold uppercase block mb-4">You have selected</span>
                <h3 className="mb-6 font-serif text-3xl md:text-4xl">{selectedEvent.title}</h3>
                <div className="py-6 space-y-4 border-t border-stone-800">
                  {selectedEvent.details.map((d, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="italic text-stone-500">{d.label}</span>
                      <span className="text-stone-300">{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-end justify-between pt-6 mt-8 border-t border-stone-800">
                    <span className="text-xs uppercase text-stone-500">Exchange</span>
                    <span className="text-2xl font-light">₹{selectedEvent.price}</span>
                </div>
              </div>

              {/* Right Panel (Form) */}
              <div className="w-full md:w-7/12 bg-[#FAF9F6] p-6 md:p-12 overflow-y-auto flex-grow h-full">
                {!isSubmitted ? (
                  <div className="flex flex-col justify-center max-w-md min-h-full mx-auto">
                    <h4 className="mb-8 font-serif text-2xl md:text-3xl">Enter your details</h4>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {selectedEvent.hasOptions && (
                        <div className="relative">
                          <label className="text-[10px] font-bold text-stone-500 uppercase block mb-2">Select Date</label>
                          <select required className="w-full p-4 font-serif bg-white border outline-none appearance-none border-stone-200" 
                            value={formData.sessionOption} onChange={(e) => setFormData({...formData, sessionOption: e.target.value})}>
                            {selectedEvent.options.map(opt => <option key={opt.id} value={opt.label}>{opt.label}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-[70%] -translate-y-1/2 text-stone-400" size={16}/>
                        </div>
                      )}
                      <div className="space-y-6">
                        <input required placeholder="Full Name" className="w-full p-4 transition-all bg-white border-b outline-none border-stone-200 focus:border-stone-900" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} />
                        <input required type="email" placeholder="Email Address" className="w-full p-4 transition-all bg-white border-b outline-none border-stone-200 focus:border-stone-900" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} />
                        <input required type="tel" placeholder="WhatsApp Number" className="w-full p-4 transition-all bg-white border-b outline-none border-stone-200 focus:border-stone-900" value={formData.phone} onChange={(e)=>setFormData({...formData, phone:e.target.value})} />
                      </div>
                      <button disabled={isSubmitting} type="submit" className="w-full py-5 text-xs font-bold tracking-widest text-white uppercase transition-all bg-stone-900 hover:bg-amber-900 disabled:bg-stone-400">
                        {isSubmitting ? "Sending..." : "Request Booking"}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-full py-10 text-center">
                    <CheckCircle size={48} className="mb-6 text-green-600" />
                    <h4 className="mb-4 font-serif text-3xl">Request Sent!</h4>
                    <p className="mb-8 text-sm leading-relaxed text-stone-500">
                      We've received your request for <strong>{selectedEvent.title}</strong>. <br/>
                      Sapna will contact you on WhatsApp shortly.
                    </p>
                    <button onClick={handleClose} className="text-[10px] uppercase border px-8 py-3 border-stone-900 hover:bg-stone-900 hover:text-white transition-all">
                      Close ({countdown})
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VoiceOfTarotOfferings;