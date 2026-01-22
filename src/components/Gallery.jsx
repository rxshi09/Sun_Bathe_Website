import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=80&w=800",
      title: "The Sanctuary",
      span: "md:col-span-2 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
      title: "Rituals",
      span: "md:col-span-1 md:row-span-1",
    },
    {
      url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800",
      title: "Mindfulness",
      span: "md:col-span-1 md:row-span-2",
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
      title: "Connection",
      span: "md:col-span-1 md:row-span-1",
    },
  ];

  // Container variant to stagger the children's appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-end pb-8 mb-12 border-b border-stone-200"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-2">
            Atmosphere
          </span>
          <h2 className="font-serif text-4xl text-stone-900 md:text-5xl">
            Inside the Sanctuary
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 0.98 }}
              className={`relative overflow-hidden group bg-stone-200 shadow-sm ${img.span}`}
            >
              {/* Image Overlay/Filter */}
              <div className="absolute inset-0 z-10 transition-colors duration-500 bg-stone-900/10 group-hover:bg-transparent" />
              
              <img
                src={img.url}
                alt={img.title}
                className="absolute inset-0 object-cover w-full h-full transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />

              {/* Title Tag */}
              <div className="absolute z-20 transition-all duration-500 translate-y-4 opacity-0 bottom-6 left-6 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-white uppercase bg-stone-900/60 backdrop-blur-md border border-white/10">
                  {img.title}
                </p>
              </div>
              
              {/* Subtle Inner Shadow for Depth */}
              <div className="absolute inset-0 z-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;