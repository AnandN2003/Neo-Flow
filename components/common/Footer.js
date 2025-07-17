import React from 'react';

const Footer = ({ theme: propTheme }) => {
  const [theme, setTheme] = React.useState(propTheme || 'light');

  // Update internal theme when prop changes
  React.useEffect(() => {
    if (propTheme) {
      setTheme(propTheme);
    }
  }, [propTheme]);

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Demo', href: '#demo' },
      { name: 'API', href: '#api' },
      { name: 'Security', href: '#security' }
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' },
      { name: 'Partners', href: '#partners' },
      { name: 'Blog', href: '#blog' }
    ],
    Resources: [
      { name: 'Documentation', href: '#docs' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'Webinars', href: '#webinars' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' },
      { name: 'Compliance', href: '#compliance' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#twitter' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin' },
    { name: 'GitHub', icon: '⚡', href: '#github' },
    { name: 'Discord', icon: '💬', href: '#discord' },
    { name: 'Telegram', icon: '📱', href: '#telegram' }
  ];

  return (
    <footer className={`relative ${
      theme === 'dark' 
        ? 'bg-gradient-to-t from-[#0a0a0f] to-[#1a1a2e] border-t border-white/10' 
        : 'bg-gradient-to-t from-[#f8fafc] to-[#ffffff] border-t border-gray-200'
    }`}>
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4acd8d] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4acd8d] to-[#8c6dfd] flex items-center justify-center">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent">NeoFlow</span>
            </div>
            
            <p className={`text-lg mb-8 leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The world's most advanced blockchain-powered fundraising platform. 
              Empowering innovation through transparent, secure, and global fundraising.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Stay Updated
              </h4>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#4acd8d]/50 ${
                    theme === 'dark'
                      ? 'bg-white/5 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`text-lg font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`text-base transition-colors hover:text-[#4acd8d] ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 border-t ${
          theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className={`text-base ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2024 NeoFlow. All rights reserved. Built with ❤️ for innovators worldwide.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className={`text-sm font-medium ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Follow us:
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all hover:scale-110 ${
                      theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative bottom elements */}
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-[#4acd8d]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-[#8c6dfd]/5 rounded-full blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;
