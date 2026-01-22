import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
            <div className="absolute w-64 h-64 rounded-full -top-10 -left-10 bg-amber-100/50 blur-3xl animate-pulse" />
            <div className="absolute rounded-full -bottom-10 -right-10 w-80 h-80 bg-stone-200/40 blur-3xl" />

            {/* The Main Curvy Video Container */}
            <motion.div 
              initial={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              animate={{ 
                borderRadius: isPlaying 
                  ? "24px" 
                  : "60% 40% 30% 70% / 60% 30% 70% 40%" 
              }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="relative overflow-hidden border shadow-2xl aspect-square md:aspect-video lg:aspect-square border-stone-200 bg-stone-900"
            >
              <video
                ref={videoRef}
                src="https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
                className="object-cover w-full h-full"
                poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000"
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
                      whileTap={{ scale: 0.95 }}
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
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-stone-100 hidden md:block max-w-[200px] z-20"
            >
              <div className="flex text-amber-500 mb-2 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
              </div>
              <p className="text-[10px] uppercase tracking-tighter font-bold text-stone-400">Trusted Guidance</p>
            </motion.div>
          </div>

          {/* RIGHT: THE CONTENT */}
          <div className="flex flex-col space-y-8">
            <Quote className="w-12 h-12 text-amber-200/60" />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl leading-tight md:text-5xl text-stone-900"
            >
              "The clarity I found with Sapna was <span className="italic underline text-stone-500 decoration-amber-200 underline-offset-8">unprecedented</span>."
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg leading-relaxed text-stone-600"
            >
              As a founder, the noise is constant. This wasn't just a reading; it was a clinical realignment of my purpose and strategy. Sapna bridges the gap between the mystical and the professional in a way that just works.
            </motion.p>

            <div className="pt-4 border-t border-stone-100">
              <h4 className="text-sm font-bold tracking-widest uppercase text-stone-900">Vikram Sethi</h4>
              <p className="text-xs tracking-wide text-stone-400">Tech Entrepreneur & Mentor</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all bg-stone-900 text-stone-50 hover:bg-stone-800 hover:shadow-lg active:scale-95"
              >
                Book Your Experience
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM REVIEWS GRID */}
        <div className="grid gap-8 mt-20 -mb-12 md:grid-cols-3">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="flex flex-col justify-between p-10 transition-all border bg-stone-50 border-stone-100"
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

export default Testimonials;