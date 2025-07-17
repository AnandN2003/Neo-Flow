import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LandingNavbar = ({ theme = 'dark' }) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassy navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const handleGetStarted = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
    router.push('/main');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0f]/70 shadow-lg border-b border-white/20 dark:border-white/10' 
          : 'backdrop-blur-md bg-white/80 dark:bg-[#0d1117]/80 border-b border-gray-300/50 dark:border-gray-700/50'
      }`}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/5" />
      
      <nav className="relative flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#4acd8d] to-[#8c6dfd] flex items-center justify-center transition-all duration-300 ${
            scrolled ? 'scale-95' : 'scale-100'
          }`}>
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className={`text-2xl font-extrabold bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent tracking-wide transition-all duration-300 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}>
            NeoFlow
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-all duration-300 hover:text-[#4acd8d] hover:scale-105 text-gray-300"
            >
              {link.name}
            </a>
          ))}

          {/* CTA Button */}
          <button 
            onClick={handleGetStarted}
            className={`px-6 py-2 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
              scrolled ? 'px-4 py-1.5 text-sm' : 'px-6 py-2 text-base'
            }`}
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-all duration-300 bg-white/10 hover:bg-white/20 text-white"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b transition-all duration-300 bg-[#0a0a0f]/90 border-white/10">
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-lg font-medium transition-colors hover:text-[#4acd8d] text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button 
                onClick={handleGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
