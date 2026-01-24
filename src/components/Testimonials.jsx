import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Heart, Sparkles, ShieldCheck } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      quote: "Sapna has a way of seeing right into the heart of things. Her tarot sessions brought me a sense of peace and direction I didn't know I was missing.",
      author: "Ananya R.",
      role: "Creative Soul",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      quote: "The sound healing was unlike anything I've experienced. I felt my entire nervous system finally breathe. It's a truly sacred space.",
      author: "Vikram S.",
      role: "Long-time Seeker",
      icon: <Heart className="w-4 h-4" />
    },
    {
      quote: "I came for the curiosity, but stayed for the calm. Sapna creates such a safe container to explore your own thoughts and healing.",
      author: "Priya M.",
      role: "Wellness Advocate",
      icon: <ShieldCheck className="w-4 h-4" />
    },
  ];

  return (
    <section className="py-24 bg-[#FCFBF8] overflow-hidden">
      <div className="px-6 mx-auto max-w-7xl lg:px-12">
        
        <div className="grid items-center gap-16 lg:grid-cols-2">
          
          {/* LEFT: ENGAGING IMAGE COMPOSITION */}
          <div className="relative">
            {/* Organic Background Blobs */}
            <div className="absolute w-64 h-64 rounded-full -top-10 -left-10 bg-amber-100/40 blur-3xl" />
            
            {/* Main Image Container with Blob Shape */}
            <motion.div 
              initial={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
              whileInView={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 70%" }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="relative z-10 overflow-hidden border-8 border-white shadow-2xl aspect-square bg-stone-200"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000&auto=format&fit=crop" 
                alt="Healing Session" 
                className="object-cover w-full h-full scale-110"
              />
              <div className="absolute inset-0 bg-amber-900/5 mix-blend-multiply" />
            </motion.div>

            {/* Floating People/Trust Badge */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute z-20 flex items-center gap-4 p-5 bg-white border shadow-2xl bottom-10 -right-4 rounded-2xl border-stone-50"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 overflow-hidden border-2 border-white rounded-full bg-stone-200">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="client" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-500 gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Trusted by 1k+</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: THE CONTENT */}
          <div className="flex flex-col space-y-8">
            <Quote className="w-12 h-12 text-amber-200/60" />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl italic font-light leading-tight md:text-5xl text-stone-900"
            >
              "A journey back to <span className="text-stone-400">myself.</span>"
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-light leading-relaxed text-stone-600"
            >
              Working with Sapna isn't about looking for magic answers. It’s about the quiet, powerful work of listening to your own soul. Her presence is a gift, and the way she integrates sound and tarot creates a deep emotional safety that I’ve never found elsewhere.
            </motion.p>

            <div className="pt-6 border-t border-stone-100">
              <h4 className="text-sm font-bold tracking-widest uppercase text-stone-900">Sarah Jenkins</h4>
              <p className="text-xs tracking-wide uppercase text-stone-400">A Quiet Seeker</p>
            </div>

            <div>
              <button 
                onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })} 
                className="px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all bg-stone-900 text-stone-50 hover:bg-amber-800 hover:shadow-xl active:scale-95"
              >
                Experience the Calm
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM REVIEWS GRID */}
        <div className="grid gap-8 mt-24 md:grid-cols-3">
  {reviews.map((rev, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="flex flex-col justify-between p-10 transition-all bg-white border group border-stone-100 hover:border-amber-200/50 hover:shadow-xl"
    >
      <div>
        <div className="flex items-start justify-between mb-8">
          {/* Circular Person Icon / Avatar */}
          <div className="relative">
            <div className="overflow-hidden transition-colors border-2 rounded-full w-14 h-14 border-stone-50 group-hover:border-amber-100">
              <img 
                src={`https://i.pravatar.cc/150?u=${rev.author}`} 
                alt={rev.author} 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Small icon badge overlay */}
            <div className="absolute p-1 bg-white rounded-full shadow-sm -bottom-1 -right-1 text-amber-600">
               {rev.icon}
            </div>
          </div>
          
          <div className="flex gap-0.5 text-amber-500/40">
            {[...Array(5)].map((_, star) => (
              <Star key={star} size={10} fill="currentColor" />
            ))}
          </div>
        </div>

        <p className="mb-8 font-serif text-lg italic font-light leading-relaxed text-stone-600">
          "{rev.quote}"
        </p>
      </div>

      <div className="flex items-center gap-3 pt-6 border-t border-stone-50">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-stone-900">
            {rev.author}
          </p>
          <p className="text-[10px] tracking-wide text-stone-400 uppercase">
            {rev.role}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Testimonials;