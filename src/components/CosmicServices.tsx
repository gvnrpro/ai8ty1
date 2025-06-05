
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CosmicServicesProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CosmicServices: React.FC<CosmicServicesProps> = ({ isVisible, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'Intelligent Process Automation',
      description: 'Transform workflows into adaptive, self-optimizing systems',
      features: ['Dynamic adaptation', 'Predictive optimization', 'Real-time learning'],
      icon: '⚡'
    },
    {
      title: 'Operational Intelligence',
      description: 'AI systems that evolve with your business demands',
      features: ['Continuous learning', 'Adaptive scaling', 'Autonomous optimization'],
      icon: '🧠'
    },
    {
      title: 'System Integration Architecture',
      description: 'Unified operational intelligence across platforms',
      features: ['API-first design', 'Real-time sync', 'Scalable microservices'],
      icon: '🔗'
    },
    {
      title: 'Performance Analytics Engine',
      description: 'Transform data into actionable intelligence',
      features: ['Real-time monitoring', 'Predictive modeling', 'Automated insights'],
      icon: '📊'
    }
  ];

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    .fromTo(containerRef.current.querySelectorAll('.service-card'),
      { scale: 0.8, opacity: 0, rotationY: 45 },
      { 
        scale: 1, 
        opacity: 1, 
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    )
    .call(() => onComplete(), [], "+=1");

  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="cosmic-services">
      <h3 className="services-title">Our <span className="text-gradient">Core Services</span></h3>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={service.title} className="service-card">
            <div className="service-header">
              <div className="service-icon-large">{service.icon}</div>
              <h4 className="service-title">{service.title}</h4>
            </div>
            
            <p className="service-description">{service.description}</p>
            
            <ul className="service-features">
              {service.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <span className="feature-dot" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <div className="service-glow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CosmicServices;
