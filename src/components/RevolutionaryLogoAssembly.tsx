
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import IconSystem from './IconSystem';

interface RevolutionaryLogoAssemblyProps {
  onComplete: () => void;
}

const RevolutionaryLogoAssembly: React.FC<RevolutionaryLogoAssemblyProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const neuralNetRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const [assemblyComplete, setAssemblyComplete] = useState(false);

  useEffect(() => {
    const timeline = gsap.timeline();
    
    // Neural network formation
    timeline
      .fromTo('.neural-node', 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
      )
      .to('.neural-connection', 
        { opacity: 0.8, duration: 1, stagger: 0.05 }
      )
      .to('.neural-node', 
        { 
          x: (i) => [120, -120, 60, -60][i] || 0,
          y: (i) => [-60, -60, 60, 60][i] || 0,
          duration: 2,
          ease: "power2.inOut"
        }
      )
      .fromTo('.logo-letter', 
        { scale: 0, rotation: 360, opacity: 0 },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.15,
          ease: "elastic.out(1, 0.3)"
        }
      )
      .to('.neural-network', 
        { opacity: 0, duration: 1 }
      )
      .call(() => {
        setAssemblyComplete(true);
        setTimeout(onComplete, 2000);
      });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="revolutionary-logo-assembly">
      <div ref={neuralNetRef} className="neural-network">
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-node" />
        <div className="neural-connection" />
        <div className="neural-connection" />
        <div className="neural-connection" />
      </div>
      
      <div ref={lettersRef} className="assembled-logo">
        <span className="logo-letter ai-letter">AI</span>
        <div className="logo-infinity">
          <IconSystem name="infinity" size={48} className="infinity-icon" />
        </div>
        <span className="logo-letter ty-letter">TY</span>
      </div>
      
      {assemblyComplete && (
        <div className="logo-cta">
          <div className="cta-text">Experience Operational Intelligence</div>
          <div className="scroll-indicator">
            <IconSystem name="about" className="scroll-arrow" />
            <span>Scroll to explore</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevolutionaryLogoAssembly;
