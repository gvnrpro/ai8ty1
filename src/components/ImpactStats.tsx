
import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  description: string;
  progress: number;
}

const ImpactStats: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    {
      label: 'Operational Efficiency',
      value: 0,
      suffix: '%',
      description: 'Average improvement across deployed systems',
      progress: 0
    },
    {
      label: 'Cost Reduction',
      value: 0,
      suffix: '%',
      description: 'Operational cost savings through intelligent automation',
      progress: 0
    },
    {
      label: 'Processing Speed',
      value: 0,
      suffix: 'x',
      description: 'Faster decision-making and execution cycles',
      progress: 0
    },
    {
      label: 'System Reliability',
      value: 0,
      suffix: '%',
      description: 'Uptime across all managed operations',
      progress: 0
    }
  ]);

  const targetValues = [87, 64, 15.2, 99.97];
  const targetProgress = [87, 64, 76, 99.97]; // Progress bar percentages
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const steps = 75;
    const stepDuration = duration / steps;

    const animateStats = () => {
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 2); // easeOutQuad

        setStats(prev => prev.map((stat, index) => ({
          ...stat,
          value: Number((targetValues[index] * easeProgress).toFixed(index === 2 ? 1 : 2)),
          progress: targetProgress[index] * easeProgress
        })));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="scroll-trigger">
      <div className="text-center mb-20">
        <h3 className="text-5xl font-bold mb-8 stagger-text">
          Measurable <span className="text-[#3FC1C9]">Impact</span>
        </h3>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed stagger-text">
          Every deployment delivers quantifiable operational improvements and strategic value.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="text-center group"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#3FC1C9]/20 hover:border-[#3FC1C9]/40 transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-[#3FC1C9] mb-4 font-mono">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xl font-semibold mb-4">{stat.label}</div>
              <div className="text-sm opacity-70 mb-6 leading-relaxed">
                {stat.description}
              </div>
              
              {/* Animated Progress Ring */}
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3FC1C9"
                    strokeOpacity="0.2"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#3FC1C9"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - stat.progress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    style={{ transitionDelay: `${index * 0.3}s` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#3FC1C9] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactStats;
