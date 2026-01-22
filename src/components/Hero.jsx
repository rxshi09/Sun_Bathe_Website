import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative flex items-center min-h-screen pt-20 overflow-hidden bg-stone-50">
      <div className="grid items-center w-full grid-cols-1 gap-12 px-6 mx-auto max-w-7xl lg:px-8 lg:grid-cols-2">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 lg:pr-12"
        >
          <span className="inline-block py-1 px-3 border border-stone-300 text-stone-500 text-[10px] tracking-[0.2em] uppercase mb-6">
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

          <div className="flex flex-wrap items-center gap-6">
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
              <span className="font-medium tracking-tight">Limited to 30 Seats</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full"
        >
          {/* Decorative background element for image depth */}
          <div className="absolute inset-0 translate-x-4 translate-y-4 border border-stone-200 -z-10"></div>
          
          <div className="relative w-full h-full overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-stone-200 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Serene Coastal Environment"
              className="absolute inset-0 object-cover w-full h-full"
              loading="eager"
            />
          </div>

          {/* Floating Quote Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute max-w-xs p-6 border-l-4 shadow-2xl -bottom-6 lg:bottom-8 left-4 lg:left-8 bg-white/95 backdrop-blur-sm border-amber-700"
          >
            <p className="font-serif text-lg italic text-stone-800">
              "Clarity is the ultimate luxury."
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-widest text-stone-400">
              — The Philosophy
            </p>
          </motion.div>
        </motion.div>
        
      </div>

      {/* Background Accent (Optional) */}
      <div className="absolute top-0 right-0 w-1/3 h-screen bg-stone-100/50 -z-20"></div>
    </section>
  );
};

export default Hero;