
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import IconSystem from './IconSystem';

interface FuturisticNavigationProps {
  isVisible: boolean;
  currentSection: number;
  scrollProgress: number;
  onSectionChange: (section: number) => void;
}

const FuturisticNavigation: React.FC<FuturisticNavigationProps> = ({ 
  isVisible, 
  currentSection, 
  scrollProgress,
  onSectionChange 
}) => {
  const navRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 0, label: 'Genesis', icon: 'home' as const },
    { id: 1, label: 'Intelligence', icon: 'about' as const },
    { id: 2, label: 'Metrics', icon: 'metrics' as const },
    { id: 3, label: 'Systems', icon: 'services' as const },
    { id: 4, label: 'Evolution', icon: 'contact' as const }
  ];

  useEffect(() => {
    if (!isVisible || !navRef.current) return;

    gsap.fromTo(navRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.3)" }
    );
  }, [isVisible]);

  const handleNavClick = (sectionId: number) => {
    const targetScroll = (sectionId / 4) * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ 
      top: targetScroll, 
      behavior: 'smooth' 
    });
  };

  if (!isVisible) return null;

  return (
    <div ref={navRef} className="futuristic-navigation">
      <div className="nav-container">
        <div className="progress-rail">
          <div 
            className="progress-indicator" 
            style={{ transform: `translateX(${scrollProgress * 100}%)` }}
          />
        </div>
        
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-node ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => handleNavClick(section.id)}
          >
            <div className="node-core">
              <IconSystem name={section.icon} size={20} />
            </div>
            <div className="node-pulse" />
            <span className="node-label">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FuturisticNavigation;
