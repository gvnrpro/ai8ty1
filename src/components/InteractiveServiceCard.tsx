
import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface InteractiveServiceCardProps {
  icon: string;
  title: string;
  description: string;
  features: string[];
  onClick?: () => void;
  delay?: number;
}

const InteractiveServiceCard: React.FC<InteractiveServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  onClick,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMouseEnter = () => {
    if (cardRef.current && glowRef.current) {
      gsap.to(cardRef.current, {
        y: -10,
        rotateY: -5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(glowRef.current, {
        opacity: 1,
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && glowRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        rotateY: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    onClick?.();
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: isExpanded ? 1 : 1.02,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="ai8ty-card relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        ref={glowRef}
        className="absolute inset-[-1px] bg-gradient-to-r from-transparent via-[var(--ai8ty-primary)] to-transparent rounded-[20px] opacity-0 pointer-events-none z-[-1]"
      />
      
      <div className="service-header flex items-center mb-6">
        <div className="text-4xl mr-4">{icon}</div>
        <h3 className="text-xl font-semibold text-[var(--ai8ty-text-accent)] m-0">
          {title}
        </h3>
      </div>
      
      <p className="text-lg leading-relaxed mb-8 text-[var(--ai8ty-text-secondary)]">
        {description}
      </p>
      
      <div className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-20 opacity-70'
      }`}>
        <ul className="list-none p-0 m-0">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center mb-3 text-base">
              <div className="w-2 h-2 bg-[var(--ai8ty-primary)] rounded-full mr-4 shadow-[0_0_10px_var(--ai8ty-primary)]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6 text-sm text-[var(--ai8ty-primary)] opacity-70">
        {isExpanded ? 'Click to collapse' : 'Click to expand'}
      </div>
    </div>
  );
};

export default InteractiveServiceCard;
