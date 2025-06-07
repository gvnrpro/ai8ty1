
import React, { useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollManagerProps {
  onSectionChange: (section: number) => void;
  onScrollProgress: (progress: number) => void;
  children: React.ReactNode;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ 
  onSectionChange, 
  onScrollProgress, 
  children 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    setScrollY(scrollPosition);
    
    // Calculate scroll progress (0-1)
    const progress = scrollPosition / documentHeight;
    onScrollProgress(progress);
    
    // Determine current section based on scroll position
    const section = Math.floor((scrollPosition / documentHeight) * 5);
    const clampedSection = Math.max(0, Math.min(4, section));
    
    if (clampedSection !== currentSection) {
      setCurrentSection(clampedSection);
      onSectionChange(clampedSection);
    }
  }, [currentSection, onSectionChange, onScrollProgress]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Create scroll-triggered animations
    const sections = document.querySelectorAll('.scroll-section');
    
    sections.forEach((section, index) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div style={{ height: '500vh' }}>
      <div className="fixed inset-0">
        {children}
      </div>
      
      {/* Invisible scroll sections for triggering animations */}
      <div className="scroll-section" style={{ height: '100vh' }} />
      <div className="scroll-section" style={{ height: '100vh' }} />
      <div className="scroll-section" style={{ height: '100vh' }} />
      <div className="scroll-section" style={{ height: '100vh' }} />
      <div className="scroll-section" style={{ height: '100vh' }} />
    </div>
  );
};

export default ScrollManager;
