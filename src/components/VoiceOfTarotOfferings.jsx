import React, { useState, useEffect } from 'react';
import { 
  Compass, Sparkles, Waves, ArrowRight, X, User, 
  Mail, CheckCircle, CalendarCheck, ShieldCheck, Clock, PartyPopper 
} from 'lucide-react';

const VoiceOfTarotOfferings = () => {
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false); // New: For the final thank you screen
  const [countdown, setCountdown] = useState(8); // Timer for return
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [bookedServices, setBookedServices] = useState([]);

  const BACKEND_URL = "";

  // --- DATA CONFIGURATION ---
  const events = [
    { 
      id: "service_tarot", 
      title: "Intuitive Guidance", 
      price: 2100, 
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
      icon: <Compass size={24} strokeWidth={1.5} />, 
      desc: "An intimate exploration of your soul's current transit and hidden opportunities.",
      details: ["45 Minute Session", "Digital Summary", "1-on-1 Private Call"]
    },
    { 
      id: "service_coaching", 
      title: "Spiritual Coaching", 
      price: 5000, 
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
      icon: <Sparkles size={24} strokeWidth={1.5} />, 
      desc: "Deep mentorship focused on manifesting your highest potential and clearing trauma.",
      details: ["90 Minute Deep Dive", "Actionable Blueprint", "Recorded Session"]
    },
    { 
      id: "service_healing", 
      title: "Sound Healing", 
      price: 3500, 
      calendlyUrl: "https://calendly.com/rushikesh-khedekar22-spit/30min",
      icon: <Waves size={24} strokeWidth={1.5} />, 
      desc: "Vibrational therapy designed to align your chakras and restore energetic peace.",
      details: ["60 Minute Session", "Distance Frequency", "Aura Cleansing"]
    },
  ];

  // --- SCRIPTS & PERSISTENCE ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    const saved = localStorage.getItem('booked_tarot_sessions');
    if (saved) setBookedServices(JSON.parse(saved));

    const pending = localStorage.getItem('pending_tarot_booking');
    if (pending) {
      const pendingData = JSON.parse(pending);
      setPaymentDetails(pendingData);
      setFormData({ name: pendingData.userName, email: pendingData.userEmail });
      setPaymentSuccess(true);
    }

    return () => { if(document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  // Countdown Logic for Final Screen
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
    if (paymentSuccess || selectedEvent || isFullyComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [paymentSuccess, selectedEvent, isFullyComplete]);

  // --- CALENDLY SUCCESS HANDLER ---
  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data.event === 'calendly.event_scheduled') {
        const newBookedList = [...bookedServices, paymentDetails.id];
        setBookedServices(newBookedList);
        localStorage.setItem('booked_tarot_sessions', JSON.stringify(newBookedList));
        localStorage.removeItem('pending_tarot_booking');
        
        // Switch from Calendly iframe to "Thank You" Screen
        setIsFullyComplete(true);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [bookedServices, paymentDetails]);

  // --- PAYMENT HANDLER ---
  const handleFinalPayment = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields");
      return;
    }
    if (!window.Razorpay) return alert("Gateway not ready");
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: selectedEvent.price, serviceId: selectedEvent.id }),
      });
      const data = await response.json();

      const options = {
        key: data.key_id,
        amount: data.amount,
        name: "Voice Of Tarot",
        order_id: data.id,
        prefill: { name: formData.name, email: formData.email },
        handler: (res) => {
          const bookingData = {
            paymentId: res.razorpay_payment_id,
            id: selectedEvent.id,
            title: selectedEvent.title,
            price: selectedEvent.price,
            calendlyUrl: selectedEvent.calendlyUrl,
            userName: formData.name,
            userEmail: formData.email,
            timestamp: new Date().toISOString()
          };
          localStorage.setItem('pending_tarot_booking', JSON.stringify(bookingData));
          setPaymentDetails(bookingData);
          setPaymentSuccess(true);
          setSelectedEvent(null);
        },
        theme: { color: "#1c1c1c" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='offerings' className="py-24 bg-[#F9F8F6] min-h-screen text-stone-900 font-sans">
      <div className="max-w-6xl px-6 mx-auto">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-20 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 font-bold">Curated Practices</p>
          <h2 className="text-6xl md:text-7xl font-serif leading-[1.1] tracking-tight"> <span className="italic">Upcoming Events.</span></h2>
          <p className="text-lg font-light text-stone-500">Select a modality to begin your transformation.</p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {events.map((item) => {
            const isBooked = bookedServices.includes(item.id);
            return (
              <div key={item.id} className="group bg-white border border-stone-200 p-10 flex flex-col justify-between transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2">
                <div>
                  <div className="flex items-start justify-between mb-12 transition-colors text-stone-300 group-hover:text-stone-900">
                    {item.icon}
                  </div>
                  <h3 className="mb-4 font-serif text-3xl">{item.title}</h3>
                  <p className="mb-8 text-sm leading-relaxed text-stone-500">{item.desc}</p>
                  <ul className="mb-12 space-y-3">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-stone-400">
                        <div className="w-1 h-1 rounded-full bg-stone-300" /> {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-stone-400">Exchange</span>
                      <span className="text-2xl font-light">₹{item.price}</span>
                    </div>
                    {!isBooked ? (
                      <button onClick={() => setSelectedEvent(item)} className="flex items-center justify-center w-12 h-12 transition-all border rounded-full border-stone-200 hover:bg-stone-900 hover:text-white">
                        <ArrowRight size={20} strokeWidth={1} />
                      </button>
                    ) : (
                      <div className="text-emerald-500"><CheckCircle size={24} /></div>
                    )}
                  </div>
                  
                  {isBooked && (
                    <button 
                      onClick={() => setSelectedEvent(item)} 
                      className="w-full bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-700 py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 border border-stone-200 hover:border-stone-900"
                    >
                      Book Another Session
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- REGISTRATION UI --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[110] bg-white animate-in fade-in slide-in-from-bottom duration-500 flex flex-col md:flex-row h-screen overflow-hidden">
          <div className="w-full md:w-5/12 bg-[#1c1c1c] text-white p-8 md:p-20 flex flex-col overflow-y-auto border-b md:border-b-0 md:border-r border-stone-800 scrollbar-hide">
            <div className="relative z-10 flex flex-col h-full">
              <button onClick={() => setSelectedEvent(null)} className="flex items-center self-start gap-2 mb-12 transition-colors md:mb-20 group text-stone-400 hover:text-white">
                <X size={20} className="transition-transform group-hover:rotate-90" />
                <span className="text-[10px] uppercase tracking-[0.3em]">Back to Offerings</span>
              </button>
              <h3 className="mb-8 font-serif text-4xl leading-tight md:text-6xl lg:text-7xl">
                {selectedEvent.title.split(' ')[0]} <br />
                <span className="italic text-stone-400">{selectedEvent.title.split(' ').slice(1).join(' ')}</span>
              </h3>
              <div className="max-w-sm mb-12 space-y-6">
                <p className="text-base font-light leading-relaxed md:text-lg text-stone-300">{selectedEvent.desc}</p>
                <div className="pt-8 border-t border-stone-800">
                  <ul className="space-y-5">
                    {selectedEvent.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-4 text-sm font-light text-stone-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />{detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-8 mt-auto border-t border-stone-800/50">
                <span className="text-4xl font-light md:text-5xl">₹{selectedEvent.price}</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-7/12 bg-[#F9F8F6] p-8 md:p-20 overflow-y-auto flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="mb-12 text-center md:text-left">
                <h4 className="mb-4 font-serif text-3xl md:text-4xl">Register Details</h4>
              </div>
              <div className="space-y-12">
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 absolute -top-6 left-0 font-bold">Full Name</label>
                  <div className="flex items-center py-4 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
                    <User size={18} className="mr-4 text-stone-300" />
                    <input required placeholder="Jane Doe" value={formData.name} className="w-full text-xl font-light bg-transparent focus:outline-none" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-stone-400 absolute -top-6 left-0 font-bold">Email Address</label>
                  <div className="flex items-center py-4 transition-all border-b border-stone-200 group-focus-within:border-stone-900">
                    <Mail size={18} className="mr-4 text-stone-300" />
                    <input required type="email" placeholder="jane@example.com" value={formData.email} className="w-full text-xl font-light bg-transparent focus:outline-none" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <button onClick={handleFinalPayment} disabled={loading} className="relative w-full px-8 py-8 overflow-hidden text-white transition-all group bg-stone-900 hover:bg-black disabled:bg-stone-300">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-bold text-[12px] tracking-[0.4em] uppercase">{loading ? "Initializing..." : "Proceed to Payment"}</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                  </div>
                  <div className="absolute inset-0 bg-stone-800 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- POST-PAYMENT & CALENDLY OVERLAY --- */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-[120] bg-white animate-in slide-in-from-bottom duration-700 flex flex-col h-screen overflow-hidden">
          
          {/* STEP INDICATOR HEADER */}
          {!isFullyComplete && (
            <div className="px-6 py-4 md:px-8 md:py-6 border-b border-stone-100 flex justify-between items-center bg-[#F9F8F6]">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="items-center justify-center hidden w-12 h-12 bg-white border rounded-full sm:flex border-stone-200">
                  <CalendarCheck className="text-stone-900" size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-xl md:text-2xl">Confirm Your Slot</h4>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-stone-400 font-bold">Secure ID: {paymentDetails?.paymentId?.slice(-12)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-stone-900 text-white rounded-full">
                Step 2: Scheduling
              </div>
            </div>
          )}

          <div className="relative flex-grow bg-white">
            {/* 1. THE IFRAME (Hidden when complete) */}
            {!isFullyComplete ? (
              <iframe
                src={`${paymentDetails?.calendlyUrl}?embed_domain=${encodeURIComponent(window.location.hostname)}&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1&primary_color=1c1c1c&text_color=1c1c1c&name=${encodeURIComponent(paymentDetails?.userName || '')}&email=${encodeURIComponent(paymentDetails?.userEmail || '')}`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Calendly"
              ></iframe>
            ) : (
              /* 2. THE PERFECT UX THANK YOU SCREEN */
              <div className="absolute inset-0 z-[130] bg-[#F9F8F6] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-500">
                <div className="w-full max-w-2xl space-y-10 text-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Circular Timer Visual */}
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-stone-200" />
                        <circle 
                          cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" 
                          strokeDasharray="377" 
                          strokeDashoffset={377 - (377 * countdown / 8)}
                          className="transition-all duration-1000 ease-linear text-stone-900" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PartyPopper size={40} className="text-stone-900 animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[11px] uppercase tracking-[0.5em] text-stone-400 font-bold">Enrollment Complete</p>
                    <h2 className="font-serif text-5xl tracking-tight md:text-6xl">Thank You, <span className="italic">{paymentDetails?.userName.split(' ')[0]}.</span></h2>
                    <p className="max-w-md mx-auto leading-relaxed text-stone-500">
                      Your session for <span className="font-semibold text-stone-900">{paymentDetails?.title}</span> has been confirmed. 
                      A calendar invitation has been sent to <span className="underline">{paymentDetails?.userEmail}</span>.
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-6 pt-10">
                    <div className="h-[1px] w-20 bg-stone-200" />
                    <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium">
                      Returning to home screen in <span className="text-sm font-bold text-stone-900">{countdown}</span> seconds
                    </p>
                    <button 
                      onClick={() => { setPaymentSuccess(false); setIsFullyComplete(false); }}
                      className="text-[11px] font-bold uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-400 hover:border-stone-400 transition-colors"
                    >
                      Return Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VoiceOfTarotOfferings;