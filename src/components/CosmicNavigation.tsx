
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface CosmicNavigationProps {
  isVisible: boolean;
  currentSection: number;
  onSectionChange: (section: number) => void;
}

const CosmicNavigation: React.FC<CosmicNavigationProps> = ({ 
  isVisible, 
  currentSection, 
  onSectionChange 
}) => {
  const navRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 0, label: 'Home', icon: '🌌' },
    { id: 1, label: 'About', icon: '⭐' },
    { id: 2, label: 'Metrics', icon: '📊' },
    { id: 3, label: 'Services', icon: '🚀' },
    { id: 4, label: 'Contact', icon: '💫' }
  ];

  useEffect(() => {
    if (!isVisible || !navRef.current) return;

    gsap.fromTo(navRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div ref={navRef} className="cosmic-navigation">
      <div className="nav-container">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionChange(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
            <div className="nav-glow" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CosmicNavigation;
