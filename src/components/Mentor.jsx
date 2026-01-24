import React from 'react';
import { motion } from 'framer-motion';

const Mentor = () => {
  // Animation variants for the drawing border (kept exactly as your original)
  const borderVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 }
    }
  };

  return (
    <section id="Mentor" className="py-24 overflow-hidden bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Mentor Image (Left) - Height and Border kept exactly as requested */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:col-span-5"
          >
            <div className="aspect-[3/4] bg-stone-100 overflow-hidden relative z-10">
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                src="/Founder_Image.jpeg"
                alt="Sapna Shahri - Intuitive Guide"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Animated Border Decoration (Original logic preserved) */}
            <svg 
              className="absolute w-48 h-48 pointer-events-none -bottom-6 -right-6 -z-0" 
              viewBox="0 0 200 200"
            >
              <motion.path
                d="M 200 100 V 200 H 100" 
                fill="transparent"
                strokeWidth="2"
                stroke="#d6d3d1" 
                variants={borderVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>

            {/* Subtle floating accent border (Original logic preserved) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
              className="absolute w-full h-full border top-10 -left-6 border-stone-100 -z-10"
            />
          </motion.div>

          {/* Mentor Content (Right) */}
          <div className="lg:col-span-7 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <h3 className="mb-2 text-sm font-bold tracking-widest uppercase text-amber-700">
                  Meet Sapna
                </h3>
                <h2 className="mb-6 font-serif text-4xl italic font-light lg:text-5xl text-stone-900">
                  Sapna Shahri
                </h2>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-px bg-stone-300"
                />
              </div>

              <div className="mb-8 space-y-6">
                <p className="text-lg font-light leading-relaxed text-stone-600">
                  Sapna Shahri is an <span className="font-semibold text-stone-900">intuitive tarot guide and certified sound healer</span> with a gentle yet grounded approach to healing.
                </p>

                <p className="text-lg font-light leading-relaxed text-stone-600">
                  Her work focuses on helping people reconnect with themselves — not by fixing them, but by helping them listen.
                </p>

                <div className="pl-6 space-y-2 italic font-light border-l-2 border-amber-700/20 text-stone-500">
                  <p>Through tarot, she brings clarity.</p>
                  <p>Through sound, she brings calm.</p>
                  <p>Through presence, she creates safety.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="block font-serif text-3xl text-stone-900"
                  >
                    18yr+
                  </motion.span>
                  <span className="text-sm tracking-wider uppercase text-stone-500">
                    Experience
                  </span>
                </div>
                <div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="block font-serif text-3xl text-stone-900"
                  >
                    1k+
                  </motion.span>
                  <span className="text-sm tracking-wider uppercase text-stone-500">
                    Clients Worldwide
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentor;