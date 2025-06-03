
import React, { useEffect, useRef, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const AnimatedMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Systems Optimized', value: 0, suffix: '+', color: '#3FC1C9' },
    { label: 'Efficiency Gain', value: 0, suffix: '%', color: '#3FC1C9' },
    { label: 'Processing Speed', value: 0, suffix: 'ms', color: '#3FC1C9' },
    { label: 'Active Deployments', value: 0, suffix: '', color: '#3FC1C9' },
  ]);

  const targetValues = [1247, 98.7, 0.23, 847];
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

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const animateMetrics = () => {
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setMetrics(prev => prev.map((metric, index) => ({
          ...metric,
          value: Number((targetValues[index] * easeProgress).toFixed(index === 2 ? 2 : 0))
        })));

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
    };

    animateMetrics();
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="grid md:grid-cols-4 gap-8">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="bg-[#111111] p-8 rounded-2xl border border-[#3FC1C9]/20 text-center hover:border-[#3FC1C9]/40 transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="text-4xl font-bold text-[#3FC1C9] mb-4 font-mono">
            {metric.value}{metric.suffix}
          </div>
          <div className="text-lg opacity-80">{metric.label}</div>
          <div className="mt-4 h-1 bg-[#0A0A0A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#3FC1C9] rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${(metric.value / targetValues[index]) * 100}%`,
                transitionDelay: `${index * 0.2}s`
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedMetrics;
