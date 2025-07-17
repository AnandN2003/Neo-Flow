import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LandingNavbar from '../components/common/LandingNavbar';
import Footer from '../components/common/Footer';
import SiteReloadAnimation from '../components/common/SiteReloadAnimation';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import SmoothScroll from '../components/common/SmoothScroll';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage = () => {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [activeDemo, setActiveDemo] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [showReloadAnimation, setShowReloadAnimation] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [theme, setTheme] = useState('dark'); // Always dark theme

  // Enhanced scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize dark theme by default
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always set dark theme
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      
      // Show animation on every load (not just first time)
      setShowReloadAnimation(true);
      setIsInitialLoad(true);
    }
  }, []);

  const handleReloadAnimationComplete = () => {
    setShowReloadAnimation(false);
    setIsInitialLoad(false);
  };

  const handleReloadSite = () => {
    setShowReloadAnimation(true);
  };

  // Typewriter effect for hero text
  useEffect(() => {
    const text = "Future of Fundraising";
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Buttery smooth scroll setup
    gsap.set("html", {
      scrollBehavior: "auto" // Disable native smooth scroll to let GSAP handle it
    });

    // Create smooth scroll effect for the entire page
    let tl = gsap.timeline();
    
    // Parallax effect for sections
    gsap.utils.toArray('section').forEach((section, index) => {
      gsap.to(section, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // This creates the buttery smooth feel
        }
      });
    });

    // Parallax for background elements
    gsap.utils.toArray('.animate-pulse').forEach((element) => {
      gsap.to(element, {
        y: -100,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, // Slower parallax for floating elements
        }
      });
    });

    // Add momentum to scroll
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".scroll-container", "skewY", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, 
            duration: 0.8, 
            ease: "power3", 
            overwrite: true, 
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Demo carousel effect
  useEffect(() => {
    const demoTimer = setInterval(() => {
      setActiveDemo(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(demoTimer);
  }, []);

  const handleTryNow = () => {
    // Mark user as visited and redirect to main app
    localStorage.setItem('hasVisitedBefore', 'true');
    router.push('/main');
  };

  const handleStartNow = () => {
    // Mark user as visited and redirect to main app
    localStorage.setItem('hasVisitedBefore', 'true');
    router.push('/main');
  };

  const demoFeatures = [
    {
      title: "Campaign Creation",
      description: "Create professional campaigns with rich media, funding goals, and automated milestone tracking",
      preview: "🚀 Launch Campaign → Set Goal: $50,000 → Add Media → Publish",
      stats: { campaigns: "2,847", success: "94%" }
    },
    {
      title: "Smart Contract Integration", 
      description: "Automated fund distribution with escrow protection and transparent blockchain transactions",
      preview: "💰 Smart Escrow → Auto-Release → Milestone Triggers → Instant Payments",
      stats: { secured: "$2.1M", contracts: "1,200+" }
    },
    {
      title: "Real-time Analytics",
      description: "Comprehensive dashboard with funding progress, backer insights, and performance metrics",
      preview: "📊 Live Dashboard → Funding: 67% → Backers: 342 → Timeline: 23 days",
      stats: { tracking: "Real-time", insights: "Advanced" }
    },
    {
      title: "Global Payment System",
      description: "Accept payments worldwide with crypto and traditional methods, instant conversions",
      preview: "🌍 Global Reach → 150+ Countries → Multi-Currency → Instant Settlement",
      stats: { countries: "150+", currencies: "50+" }
    }
  ];

  // Show reload animation if needed
  if (showReloadAnimation) {
    return <SiteReloadAnimation onComplete={handleReloadAnimationComplete} />;
  }

  return (
    <SmoothScroll>
    <div className={`scroll-container min-h-screen relative overflow-x-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]' 
        : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#ffffff]'
    }`}>
      
      {/* Landing Navbar */}
      <LandingNavbar theme={theme} />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full opacity-10 animate-pulse bg-[#4acd8d]" style={{ animationDelay: '0s', animationDuration: '4s' }} />
              <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full opacity-5 animate-pulse bg-[#8c6dfd]" style={{ animationDelay: '2s', animationDuration: '6s' }} />
            </div>

            <div className="relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight text-white">
                <div className="mb-4">
                  <span className="bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent block">Decentralized</span>
                  <span className="bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent block">Fundraising</span>
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd]">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </div>
              </h1>
              
              <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
                The world's most advanced blockchain-powered fundraising platform. 
                Trusted by enterprises, startups, and innovators worldwide to raise capital 
                with complete transparency and security.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <button
                  onClick={handleTryNow}
                  className="group relative px-12 py-5 text-xl font-bold text-white overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8c6dfd] to-[#4acd8d] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-3">
                    Start Free Trial
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                  </span>
                </button>
                
                <button 
                  onClick={handleStartNow}
                  className="px-12 py-5 text-xl font-semibold rounded-2xl border-2 transition-all duration-300 hover:scale-105 border-white/20 text-white hover:bg-white/10"
                >
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="text-sm font-medium text-white">Trusted by 500+ companies</div>
                <div className="w-px h-4 bg-gray-400" />
                <div className="text-sm font-medium text-white">$50M+ raised</div>
                <div className="w-px h-4 bg-gray-400" />
                <div className="text-sm font-medium text-white">150+ countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Experience the Platform
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              See how industry leaders are revolutionizing fundraising with our enterprise-grade platform
            </p>
          </div>

          {/* Demo Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Controls */}
            <div className="space-y-6">
              {demoFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border-2 ${
                    activeDemo === index
                      ? 'bg-gradient-to-r from-[#4acd8d]/10 to-[#8c6dfd]/10 border-[#4acd8d]/50 scale-105'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveDemo(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      activeDemo === index
                        ? 'bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white'
                        : 'bg-white/10 text-white'
                    }`}>
                      {index === 0 ? '🚀' : index === 1 ? '💰' : index === 2 ? '📊' : '🌍'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm mb-3 text-gray-300">
                        {feature.description}
                      </p>
                      <div className="flex space-x-4 text-xs">
                        {Object.entries(feature.stats).map(([key, value]) => (
                          <span key={key} className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Demo Preview */}
            <div className="relative p-8 rounded-3xl bg-white/5 border border-white/20">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#4acd8d]/20 to-[#8c6dfd]/20 flex items-center justify-center relative overflow-hidden">
                {/* Demo Interface Mockup */}
                <div className="absolute inset-4 bg-black/80 rounded-xl p-4 text-green-400 font-mono text-sm">
                  <div className="animate-pulse">
                    <div className="mb-2">$ {demoFeatures[activeDemo].preview}</div>
                    <div className="flex space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
                    <div className="text-xs text-green-400/70">
                      [✓] Transaction validated<br/>
                      [✓] Smart contract deployed<br/>
                      [✓] Funds secured in escrow<br/>
                      <span className="animate-pulse">[~] Processing...</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-[#4acd8d]/30 animate-bounce"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[#8c6dfd]/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Built for scale, security, and success. Everything you need to run professional fundraising campaigns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🔐',
                title: 'Bank-Level Security',
                description: 'Multi-signature wallets, cold storage, and enterprise-grade encryption protect every transaction.',
                highlight: 'SOC 2 Compliant'
              },
              {
                icon: '⚡',
                title: 'Instant Settlements',
                description: 'Lightning-fast payment processing with real-time blockchain confirmations and automatic conversions.',
                highlight: '<3s Processing'
              },
              {
                icon: '📈',
                title: 'Advanced Analytics',
                description: 'Real-time dashboards, conversion tracking, and AI-powered insights to optimize your campaigns.',
                highlight: 'ML-Powered'
              },
              {
                icon: '🌐',
                title: 'Global Compliance',
                description: 'Built-in KYC/AML, tax reporting, and regulatory compliance for 150+ countries worldwide.',
                highlight: '150+ Countries'
              },
              {
                icon: '🤖',
                title: 'Smart Automation',
                description: 'Automated milestone tracking, fund distribution, and campaign management with smart contracts.',
                highlight: 'Zero Manual Work'
              },
              {
                icon: '💎',
                title: 'White Label Solution',
                description: 'Complete customization with your branding, domain, and custom features for enterprise clients.',
                highlight: 'Full Customization'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-3xl transition-all duration-700 hover:scale-105 bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-[#4acd8d]/50"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-base mb-6 leading-relaxed text-gray-300">
                  {feature.description}
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] text-white">
                  {feature.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats and Social Proof */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="p-16 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-gray-300">
                Join thousands of successful campaigns and millions in funding
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {[
                { number: '50,000+', label: 'Active Campaigns', growth: '+23% this month' },
                { number: '$127M+', label: 'Total Raised', growth: '+156% YoY' },
                { number: '2.1M+', label: 'Global Backers', growth: 'Across 150+ countries' },
                { number: '98.7%', label: 'Success Rate', growth: 'Industry leading' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd] bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold mb-1 text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-[#4acd8d] font-medium">
                    {stat.growth}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl font-medium mb-6 text-gray-200">
                "NeoFlow transformed how we approach fundraising. The transparency and efficiency 
                are unmatched in the industry."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd]"></div>
                <div className="text-left">
                  <div className="font-semibold text-white">
                    Nithyan
                  </div>
                  <div className="text-sm text-gray-400">
                    Lead Developer, NeoFlow
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Ready to Launch Your Campaign?
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            Join the future of fundraising. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleTryNow}
              className="group relative px-12 py-5 text-xl font-bold text-white overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4acd8d] to-[#8c6dfd]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8c6dfd] to-[#4acd8d] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Get Started Free</span>
            </button>
            
            <button 
              onClick={handleStartNow}
              className="px-12 py-5 text-xl font-semibold rounded-2xl border-2 transition-all duration-300 hover:scale-105 border-white/20 text-white hover:bg-white/10"
            >
              Start Now
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer theme={theme} />
      
    </div>
    </SmoothScroll>
  );
};

export default LandingPage;
