
import React, { useEffect, useRef, useState } from 'react';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const ServiceCards: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: 'Intelligent Process Automation',
      description: 'Transform operational workflows into adaptive, self-optimizing systems.',
      features: [
        'Dynamic workflow adaptation',
        'Predictive bottleneck resolution',
        'Real-time performance optimization',
        'Integrated decision intelligence'
      ],
      icon: '⚡'
    },
    {
      title: 'Operational Intelligence',
      description: 'Deploy AI systems that learn, adapt, and evolve with your business demands.',
      features: [
        'Continuous learning algorithms',
        'Adaptive resource allocation',
        'Predictive scaling systems',
        'Autonomous optimization cycles'
      ],
      icon: '🧠'
    },
    {
      title: 'System Integration Architecture',
      description: 'Seamlessly connect disparate systems into unified operational intelligence.',
      features: [
        'API-first integration design',
        'Real-time data synchronization',
        'Cross-platform compatibility',
        'Scalable microservices architecture'
      ],
      icon: '🔗'
    },
    {
      title: 'Performance Analytics Engine',
      description: 'Transform operational data into actionable intelligence and strategic insights.',
      features: [
        'Real-time performance monitoring',
        'Predictive analytics modeling',
        'Custom dashboard creation',
        'Automated reporting systems'
      ],
      icon: '📊'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid md:grid-cols-2 gap-8">
      {services.map((service, index) => (
        <div
          key={service.title}
          className={`bg-[#111111] rounded-2xl border border-[#3FC1C9]/20 overflow-hidden transition-all duration-500 hover:border-[#3FC1C9]/40 hover:scale-[1.02] cursor-pointer ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: `${index * 0.15}s` }}
          onClick={() => setExpandedCard(expandedCard === index ? null : index)}
        >
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">{service.icon}</div>
              <h4 className="text-2xl font-semibold text-[#3FC1C9]">{service.title}</h4>
            </div>
            
            <p className="text-lg mb-6 leading-relaxed opacity-90">
              {service.description}
            </p>

            <div className={`transition-all duration-500 overflow-hidden ${
              expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-[#3FC1C9]/20 pt-6">
                <h5 className="text-lg font-semibold mb-4 text-[#3FC1C9]">Core Capabilities:</h5>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={feature}
                      className="flex items-center space-x-3"
                      style={{ animationDelay: `${featureIndex * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-[#3FC1C9] rounded-full animate-pulse"></div>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-[#3FC1C9] font-semibold">
                {expandedCard === index ? 'Show Less' : 'Explore Capabilities'}
              </span>
              <div className={`transition-transform duration-300 ${
                expandedCard === index ? 'rotate-180' : ''
              }`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[#3FC1C9]">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
