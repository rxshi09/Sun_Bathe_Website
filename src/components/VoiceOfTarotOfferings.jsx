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
  RefreshCw,
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
      hasOptions: true, // This will now fetch dynamic options from backend
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
  const [groupOptions, setGroupOptions] = useState([]); // Dynamic group sessions
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedOption: "",
  });
  const [fetchingSlots, setFetchingSlots] = useState(false);
  const [fetchingGroups, setFetchingGroups] = useState(false);
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
    setGroupOptions([]);
  };

  // Fetch 1:1 slots
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

  // Fetch group sessions
  const fetchGroupSessions = useCallback(
    async (serviceId, signal) => {
      setFetchingGroups(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/slots/${serviceId}`, {
          signal,
        });
        const data = await res.json();
        
        // Transform slots into group session options
        const options = Array.isArray(data) ? data.map(slot => ({
          id: slot._id,
          slotId: slot._id,
          label: new Date(slot.startTime).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          }),
          date: new Date(slot.startTime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          time: new Date(slot.startTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          location: "Khar West",
          size: "10 people",
          startTime: slot.startTime,
        })) : [];
        
        setGroupOptions(options);
      } catch (err) {
        if (err.name !== "AbortError") setGroupOptions([]);
      } finally {
        setFetchingGroups(false);
      }
    },
    [BACKEND_URL],
  );

  // Fetch appropriate data when modal opens
  useEffect(() => {
    const controller = new AbortController();
    
    if (selectedEvent && bookingStep === 2) {
      if (selectedEvent.hasOptions) {
        // Fetch group sessions
        fetchGroupSessions(selectedEvent.id, controller.signal);
      } else {
        // Fetch 1:1 slots
        fetchSlots(selectedEvent.id, controller.signal);
      }
    }
    
    return () => controller.abort();
  }, [selectedEvent, bookingStep, fetchSlots, fetchGroupSessions]);

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

  const handleGroupSelection = async (option) => {
    setIsProcessing(true);
    try {
      // Lock the group slot
      const res = await fetch(`${BACKEND_URL}/api/lock-slot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: option.slotId }),
      });
      const data = await res.json();
      
      if (data.success) {
        setFormData({
          ...formData,
          selectedOption: option.label + " at " + option.time,
        });
        // Store the slot for payment
        setSelectedSlot({ _id: option.slotId, startTime: option.startTime });
        setBookingStep(3);
      } else {
        alert("This session was just filled. Please choose another.");
        // Refresh the group options
        fetchGroupSessions(selectedEvent.id);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reserve spot. Please try again.");
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
    <section id="offerings" className="py-24 bg-[#FAF9F6] min-h-screen text-stone-900 selection:bg-stone-200 font-sans">
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
            <div className="hidden md:flex md:w-[400px] lg:w-[450px] bg-stone-950 text-white p-8 flex-col justify-between overflow-y-auto">
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
                        <div className="space-y-4">
                          {fetchingGroups ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                              <RefreshCw size={24} className="animate-spin text-stone-400" />
                              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                Loading available sessions...
                              </p>
                            </div>
                          ) : groupOptions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                              <Calendar size={32} className="text-stone-300" />
                              <p className="text-sm text-stone-500">
                                No group sessions available at the moment.
                              </p>
                              <p className="text-xs text-stone-400">
                                Please check back later or contact us.
                              </p>
                            </div>
                          ) : (
                            <div className="grid gap-4">
                              {groupOptions.map((opt) => (
                                <button
                                  key={opt.id}
                                  onClick={() => handleGroupSelection(opt)}
                                  disabled={isProcessing}
                                  className="flex items-center justify-between p-8 text-left transition-all bg-white border rounded-sm border-stone-100 hover:border-stone-950 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <div>
                                    <p className="mb-2 text-sm font-bold tracking-widest uppercase">
                                      {opt.label}
                                    </p>
                                    <div className="flex items-center gap-4 text-[10px] text-stone-400">
                                      <span>{opt.time}</span>
                                      <span>•</span>
                                      <span>{opt.location}</span>
                                      <span>•</span>
                                      <span>{opt.size}</span>
                                    </div>
                                  </div>
                                  {isProcessing ? (
                                    <RefreshCw size={16} className="animate-spin text-stone-400" />
                                  ) : (
                                    <ChevronRight
                                      size={16}
                                      className="text-stone-300 group-hover:text-stone-950"
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {fetchingSlots ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                              <RefreshCw size={24} className="animate-spin text-stone-400" />
                              <p className="text-[10px] uppercase tracking-widest text-stone-400">
                                Consulting the alignment...
                              </p>
                            </div>
                          ) : availableSlots.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                              <Calendar size={32} className="text-stone-300" />
                              <p className="text-sm text-stone-500">
                                No slots available at the moment.
                              </p>
                              <p className="text-xs text-stone-400">
                                Please check back later or contact us.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              {availableSlots.map((slot) => (
                                <button
                                  key={slot._id}
                                  onClick={() => handleSlotClick(slot)}
                                  disabled={isProcessing}
                                  className="p-6 text-left transition-all bg-white border rounded-sm hover:border-stone-950 group disabled:opacity-50 disabled:cursor-not-allowed"
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
                            {selectedSlot && !selectedEvent.hasOptions
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
                          <>
                            <RefreshCw size={14} className="animate-spin" />
                            Connecting to Gateway...
                          </>
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

                  <h2 className="mb-4 font-serif text-5xl">Confirmed.</h2>
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