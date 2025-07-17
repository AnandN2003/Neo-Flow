import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const LandingNavbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassy navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-xl bg-white/70 dark:bg-[#0a0a0f]/70 shadow-lg border-b border-white/20 dark:border-white/10' 
          : 'backdrop-blur-md bg-white/80 dark:bg-[#0d1117]/80 border-b border-gray-300/50 dark:border-gray-700/50'
      }`}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 dark:from-white/5 dark:via-transparent dark:to-white/5" />
      
      <nav className="relative flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-[#4acd8d] to-[#8c6dfd] flex items-center justify-center transition-all duration-300 ${
            scrolled ? 'scale-95' : 'scale-100'
          }`}>
            {/* Fallback N letter */}
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className={`text-2xl font-extrabold bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent tracking-wide transition-all duration-300 ${
            scrolled ? 'text-xl' : 'text-2xl'
          }`}>
            NeoFlow
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-[#4acd8d] hover:scale-105 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              } ${scrolled ? 'text-xs' : 'text-sm'}`}
            >
              {link.name}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-black/10 hover:bg-black/20 text-black'
            } ${scrolled ? 'p-1.5' : 'p-2'}`}
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className={`transition-all duration-300 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            ) : (
              <Moon className={`transition-all duration-300 ${scrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            )}
          </button>

          {/* CTA Button */}
          <button className={`px-6 py-2 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
            scrolled ? 'px-4 py-1.5 text-sm' : 'px-6 py-2 text-base'
          }`}>
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-black/10 hover:bg-black/20 text-black'
          }`}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#0a0a0f]/90 border-white/10'
            : 'bg-white/90 border-gray-200/50'
        }`}>
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`block text-lg font-medium transition-colors hover:text-[#4acd8d] ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white'
                    : 'bg-black/10 hover:bg-black/20 text-black'
                }`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              <button className="px-6 py-2 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
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
