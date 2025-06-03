
import React from 'react';

const ReducedMotionFallback: React.FC = () => {
  const storyTexts = [
    "AI systems and digital experiences for tomorrow's leading brands.",
    "Where operational control meets creative intelligence.",
    "Operational AI. Creative Impact.", 
    "Outcome-driven systems engineered to move markets.",
    "We build AI-powered systems built to scale.",
    "Let's Build Together."
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] flex flex-col">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-2xl font-bold text-[#3FC1C9]">AI8TY</div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-4xl text-center space-y-12">
          {storyTexts.map((text, index) => (
            <div
              key={index}
              className="text-xl md:text-3xl font-light leading-relaxed opacity-90"
            >
              {text}
            </div>
          ))}
          
          <div className="pt-8">
            <button className="bg-[#3FC1C9] text-[#0A0A0A] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#3FC1C9]/90 transition-colors duration-300">
              Let's Build Together
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReducedMotionFallback;
