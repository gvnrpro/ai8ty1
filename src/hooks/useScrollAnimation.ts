
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          
          // Add staggered animation to child elements
          const children = element.querySelectorAll('.stagger-text');
          children.forEach((child, index) => {
            const htmlChild = child as HTMLElement;
            htmlChild.style.animationDelay = `${index * 0.1}s`;
            htmlChild.classList.add('animate-fade-in');
          });
          
          element.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all scroll-trigger elements
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');
    scrollTriggers.forEach((trigger) => {
      observer.observe(trigger);
    });

    // CTA button pulse animation
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        // Create pulse effect
        const pulse = document.createElement('div');
        pulse.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(63, 193, 201, 0.3) 0%, transparent 70%);
          border-radius: inherit;
          transform: translate(-50%, -50%) scale(0);
          animation: pulse-expand 0.6s ease-out;
          pointer-events: none;
          z-index: -1;
        `;
        
        // Add keyframes if not already added
        if (!document.querySelector('#pulse-keyframes')) {
          const style = document.createElement('style');
          style.id = 'pulse-keyframes';
          style.textContent = `
            @keyframes pulse-expand {
              to {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0;
              }
            }
          `;
          document.head.appendChild(style);
        }
        
        (button as HTMLElement).style.position = 'relative';
        button.appendChild(pulse);
        
        setTimeout(() => {
          if (button.contains(pulse)) {
            button.removeChild(pulse);
          }
        }, 600);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
