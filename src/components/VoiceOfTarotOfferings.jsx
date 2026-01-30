import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Sparkles, Waves, ArrowRight, X, User, 
  Mail, CheckCircle, CalendarCheck, PartyPopper, Users, Music 
} from 'lucide-react';

const VoiceOfTarotOfferings = () => {
  // --- DATA STRUCTURE ---
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
      hasOptions: false,
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
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
      ],
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
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
      hasOptions: false,
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min"
    },
  ];

  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', selectedOption: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false);
  const [countdown, setCountdown] = useState(8);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookedServices, setBookedServices] = useState([]);

  const BACKEND_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : window.location.origin;

  // --- EFFECTS ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const saved = localStorage.getItem('booked_tarot_sessions');
    if (saved) setBookedServices(JSON.parse(saved));

    return () => { if(document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  useEffect(() => {
    let timer;
    if (isFullyComplete && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setPaymentSuccess(false);
      setIsFullyComplete(false);
      setCountdown(8);
    }
    return () => clearInterval(timer);
  }, [isFullyComplete, countdown]);

  useEffect(() => {
    document.body.style.overflow = (paymentSuccess || selectedEvent || isFullyComplete) ? 'hidden' : 'unset';
  }, [paymentSuccess, selectedEvent, isFullyComplete]);

  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data.event === 'calendly.event_scheduled') {
        const newBookedList = [...bookedServices, paymentDetails.id];
        setBookedServices(newBookedList);
        localStorage.setItem('booked_tarot_sessions', JSON.stringify(newBookedList));
        setIsFullyComplete(true);
      }
    };
    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [bookedServices, paymentDetails]);

  // --- HANDLERS ---
  const handleFinalPayment = async () => {
    if (!formData.name || !formData.email) return alert("Please fill in all fields");
    if (selectedEvent.hasOptions && !formData.selectedOption) return alert("Please select a session date/location");
    
    setLoading(true);
    try {
      // Clean price string for numeric processing
      const numericPrice = parseInt(selectedEvent.price.replace(/,/g, ''));
      
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numericPrice, serviceId: selectedEvent.id }),
      });
      const data = await response.json();
      
      const options = {
        key: data.key_id,
        amount: data.amount,
        name: "Voice Of Tarot",
        order_id: data.id,
        prefill: { name: formData.name, email: formData.email },
        handler: (res) => {
          const bData = {
            paymentId: res.razorpay_payment_id,
            id: selectedEvent.id,
            title: selectedEvent.title,
            price: selectedEvent.price,
            calendlyUrl: selectedEvent.calendlyUrl,
            userName: formData.name,
            userEmail: formData.email,
          };
          setPaymentDetails(bData);
          setPaymentSuccess(true);
          setSelectedEvent(null);
        },
        theme: { color: "#1c1c1c" },
      };
      new window.Razorpay(options).open();
    } catch (err) { alert("Error connecting to payment gateway"); } finally { setLoading(false); }
  };

  return (
    <section id='offerings' className="py-16 md:py-24 bg-[#FAF9F6] min-h-screen text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
      <div className="max-w-6xl px-6 mx-auto">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-16 space-y-4 md:mb-24">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Curated Practices</p>
          <h2 className="font-serif text-5xl leading-tight tracking-tight md:text-7xl">
            Upcoming <span className="italic font-light text-stone-500">Events.</span>
          </h2>
          <p className="text-base font-light md:text-lg text-stone-500">Select a modality to begin your transformation.</p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((item, index) => {
            const isBooked = bookedServices.includes(item.id);
            return (
              <motion.div
                key={item.id}
                whileHover="hover"
                className="group relative bg-white p-8 md:p-10 flex flex-col justify-between min-h-[550px] transition-all duration-500 hover:shadow-2xl"
              >
                {/* 4-SIDE TRACE ANIMATION */}
                <motion.span variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0 }} className="absolute top-0 left-0 w-full h-[2px] bg-stone-900 origin-left transition-transform duration-500" />
                <motion.span variants={{ hover: { scaleY: 1 } }} initial={{ scaleY: 0 }} className="absolute top-0 right-0 w-[2px] h-full bg-stone-900 origin-top transition-transform duration-500 delay-75" />
                <motion.span variants={{ hover: { scaleX: 1 } }} initial={{ scaleX: 0 }} className="absolute bottom-0 right-0 w-full h-[2px] bg-stone-900 origin-right transition-transform duration-500 delay-150" />
                <motion.span variants={{ hover: { scaleY: 1 } }} initial={{ scaleY: 0 }} className="absolute bottom-0 left-0 w-[2px] h-full bg-stone-900 origin-bottom transition-transform duration-500 delay-225" />
                <div className="absolute inset-0 border border-stone-200 z-[-1]" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8 transition-colors md:mb-12 text-stone-300 group-hover:text-stone-900">
                    {item.icon}
                    <span className="text-[10px] font-bold tracking-widest">0{index+1}</span>
                  </div>
                  <h3 className="mb-4 font-serif text-2xl md:mb-6 md:text-3xl">{item.title}</h3>
                  <p className="mb-4 text-sm font-light leading-relaxed text-stone-500">{item.shortDesc}</p>
                  
                  <div className="mb-6 space-y-1">
                     <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block">Best For</span>
                     <p className="text-[11px] italic text-stone-600 leading-relaxed">{item.bestFor}</p>
                  </div>

                  <ul className="space-y-2 md:space-y-3">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400">
                        <div className="w-1 h-1 transition-colors rounded-full bg-stone-200 group-hover:bg-stone-900" /> 
                        {d.label}: <span className="ml-1 text-stone-600">{d.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 pt-6 border-t md:pt-8 border-stone-100">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-stone-400 block mb-1">Exchange</span>
                      <span className="text-xl font-light md:text-2xl">₹{item.price}</span>
                    </div>
                    {!isBooked ? (
                      <motion.button 
                        onClick={() => setSelectedEvent(item)}
                        whileHover={{ x: 5, backgroundColor: "#1c1c1c", color: "#fff" }} 
                        className="flex items-center justify-center w-10 h-10 transition-all border rounded-full md:w-12 md:h-12 border-stone-200"
                      >
                        <ArrowRight size={18} strokeWidth={1} />
                      </motion.button>
                    ) : (
                      <div className="text-emerald-500"><CheckCircle size={24} /></div>
                    )}
                  </div>
                  {isBooked && (
                    <button 
                      onClick={() => setSelectedEvent(item)} 
                      className="w-full bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-700 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 border border-stone-200"
                    >
                      Book Another Session
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* REGISTRATION OVERLAY */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[110] bg-white flex flex-col md:flex-row overflow-hidden h-[100dvh]"
          >
            {/* Left/Top Panel */}
            <div className="w-full md:w-5/12 bg-[#1c1c1c] text-white p-8 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800 shrink-0">
              <div className="relative z-10">
                <button onClick={() => setSelectedEvent(null)} className="flex items-center gap-2 mb-8 transition-colors md:mb-20 text-stone-400 hover:text-white group">
                  <X size={16} className="transition-transform group-hover:rotate-90" />
                  <span className="text-[9px] uppercase tracking-[0.2em]">Exit</span>
                </button>
                <h3 className="mb-4 font-serif text-3xl leading-tight md:text-6xl">{selectedEvent.title}</h3>
                <p className="hidden max-w-sm mb-10 text-lg font-light md:block text-stone-400">{selectedEvent.fullDesc}</p>
                <div className="hidden pt-10 border-t md:block border-stone-800">
                  <ul className="space-y-4">
                    {selectedEvent.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm font-light text-stone-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />{d.label}: {d.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t md:block md:pt-10 border-stone-800">
                <span className="text-[10px] uppercase tracking-widest text-stone-500 md:block md:mb-2">Total Exchange</span>
                <span className="text-2xl font-light md:text-5xl">₹{selectedEvent.price}</span>
              </div>
            </div>

            {/* Right Panel: Form */}
            <div className="w-full md:w-7/12 bg-[#FAF9F6] p-8 md:p-20 flex items-start md:items-center justify-center overflow-y-auto">
              <div className="w-full max-w-sm">
                <h4 className="mb-10 font-serif text-2xl italic md:mb-16 md:text-4xl">Enrollment Details</h4>
                <div className="space-y-8 md:space-y-12">
                  <div className="relative group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Full Name</label>
                    <div className="flex items-center py-3 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
                      <User size={16} className="mr-3 text-stone-300" />
                      <input required value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} className="w-full text-lg font-light bg-transparent focus:outline-none" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Email Address</label>
                    <div className="flex items-center py-3 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
                      <Mail size={16} className="mr-3 text-stone-300" />
                      <input required type="email" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} className="w-full text-lg font-light bg-transparent focus:outline-none" placeholder="email@domain.com" />
                    </div>
                  </div>

                  {/* Options Dropdown if hasOptions is true */}
                  {selectedEvent.hasOptions && (
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 absolute -top-6 left-0 font-bold">Select Session</label>
                      <select 
                        required 
                        value={formData.selectedOption} 
                        onChange={(e)=>setFormData({...formData, selectedOption:e.target.value})}
                        className="w-full py-3 text-lg font-light bg-transparent border-b appearance-none border-stone-200 focus:outline-none"
                      >
                        <option value="">Choose a date & location</option>
                        {selectedEvent.options.map(opt => (
                          <option key={opt.id} value={opt.id}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button onClick={handleFinalPayment} disabled={loading} className="relative w-full py-5 overflow-hidden text-white transition-all rounded-sm md:py-8 group bg-stone-900 hover:bg-black disabled:bg-stone-300">
                    <span className="relative z-10 font-bold text-[10px] md:text-[12px] tracking-[0.3em] uppercase">{loading ? "Processing..." : "Secure Payment"}</span>
                    <div className="absolute inset-0 transition-transform duration-300 translate-y-full bg-stone-800 group-hover:translate-y-0" />
                  </button>
                  <p className="text-[8px] text-center uppercase tracking-widest text-stone-400">Encrypted & Secure Transaction</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POST-PAYMENT & CALENDLY */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[120] bg-white flex flex-col h-[100dvh] overflow-hidden">
            {!isFullyComplete && (
              <div className="px-6 py-4 md:px-8 md:py-6 border-b border-stone-100 flex justify-between items-center bg-[#FAF9F6] shrink-0">
                <div className="flex items-center gap-4">
                  <div className="items-center justify-center hidden w-12 h-12 bg-white border rounded-full sm:flex border-stone-200">
                    <CalendarCheck className="text-stone-900" size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl md:text-2xl">Confirm Your Slot</h4>
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Secure ID: {paymentDetails?.paymentId?.slice(-12)}</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-stone-900 text-white rounded-full">Step 2: Scheduling</div>
              </div>
            )}

            <div className="relative flex-grow bg-white">
              {!isFullyComplete ? (
                <iframe
                  src={`${paymentDetails?.calendlyUrl}?embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1c1c1c&text_color=1c1c1c&name=${encodeURIComponent(paymentDetails?.userName || '')}&email=${encodeURIComponent(paymentDetails?.userEmail || '')}`}
                  width="100%" height="100%" frameBorder="0" title="Calendly"
                ></iframe>
              ) : (
                <div className="absolute inset-0 z-[130] bg-[#FAF9F6] flex items-center justify-center p-6">
                  <div className="w-full max-w-2xl space-y-10 text-center">
                    <div className="flex justify-center">
                      <div className="relative">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-stone-200" />
                          <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="377" strokeDashoffset={377 - (377 * countdown / 8)} className="transition-all duration-1000 ease-linear text-stone-900" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PartyPopper size={40} className="text-stone-900 animate-bounce" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Enrollment Complete</p>
                      <h2 className="font-serif text-5xl tracking-tight md:text-6xl">Thank You, <span className="italic">{paymentDetails?.userName.split(' ')[0]}.</span></h2>
                      <p className="max-w-md mx-auto leading-relaxed text-stone-500">Your session for <span className="font-semibold text-stone-900">{paymentDetails?.title}</span> has been confirmed.</p>
                    </div>
                    <div className="flex flex-col items-center gap-6 pt-10">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Returning home in <span className="text-sm font-bold text-stone-900">{countdown}</span>s</p>
                      <button onClick={() => { setPaymentSuccess(false); setIsFullyComplete(false); }} className="text-[11px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1">Return Now</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VoiceOfTarotOfferings;