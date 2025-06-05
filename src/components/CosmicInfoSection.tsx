
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CosmicInfoSectionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CosmicInfoSection: React.FC<CosmicInfoSectionProps> = ({ isVisible, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
    .fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }, 
      "-=0.5"
    )
    .fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      "-=0.8"
    )
    .fromTo(cardsRef.current?.children || [],
      { scale: 0.8, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.6"
    )
    .call(() => onComplete(), [], "+=2");

  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="cosmic-info-section">
      <div className="info-content">
        <h2 ref={titleRef} className="cosmic-title">
          Transforming Operations Through
          <span className="text-gradient"> Intelligent Systems</span>
        </h2>
        
        <p ref={descriptionRef} className="cosmic-description">
          AI8TY revolutionizes business operations by deploying adaptive AI systems that learn, 
          evolve, and optimize in real-time. We don't just automate—we transform.
        </p>

        <div ref={cardsRef} className="service-preview-grid">
          <div className="service-preview-card">
            <div className="service-icon">⚡</div>
            <h4>Process Automation</h4>
            <p>Self-optimizing workflows that adapt to changing demands</p>
          </div>
          
          <div className="service-preview-card">
            <div className="service-icon">🧠</div>
            <h4>Operational Intelligence</h4>
            <p>AI systems that learn and evolve with your business</p>
          </div>
          
          <div className="service-preview-card">
            <div className="service-icon">🔗</div>
            <h4>System Integration</h4>
            <p>Unified operational intelligence across platforms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicInfoSection;
