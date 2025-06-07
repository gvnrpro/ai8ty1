
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import IconSystem from './IconSystem';

interface MetricData {
  label: string;
  value: number;
  targetValue: number;
  suffix: string;
  description: string;
  prediction: number;
  trend: 'up' | 'down';
}

interface PredictiveMetricsProps {
  isVisible: boolean;
}

const PredictiveMetrics: React.FC<PredictiveMetricsProps> = ({ isVisible }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<MetricData[]>([
    { 
      label: 'Processing Efficiency', 
      value: 0, 
      targetValue: 97.4, 
      suffix: '%', 
      description: 'Real-time optimization rate',
      prediction: 99.1,
      trend: 'up'
    },
    { 
      label: 'System Uptime', 
      value: 0, 
      targetValue: 99.97, 
      suffix: '%', 
      description: 'Continuous operation reliability',
      prediction: 99.99,
      trend: 'up'
    },
    { 
      label: 'Response Time', 
      value: 0, 
      targetValue: 0.14, 
      suffix: 'ms', 
      description: 'Average decision latency',
      prediction: 0.09,
      trend: 'down'
    },
    { 
      label: 'Active Nodes', 
      value: 0, 
      targetValue: 2847, 
      suffix: '', 
      description: 'Distributed processing units',
      prediction: 3200,
      trend: 'up'
    }
  ]);

  useEffect(() => {
    if (!isVisible) return;

    // Animate metrics counting
    metrics.forEach((metric, index) => {
      gsap.to(metric, {
        value: metric.targetValue,
        duration: 2.5,
        delay: index * 0.3,
        ease: "power2.out",
        onUpdate: function() {
          setMetrics(prev => prev.map((m, i) => 
            i === index ? { 
              ...m, 
              value: Number(this.targets()[0].value.toFixed(index === 2 ? 2 : 0)) 
            } : m
          ));
        }
      });
    });

    // Predictive updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.targetValue + (Math.random() - 0.5) * 0.1,
        prediction: metric.prediction + (Math.random() - 0.5) * 0.05
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="predictive-metrics">
      <div className="metrics-header">
        <h3 className="metrics-title">
          Live <span className="ai8ty-text-gradient">Intelligence</span>
        </h3>
        <div className="metrics-subtitle">Real-time operational performance</div>
      </div>
      
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="metric-hologram">
            <div className="metric-display">
              <div className="metric-value">
                {metric.value.toFixed(index === 2 ? 2 : 0)}{metric.suffix}
              </div>
              <div className="metric-prediction">
                Predicted: {metric.prediction.toFixed(index === 2 ? 2 : 0)}{metric.suffix}
                <IconSystem 
                  name={metric.trend === 'up' ? 'metrics' : 'about'} 
                  size={16} 
                  className={`trend-indicator trend-${metric.trend}`}
                />
              </div>
            </div>
            
            <div className="metric-info">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
            
            <div className="metric-visualization">
              <div className="progress-ring">
                <svg viewBox="0 0 36 36">
                  <path
                    className="ring-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="ring-progress"
                    strokeDasharray={`${(metric.value / metric.targetValue) * 100}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveMetrics;
