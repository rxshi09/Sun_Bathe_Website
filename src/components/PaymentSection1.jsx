import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, ArrowLeft, Download, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PaymentSection1 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [isBooked, setIsBooked] = useState(false); // New state for receipt phase
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  const SERVICES = {
    tarot: { name: "Tarot Reading", price: 2100, id: "service_tarot" },
    coaching: { name: "Spiritual Coaching", price: 5000, id: "service_coaching" },
    healing: { name: "Sound Healing", price: 3500, id: "service_healing" },
  };

  const [selectedService, setSelectedService] = useState('tarot');
  const BACKEND_URL = "http://localhost:5000";
  const CALENDLY_URL = "https://calendly.com/rushikesh-khedekar22-spit/30min";

  // --- 1. Calendly Event Listener ---
  useEffect(() => {
    const handleCalendlyEvent = (e) => {
      if (e.data.event && e.data.event === 'calendly.event_scheduled') {
        setIsBooked(true); // User finished booking, show receipt option
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  // --- 2. Load Calendly Assets ---
  useEffect(() => {
    if (showCalendly && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [showCalendly]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) { resolve(true); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // --- 3. Receipt Generator Function ---
  const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text("VOICE OF TAROT", 105, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("Official Payment Receipt", 105, 28, { align: "center" });
    
    // Table
    doc.autoTable({
      startY: 40,
      head: [['Description', 'Details']],
      body: [
        ['Service', paymentDetails.serviceName],
        ['Payment ID', paymentDetails.paymentId],
        ['Date', new Date().toLocaleDateString()],
        ['Amount Paid', `INR ${SERVICES[paymentDetails.service].price}`],
        ['Status', 'Confirmed & Booked'],
      ],
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }
    });

    doc.setFontSize(9);
    doc.text("Thank you for your trust. Please bring this receipt to your session.", 20, doc.lastAutoTable.finalY + 10);
    
    doc.save(`Receipt_${paymentDetails.paymentId}.pdf`);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      setError("Payment gateway failed. Check connection.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: SERVICES[selectedService].price,
          serviceId: SERVICES[selectedService].id 
        }),
      });

      const data = await response.json();

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "VoiceOfTarot",
        description: SERVICES[selectedService].name,
        order_id: data.id,
        prefill: { name: "Test User", email: "user@test.com", contact: "9999999999" },
        handler: async (paymentResponse) => {
          const verifyRes = await fetch(`${BACKEND_URL}/api/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentResponse),
          });

          const verification = await verifyRes.json();
          if (verification.success) {
            setPaymentDetails({
              paymentId: paymentResponse.razorpay_payment_id,
              service: selectedService,
              serviceName: SERVICES[selectedService].name
            });
            setShowCalendly(true);
          } else {
            setError("Verification failed.");
          }
          setLoading(false);
        },
        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // --- VIEW: CALENDLY & RECEIPT ---
  if (showCalendly) {
    return (
      <section className="min-h-screen py-24 text-white bg-black">
        <div className="max-w-6xl px-6 mx-auto">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 border border-green-500/50 bg-green-500/10">
                <p className="text-[9px] font-bold tracking-widest uppercase text-green-500 flex items-center gap-2">
                  <CheckCircle size={12} /> Payment Verified
                </p>
              </div>
              <h2 className="font-serif text-5xl italic">
                {isBooked ? "All Set." : "Final Step: Booking."}
              </h2>
              
              <div className="p-8 space-y-4 border border-stone-800 bg-stone-900/30">
                <div className="flex justify-between text-sm"><span className="text-stone-400">Transaction ID</span><span className="font-mono">{paymentDetails?.paymentId}</span></div>
                {isBooked && (
                  <button 
                    onClick={downloadReceipt}
                    className="flex items-center justify-center w-full gap-2 py-4 mt-4 text-xs font-bold tracking-widest text-black uppercase transition-all bg-white hover:bg-stone-200"
                  >
                    <Download size={16} /> Download Official Receipt
                  </button>
                )}
              </div>
              
              {!isBooked && (
                <p className="text-sm leading-relaxed text-stone-400">
                  Please select your slot in the calendar. Once booked, your receipt will be available here for download.
                </p>
              )}
            </div>

            <div className="overflow-hidden bg-white rounded-sm shadow-2xl">
              <div 
                className="calendly-inline-widget" 
                data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=000000&text_color=262626`}
                style={{ minWidth: '320px', height: '650px' }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- VIEW: PAYMENT SELECTION ---
  return (
    <section id="register" className="py-24 text-white bg-black">
      <div className="max-w-6xl px-6 mx-auto lg:px-8">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            <h2 className="font-serif text-6xl italic text-white">The Selection.</h2>
            <div className="space-y-4">
              {Object.keys(SERVICES).map((key) => (
                <div 
                  key={key}
                  onClick={() => setSelectedService(key)}
                  className={`p-6 border transition-all cursor-pointer flex justify-between items-center ${
                    selectedService === key ? 'border-white bg-stone-900' : 'border-stone-800 hover:border-stone-600'
                  }`}
                >
                  <span className="text-sm font-medium tracking-widest uppercase">{SERVICES[key].name}</span>
                  <span className="font-serif text-lg">₹{SERVICES[key].price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative text-black bg-white p-14">
             <h3 className="mb-8 font-serif text-4xl italic">{SERVICES[selectedService].name}</h3>
             <div className="mb-12 font-serif text-3xl">₹{SERVICES[selectedService].price.toLocaleString('en-IN')}</div>
             {error && <div className="p-3 mb-4 text-xs text-red-600 border border-red-100 bg-red-50">{error}</div>}
             <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-black text-white py-6 text-xs font-bold uppercase tracking-[0.4em] hover:bg-stone-900 disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {loading ? "Initializing..." : "Proceed to Pay"}
                {!loading && <ArrowRight size={16} />}
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection1;