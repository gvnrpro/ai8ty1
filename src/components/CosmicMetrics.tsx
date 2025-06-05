
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CosmicMetricsProps {
  isVisible: boolean;
  onComplete: () => void;
}

interface Metric {
  label: string;
  value: number;
  targetValue: number;
  suffix: string;
  description: string;
}

const CosmicMetrics: React.FC<CosmicMetricsProps> = ({ isVisible, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'Systems Optimized', value: 0, targetValue: 1247, suffix: '+', description: 'Intelligent automations deployed' },
    { label: 'Efficiency Gain', value: 0, targetValue: 98.7, suffix: '%', description: 'Average operational improvement' },
    { label: 'Processing Speed', value: 0, targetValue: 0.23, suffix: 'ms', description: 'Decision execution time' },
    { label: 'Active Deployments', value: 0, targetValue: 847, suffix: '', description: 'Live AI systems running' }
  ]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline();
    
    // Animate container appearance
    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2 }
    );

    // Animate metrics counting up
    const animateMetrics = () => {
      metrics.forEach((metric, index) => {
        gsap.to(metric, {
          value: metric.targetValue,
          duration: 2,
          delay: index * 0.3,
          ease: "power2.out",
          onUpdate: function() {
            setMetrics(prev => prev.map((m, i) => 
              i === index ? { ...m, value: Number(this.targets()[0].value.toFixed(index === 2 ? 2 : 0)) } : m
            ));
          }
        });
      });
    };

    tl.call(animateMetrics, [], "+=0.5")
      .call(() => onComplete(), [], "+=3");

  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="cosmic-metrics">
      <h3 className="metrics-title">Measurable <span className="text-gradient">Impact</span></h3>
      
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="metric-card" style={{ animationDelay: `${index * 0.2}s` }}>
            <div className="metric-value">
              {metric.value}{metric.suffix}
            </div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-description">{metric.description}</div>
            
            {/* Animated progress ring */}
            <div className="metric-ring">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${(metric.value / metric.targetValue) * 100}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CosmicMetrics;
