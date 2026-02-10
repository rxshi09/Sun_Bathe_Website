import React, { useState , useRef , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import VoiceOfTarotAdmin from "./components/VoiceOfTarotAdmin";

// Main Website Component
const MainWebsite = () => {
  return (
    <div className="font-sans bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      <Navbar />
      <Hero />
      <Vision />
      <Mentor />
      <VoiceOfTarotOfferings />
      <Testimonials />
      <Gallery />
      <ProfessionalQA />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website */}
        <Route path="/" element={<MainWebsite />} />
        
        {/* Admin Panel - accessible at /admin */}
        <Route path="/admin" element={<VoiceOfTarotAdmin />} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;