import React, { useState, useEffect } from 'react';

const SiteReloadAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 0.67;
      });
    }, 35);

    const waveTimer = setInterval(() => {
      setWaveOffset(prev => (prev + 1.2) % 100);
    }, 30);

    return () => {
      clearInterval(timer);
      clearInterval(waveTimer);
    };
  }, [onComplete]);

  const createWavePath = (offset, amp = 12, freq = 0.025) => {
    let path = 'M 0,';
    for (let x = 0; x <= 500; x += 3) {
      const y = Math.round(amp * Math.sin(freq * x + offset * 0.15) * 100) / 100;
      path += `${x},${y} `;
    }
    return path + 'L 500,200 L 0,200 Z';
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700">
      <div className="relative text-center">
        {/*               CrowdFund Pro Main Logo */}
        <div className="relative mb-10">
          <div className={`relative inline-block transition-transform duration-1000 ease-in-out ${
            isComplete ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
          }`}>
            {/* Styled Outline Text */}
            <div 
              className="text-8xl font-bold select-none"
              style={{ 
                WebkitTextStroke: '2px white',
                WebkitTextFillColor: 'black',
                fontFamily: '"Pacifico", cursive',
                textShadow: `
                  0 0 10px rgba(255,255,255,0.3),
                  0 0 20px rgba(255,255,255,0.2)
                `
              }}
            >
              NeoFlow
            </div>

            {/* Liquid Fill Mask */}
            <div className="absolute inset-0 overflow-hidden">
              <svg 
                width="500" 
                height="200" 
                className="absolute"
                style={{ 
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <defs>
                  <linearGradient id="liquidGradientReload" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#e0f7ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#cceeff" stopOpacity="1" />
                  </linearGradient>

                  <mask id="textMaskReload">
                    <rect width="500" height="200" fill="black" />
                    <text 
                      x="250" 
                      y="120" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      className="text-8xl font-bold"
                      style={{ 
                        fontFamily: '"Pacifico", cursive',
                        filter: 'blur(0.5px)'
                      }}
                      fill="white"
                    >
                      NeoFlow
                    </text>
                  </mask>
                </defs>

                <g mask="url(#textMaskReload)">
                  <rect 
                    x="0" 
                    y={`${200 - (progress * 200 / 100)}`}
                    width="500" 
                    height="200" 
                    fill="url(#liquidGradientReload)"
                  />
                  <path
                    d={createWavePath(waveOffset)}
                    fill="url(#liquidGradientReload)"
                    transform={`translate(0, ${200 - (progress * 200 / 100)})`}
                  />
                  <path
                    d={createWavePath(waveOffset + 50, 8, 0.035)}
                    fill="rgba(255,255,255,0.6)"
                    transform={`translate(0, ${200 - (progress * 200 / 100) + 3})`}
                  />
                  <path
                    d={createWavePath(waveOffset + 80, 6, 0.03)}
                    fill="rgba(255,255,255,0.4)"
                    transform={`translate(0, ${200 - (progress * 200 / 100) + 8})`}
                  />

                  {/* Floating Bubbles */}
                  <circle cx={150 + Math.sin(waveOffset * 0.1) * 20} cy={200 - (progress * 200 / 100) - 10} r="2" fill="white" opacity={progress > 20 ? 0.7 : 0} />
                  <circle cx={350 + Math.cos(waveOffset * 0.08) * 15} cy={200 - (progress * 200 / 100) - 5} r="1.5" fill="white" opacity={progress > 40 ? 0.6 : 0} />
                  <circle cx={250 + Math.sin(waveOffset * 0.12) * 25} cy={200 - (progress * 200 / 100) - 8} r="1" fill="white" opacity={progress > 60 ? 0.8 : 0} />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Progress & Loading Text */}
        <div className="mt-6">
          <div className="text-xl font-light text-white tracking-wide mb-1">
            Loading your experience...
          </div>
          <div className="text-lg font-mono text-blue-100">
            {progress.toFixed(0)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteReloadAnimation;
