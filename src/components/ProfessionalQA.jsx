import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const ProfessionalQA = () => {
  const [activeIndex, setActiveIndex] = useState(0); 

  const faqs = [
    {
      q: "Do I need prior experience with tarot or sound healing?",
      a: "No. These sessions are beginner-friendly and guided gently. Whether it's your first time or you're familiar with these practices, the space is held to meet you exactly where you are."
    },
    {
      q: "Will tarot predict my future?",
      a: "Tarot offers insight and awareness, not fixed predictions. Our focus is on alignment—helping you see the energies currently at play so you can move forward with clarity and intention."
    },
    {
      q: "What should I prepare before a session?",
      a: "To get the most out of your session, please ensure you have a quiet, private space where you won't be interrupted. A stable internet connection for online sessions and an open heart are all you need."
    },
    {
      q: "Are sessions recorded?",
      a: "To maintain a sacred and safe container, sessions are only recorded with your prior explicit consent. Your privacy and comfort are my highest priority."
    }
  ];

  return (
    <section id='ProfessionalQA' className="py-24 bg-[#0F0F0E] text-white overflow-hidden border-t border-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* LEFT SIDE: QUOTE & HEADER */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-amber-600 font-bold mb-6 block">
                  Support & Clarity
                </span>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] mb-12">
                  Common <br /> 
                  <span className="italic text-stone-500">Inquiries.</span>
                </h2>
                
                <div className="relative pl-8 border-l border-stone-800">
                  <p className="mb-4 font-serif text-xl italic font-light leading-relaxed md:text-2xl text-stone-300">
                    "This is not about fixing. This is about listening, awareness, and returning to your own center."
                  </p>
                  <cite className="text-[10px] uppercase tracking-[0.2em] text-stone-600 not-italic">
                    — The Path of Sound & Tarot
                  </cite>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: EXPANDABLE Q&A */}
          <div className="lg:col-span-7">
            <div className="flex flex-col">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b border-stone-800 transition-colors duration-500 ${isOpen ? 'bg-[#161615]' : 'hover:bg-[#121211]'}`}
                  >
                    <button
                      onClick={() => setActiveIndex(isOpen ? null : index)}
                      className="flex items-center justify-between w-full px-6 py-10 text-left group"
                    >
                      <div className="flex items-center gap-6">
                        <span className={`font-mono text-xs transition-colors duration-500 ${isOpen ? 'text-amber-600' : 'text-stone-700'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className={`text-xl md:text-2xl font-serif tracking-tight transition-all duration-500 ${isOpen ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'}`}>
                          {faq.q}
                        </h3>
                      </div>
                      
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${isOpen ? 'bg-white border-white' : 'border-stone-800'}`}>
                        {isOpen ? (
                          <Minus size={14} className="text-black" />
                        ) : (
                          <Plus size={14} className="text-stone-500" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-12 md:px-20">
                            <p className="max-w-2xl text-lg italic font-light leading-relaxed text-stone-400">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Minimal Contact Link */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="px-6 mt-12"
            >
              <p className="text-sm text-stone-600">
                Unsure which session is right for you? 
                <a href="#contact" className="ml-2 text-white transition-colors border-b border-amber-800 hover:text-amber-600">
                  Reach out for guidance
                </a>
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfessionalQA;