import React from 'react';
import { Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-10 border-t bg-stone-50 text-stone-900 border-stone-200">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 mb-20 md:grid-cols-2 lg:grid-cols-4">
          
          {/* COLUMN 1: BRAND IDENTITY */}
          <div className="space-y-6">
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            >
              <div className="flex items-center justify-center w-8 h-8 transition-transform bg-stone-900 group-hover:scale-105">
                <span className="font-serif text-xl font-bold text-white">V</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wide uppercase text-stone-900">
                VoiceOfTarot
              </span>
            </div>
            <p className="text-sm leading-relaxed text-stone-500">
              Strategic intuitive guidance and clarity for the modern professional. Bridging ancient wisdom with executive decision-making.
            </p>
          </div>

          {/* COLUMN 2: NAVIGATION */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#Mentor" className="transition-colors text-stone-600 hover:text-stone-900">The Mentor</a></li>
              <li><a href="#gallery" className="transition-colors text-stone-600 hover:text-stone-900">Sanctuary</a></li>
              <li><a href="#offerings" className="transition-colors text-stone-600 hover:text-stone-900">Offerings</a></li>
              <li><a href="#ProfessionalQA" className="transition-colors text-stone-600 hover:text-stone-900">Process & FAQ</a></li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-400">Inquiries</span>
                <a href="mailto:hello@voiceoftarot.com" className="font-medium text-stone-600 hover:text-stone-900">hello@voiceoftarot.com</a>
              </li>
              <li className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-400">Social</span>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="transition-colors text-stone-400 hover:text-stone-900"><Instagram size={18} /></a>
                  <a href="#" className="transition-colors text-stone-400 hover:text-stone-900"><Linkedin size={18} /></a>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: OFFICE / FOOTNOTE */}
          <div className="flex flex-col justify-between lg:text-right lg:items-end">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Location</h4>
              <p className="text-sm leading-relaxed text-stone-600">
                Headquartered in Mumbai.<br />
                Available for Global Consultations.
              </p>
            </div>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
            >
              Back to top <ArrowUp size={12} />
            </button>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 border-t border-stone-200 md:flex-row">
          <p className="text-[11px] font-medium text-stone-400 tracking-tight">
            © {currentYear} VoiceOfTarot. All rights reserved. Professional Intuitive Services.
          </p>
          
          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <a href="#" className="transition-colors text-stone-400 hover:text-stone-900">Privacy Policy</a>
            <a href="#" className="transition-colors text-stone-400 hover:text-stone-900">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;