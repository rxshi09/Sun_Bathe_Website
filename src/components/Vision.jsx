import React from 'react';
import { Compass, Wind, Sparkles } from 'lucide-react';

const WhatIsSoundOfTarot = () => {
  const pillars = [
    {
      title: "Awareness",
      desc: "This is not about fixed predictions. It is about understanding your current situation and emotional patterns with clarity.",
      icon: <Compass className="w-6 h-6 text-stone-800" strokeWidth={1.2} />,
    },
    {
      title: "Alignment",
      desc: "Reconnect with your true self. Our sessions help you move from a state of noise to a state of inner emotional alignment.",
      icon: <Sparkles className="w-6 h-6 text-stone-800" strokeWidth={1.2} />,
    },
    {
      title: "Healing",
      desc: "Through sound frequencies, we help the nervous system slow down, allowing for deep release and restoration.",
      icon: <Wind className="w-6 h-6 text-stone-800" strokeWidth={1.2} />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#FDFCFB]">
      <div className="px-6 mx-auto max-w-7xl lg:px-12">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-20">
          <span className="block mb-6 text-xs font-bold tracking-[0.3em] uppercase text-amber-700/70">
            About the Space
          </span>
          <h2 className="mb-8 font-serif text-4xl italic font-light md:text-5xl text-stone-900">
            What is Sound of Tarot?
          </h2>
          <div className="space-y-6 text-lg font-light leading-relaxed md:text-xl text-stone-600">
            <p>
              Sound of Tarot is a <span className="font-medium text-stone-900">sacred space</span> created by Sapna Shahri where tarot guidance and sound healing come together to support clarity, emotional balance, and inner calm.
            </p>
            <p className="italic">
              Each session is intuitive, personalised, and held with deep presence — helping you slow down, listen inward, and reconnect with yourself.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 text-sm font-semibold tracking-widest uppercase text-stone-400">
               <span>Not Prediction</span>
               <span className="text-amber-700/40">•</span>
               <span className="text-stone-800">Awareness</span>
               <span className="text-amber-700/40">•</span>
               <span className="text-stone-800">Alignment</span>
               <span className="text-amber-700/40">•</span>
               <span className="text-stone-800">Healing</span>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="p-10 transition-all duration-700 border bg-stone-50/50 group border-stone-100 hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-8 transition-all duration-500 border rounded-full border-stone-200 group-hover:bg-amber-50 group-hover:border-amber-200">
                {pillar.icon}
              </div>
              
              <h3 className="mb-4 font-serif text-2xl italic font-light text-stone-900">
                {pillar.title}
              </h3>
              
              <p className="text-sm leading-relaxed tracking-wide text-stone-500">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default WhatIsSoundOfTarot;