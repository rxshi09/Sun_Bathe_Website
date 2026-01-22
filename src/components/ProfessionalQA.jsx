import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const ProfessionalQA = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default first one open for better UX

  const faqs = [
    {
      q: "The Private Consultation",
      a: "Each session is a strategic dialogue designed to bridge your current reality with your highest potential. We focus on actionable clarity, uncovering energetic blocks, and mapping out a clear path forward for your professional evolution."
    },
    {
      q: "Preparation & Intent",
      a: "Approach the session with an open mind and a specific area of focus. No prior experience with intuitive practices is required. I translate symbolic archetypes into grounded, practical insights that apply immediately."
    },
    {
      q: "Advisory Methodology",
      a: "The focus is on 'Intuitive Empowerment.' While we explore potential outcomes, the goal is to reveal the energies at play so you can make informed choices. You remain the architect of your own future."
    },
    {
      q: "Discretion & Privacy",
      a: "Absolute discretion is the foundation of my practice. Every consultation is held within a secure container. Your details, questions, and shared insights remain strictly confidential at all times."
    }
  ];

  return (
    <section id='ProfessionalQA' className="py-24 bg-[#080808] text-white overflow-hidden border-t border-stone-900">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* LEFT SIDE: QUOTE & HEADER (Sticky on Desktop) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[10px] tracking-[0.4em] uppercase text-amber-600 font-bold mb-6 block">
                  Insight & Process
                </span>
                <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] mb-12">
                  Common <br /> 
                  <span className="italic text-stone-500">Inquiries.</span>
                </h2>
                
                <div className="relative pl-8 border-l border-stone-800">
                  <p className="mb-4 font-serif text-xl italic leading-relaxed md:text-2xl text-stone-300">
                    "True wisdom is not just having the answers, but knowing how to ask the questions that unlock your next level."
                  </p>
                  <cite className="text-[10px] uppercase tracking-[0.2em] text-stone-600 not-italic">
                    — The Philosophy of Sunbathe
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
                    className={`border-b border-stone-800 transition-colors duration-500 ${isOpen ? 'bg-[#111111]' : 'hover:bg-[#0c0c0c]'}`}
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
                            <p className="max-w-2xl text-lg font-light leading-relaxed text-stone-400">
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
                Have a more specific inquiry? 
                <a href="#contact" className="ml-2 text-white transition-colors border-b border-amber-800 hover:text-amber-600">
                  Get in touch directly
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