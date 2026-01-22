import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Reusable smooth scroll function
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu if open
      setIsOpen(false);
      
      // Calculate offset for fixed navbar (h-20 = 80px)
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { name: 'Vision', href: 'vision' },
    { name: 'The Mentor', href: 'Mentor' },
    { name: 'Offerings', href: 'offerings' },
    { name: 'Gallery', href: 'gallery' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-stone-50/90 backdrop-blur-md border-stone-200">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="flex items-center justify-center w-8 h-8 bg-stone-900">
              <span className="font-serif text-xl font-bold text-white">V</span>
            </div>
            <span className="font-serif text-xl font-bold tracking-wide uppercase text-stone-900">
              VoiceOfTarot
            </span>
          </div>
        
          {/* Desktop Links */}
          <div className="items-center hidden space-x-8 text-sm font-medium tracking-widest uppercase md:flex text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={(e) => scrollToSection(e, link.href)}
                className="transition-colors hover:text-stone-900"
              >
                {link.name}
              </a>
            ))}
            
            <button
              onClick={(e) => scrollToSection(e, 'offerings')}
              className="px-8 py-3 text-white transition-all duration-300 bg-stone-900 hover:bg-stone-800"
            >
              Reserve Seat
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-900"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute w-full p-6 space-y-4 border-b shadow-xl md:hidden bg-stone-50 border-stone-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block text-lg font-medium transition-colors text-stone-600 hover:text-stone-900"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={(e) => scrollToSection(e, 'offerings')}
            className="w-full px-8 py-4 mt-4 font-bold tracking-widest text-white uppercase transition-all bg-stone-900"
          >
            Reserve Seat
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;