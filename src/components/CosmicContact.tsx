
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CosmicContactProps {
  isVisible: boolean;
  onComplete: () => void;
}

const CosmicContact: React.FC<CosmicContactProps> = ({ isVisible, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2 }
    )
    .fromTo(containerRef.current.querySelectorAll('.contact-item'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
      "-=0.6"
    )
    .call(() => onComplete(), [], "+=1");

  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="cosmic-contact">
      <h3 className="contact-title">Ready to <span className="text-gradient">Transform</span>?</h3>
      
      <div className="contact-content">
        <div className="contact-item">
          <div className="contact-icon">🚀</div>
          <h4>Start Your Journey</h4>
          <p>Let's discuss how AI8TY can revolutionize your operations</p>
          <button className="cosmic-button primary">
            Schedule Consultation
          </button>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">📋</div>
          <h4>View Our Work</h4>
          <p>Explore real-world implementations and success stories</p>
          <button className="cosmic-button secondary">
            Case Studies
          </button>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">💡</div>
          <h4>Learn More</h4>
          <p>Deep dive into our technology and methodologies</p>
          <button className="cosmic-button secondary">
            Technical Docs
          </button>
        </div>
      </div>
      
      <div className="contact-footer">
        <p>Experience the future of operational intelligence</p>
        <div className="contact-links">
          <a href="mailto:hello@ai8ty.com" className="contact-link">hello@ai8ty.com</a>
          <a href="tel:+1-555-AI8TY" className="contact-link">+1-555-AI8TY</a>
        </div>
      </div>
    </div>
  );
};

export default CosmicContact;
