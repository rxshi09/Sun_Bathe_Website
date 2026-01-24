import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SLIDES = [
  {
    id: "01",
    tag: "Clarity & Guidance",
    title: "Listen to what your",
    accent: "soul is telling you",
    desc: "Personalised tarot guidance and sound healing sessions designed to bring clarity, calm, and emotional alignment.",
    // Aesthetic: Warm, hands holding cards, soft lighting
    image: "https://images.unsplash.com/photo-1571353652572-0145557ba72d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    cta: "Book a Session"
  },
  {
    id: "02",
    tag: "Vibrational Healing",
    title: "Find calm in the",
    accent: "frequency of sound",
    desc: "Experience deep relaxation and release stored stress through guided sound healing frequencies.",
    // Aesthetic: Brass singing bowls, zen, meditation vibe
    image: "https://images.unsplash.com/photo-1623764211727-5a8278662af0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    cta: "Explore Sound Healing"
  },
  {
    id: "03",
    tag: "Inner Awareness",
    title: "This is awareness,",
    accent: "alignment & healing",
    desc: "A sacred space created by Sapna Shahri to help you slow down, listen inward, and reconnect.",
    // Aesthetic: Moody, high-end interior, sunlight, peaceful
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop", 
    cta: "Start Your Journey"
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#FDFCFB] overflow-hidden flex flex-col lg:flex-row">
      
      {/* 1. Content Section */}
      <div className="relative z-20 flex flex-col justify-between w-full p-8 h-[55%] lg:h-full lg:w-5/12 lg:p-16 bg-[#FDFCFB]">
        
        {/* Logo/Brand Mark */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-[1px] bg-stone-900" />
          <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-stone-800">Sound of Tarot</span>
        </div>

        {/* Dynamic Text */}
        <div className="max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-amber-800/80 block mb-6 font-semibold">
                {SLIDES[index].tag}
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl leading-[1.1] text-stone-900 mb-8">
                {SLIDES[index].title} <br />
                <span className="italic font-light text-stone-400">{SLIDES[index].accent}.</span>
              </h1>
              <p className="mb-10 text-sm lg:text-base leading-relaxed text-stone-500 max-w-[90%] font-light">
                {SLIDES[index].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <button className="flex items-center gap-6 group">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-stone-800 border-b border-transparent group-hover:border-stone-800 transition-all duration-300 pb-1">
              {SLIDES[index].cta}
            </span>
            <div className="p-3 transition-all duration-500 border rounded-full border-stone-200 group-hover:bg-stone-900 group-hover:text-white group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </div>
          </button>
        </div>

        {/* Pagination/Counter */}
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
              <button 
                key={i}
                onClick={() => setIndex(i)}
                className={`h-[2px] transition-all duration-500 ${i === index ? 'w-10 bg-stone-900' : 'w-4 bg-stone-200 hover:bg-stone-400'}`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-stone-400 tracking-widest uppercase">
            0{index + 1} — 03
          </span>
        </div>
      </div>

      {/* 2. Visual Section */}
      <div className="relative w-full h-[45%] lg:h-full lg:w-7/12 bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={SLIDES[index].image} 
              alt="Healing session visual" 
              className="object-cover w-full h-full" 
            />
            {/* Soft Shadow for Text Contrast */}
            <div className="absolute inset-0 bg-stone-900/5" />
            
            {/* Gradient blend to bleed image into white background on desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFB] via-transparent to-transparent hidden lg:block" />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Timer Line */}
        <div className="absolute bottom-0 left-0 z-40 w-full h-1 bg-stone-200/20">
           <motion.div 
            key={index}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-amber-700/30"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;