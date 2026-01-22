import React from 'react';
import { Compass, Sun, Users } from 'lucide-react';

const Vision = () => {
  const pillars = [
    {
      title: "Strategic Intuition",
      desc: "Learn to use Tarot not as fortune-telling, but as a visual map for decision-making and cognitive clarity.",
      icon: <Compass className="w-6 h-6 text-stone-800" strokeWidth={1.5} />,
    },
    {
      title: "Solar Energetics",
      desc: "Techniques to manage your 'inner sun'—the confidence and vital energy required to lead and create.",
      icon: <Sun className="w-6 h-6 text-stone-800" strokeWidth={1.5} />,
    },
    {
      title: "Professional Sangha",
      desc: "Connect with a curated circle of high-achievers who value depth, discretion, and spiritual growth.",
      icon: <Users className="w-6 h-6 text-stone-800" strokeWidth={1.5} />,
    },
  ];

  return (
    <section id="vision" className="py-24 bg-stone-100">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <span className="block mb-4 text-sm font-semibold tracking-widest uppercase text-stone-500">
            The Vision
          </span>
          <h2 className="mb-6 font-serif text-4xl md:text-5xl text-stone-900">
            The Philosophy
          </h2>
          <p className="text-xl leading-relaxed text-stone-600">
            Modern life rewards the hustle, but success requires the pause. 
            <span className="italic"> VoiceOfTarot</span> is a high-frequency environment 
            where we strip away the noise to hear your inner voice.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <div 
              key={i} 
              className="p-10 transition-all duration-500 bg-white border group border-stone-200 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-8 transition-colors bg-stone-50 group-hover:bg-amber-50">
                {pillar.icon}
              </div>
              
              <div className="w-12 h-px mb-6 transition-colors duration-500 bg-stone-300 group-hover:bg-amber-700"></div>
              
              <h3 className="mb-4 font-serif text-2xl text-stone-900">
                {pillar.title}
              </h3>
              
              <p className="leading-relaxed text-stone-500">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Decorative Quote or Footer of Section */}
        
      </div>
    </section>
  );
};

export default Vision;