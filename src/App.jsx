import React, { useState , useRef , useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Sparkles, Moon, Waves, ArrowRight, X, Calendar, User, Mail, CheckCircle, Download ,
  Star,
  MapPin,
  Quote,
  Menu,
  Play,
  Compass, 
  ArrowLeft,
  Instagram,
  Linkedin,
  Wind,
  Sun,
  ArrowUpRight,
  MoveRight,
  ArrowDown,
  Globe,
  ShieldCheck,
  Clock,
  Minus,
  Plus
} from "lucide-react";
import VoiceOfTarotOfferings from "./components/VoiceOfTarotOfferings";
import Navbar from "./components/Navbar";
import Vision from "./components/Vision";
import Hero from "./components/Hero";
import Mentor from "./components/Mentor";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import ProfessionalQA from "./components/ProfessionalQA";
import Footer from "./components/Footer";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
// const handleScroll = (e) => {
//     // 1. Prevent the default 'snap' behavior of the <a> tag
//     e.preventDefault();
    
//     // 2. Find the element by ID
//     const target = document.getElementById('offerings');
  
//     if (target) {
//       // 3. Smoothly scroll to it
//       target.scrollIntoView({ 
//         behavior: 'smooth',
//         block: 'start' 
//       });
//     }
//   };
//   return (
//     <nav className="fixed z-50 w-full border-b bg-stone-50/90 backdrop-blur-md border-stone-200">
//       <div className="px-6 mx-auto max-w-7xl lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center justify-center w-8 h-8 rounded-none bg-stone-900">
//               <span className="font-serif text-xl font-bold text-white">V</span>
//             </div>
//             <span className="font-serif text-xl font-bold tracking-wide uppercase text-stone-900">
//               VoiceOfTarot
//             </span>
//           </div>
        
//           {/* Desktop Links */}
//           <div className="items-center hidden space-x-12 text-sm font-medium tracking-widest uppercase md:flex text-stone-600">
//             <a
//               href="#vision"
//               className="transition-colors hover:text-stone-900"
//             >
//               Vision
//             </a>
//             <a
//               href="#Mentor"
//               className="transition-colors hover:text-stone-900"
//             >
//               The Mentor
//             </a>
            
//             <a
//               href="#offerings" 
//             onClick={handleScroll}
//               className="transition-colors hover:text-stone-900"
//             >
//               Offerings
//             </a>
//             <a
//               href="#gallery"
//               onClick={() => setIsOpen(false)}
//               className="block font-medium text-stone-900"
//             >
//               Gallery
//             </a>
            
//             <button
//   onClick={() => {
//     const element = document.getElementById('offerings');
//     if (element) {
//       element.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'start' 
//       });
//     }
//   }}
//   className="px-8 py-3 text-white transition-all duration-300 bg-stone-900 hover:bg-stone-800"
// >
//   Reserve Seat
// </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-stone-900"
//             >
//               {isOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {isOpen && (
//         <div className="p-6 space-y-4 border-b md:hidden bg-stone-50 border-stone-200">
//           <a
//             href="#vision"
//             onClick={() => setIsOpen(false)}
//             className="block font-medium text-stone-900"
//           >
//             Vision
//           </a>
//           <a
//             href="#Mentor"
//             onClick={() => setIsOpen(false)}
//             className="block font-medium text-stone-900"
//           >
//             Mentor
//           </a>
//           <a
//             href="#Offerings"
//             onClick={() => setIsOpen(false)}
//             className="block font-medium text-stone-900"
//           >
//             Offerings
//           </a>
//           <a
//             href="#gallery"
//             onClick={() => setIsOpen(false)}
//             className="block font-medium text-stone-900"
//           >
//             Gallery
//           </a>
          
//           <a
//             href="#register"
//             onClick={() => setIsOpen(false)}
//             className="block font-bold text-stone-900"
//           >
//             Reserve
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };
// const Vision = () => {
//   const pillars = [
//     {
//       title: "Strategic Intuition",
//       desc: "Learn to use Tarot not as fortune-telling, but as a visual map for decision-making and cognitive clarity.",
//     },
//     {
//       title: "Solar Energetics",
//       desc: "Techniques to manage your 'inner sun'—the confidence and vital energy required to lead and create.",
//     },
//     {
//       title: "Professional Sangha",
//       desc: "Connect with a curated circle of high-achievers who value depth, discretion, and spiritual growth.",
//     },
//   ];

//   return (
//     <section id="vision" className="py-24 bg-stone-100">
//       <div className="px-6 mx-auto max-w-7xl lg:px-8">
//         <div className="max-w-3xl mb-16">
//           <h2 className="mb-6 font-serif text-4xl text-stone-900">
//             The Philosophy
//           </h2>
//           <p className="text-xl leading-relaxed text-stone-600">
//             Modern life rewards the hustle, but success requires the pause.
//             Sunbathe is a high-frequency environment where we strip away the
//             noise to hear your inner voice.
//           </p>
//         </div>
//         <div className="grid gap-8 md:grid-cols-3">
//           {pillars.map((pillar, i) => (
//             <div key={i} className="p-8 bg-white border border-stone-200">
//               <div className="w-10 h-px mb-6 bg-amber-700"></div>
//               <h3 className="mb-4 font-serif text-xl text-stone-900">
//                 {pillar.title}
//               </h3>
//               <p className="leading-relaxed text-stone-500">{pillar.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

function App() {
  return (
    <div className="font-sans bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />
      <Hero />
      <Vision />
      <Mentor />

      <VoiceOfTarotOfferings />
      <Testimonials />
      <Gallery />

      {/* <PaymentSection /> */}
      <ProfessionalQA />
      <Footer />
    </div>
  );
}

export default App;
