
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface HolographicInterfaceProps {
  isVisible: boolean;
  section: 'info' | 'metrics' | 'services' | 'contact';
  children: React.ReactNode;
}

const HolographicInterface: React.FC<HolographicInterfaceProps> = ({ 
  isVisible, 
  section, 
  children 
}) => {
  const interfaceRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !interfaceRef.current) return;

    const timeline = gsap.timeline();
    
    timeline
      .fromTo(interfaceRef.current,
        { opacity: 0, scale: 0.8, rotateX: -20 },
        { opacity: 1, scale: 1, rotateX: 0, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(hologramRef.current,
        { opacity: 0, scaleY: 0 },
        { opacity: 0.3, scaleY: 1, duration: 1, ease: "power2.out" },
        "-=1"
      );

  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div ref={interfaceRef} className={`holographic-interface holographic-interface--${section}`}>
      <div ref={hologramRef} className="hologram-projection" />
      <div className="interface-frame">
        <div className="frame-corner" />
        <div className="frame-corner" />
        <div className="frame-corner" />
        <div className="frame-corner" />
      </div>
      <div className="interface-content">
        {children}
      </div>
      <div className="scan-lines" />
    </div>
  );
};

export default HolographicInterface;
