
import React, { useEffect, useRef } from 'react';
import NetworkVisualization from '../components/NetworkVisualization';
import AnimatedMetrics from '../components/AnimatedMetrics';
import ServiceCards from '../components/ServiceCards';
import ImpactStats from '../components/ImpactStats';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);

  useScrollAnimation();

  useEffect(() => {
    // Staggered text animation on load
    const textElements = document.querySelectorAll('.stagger-text');
    textElements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      el.classList.add('animate-fade-in');
    });
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-[#F0F0F0] min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-[#3FC1C9]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-[#3FC1C9] stagger-text">AI8TY</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-[#3FC1C9] transition-colors duration-300 stagger-text">Systems</a>
              <a href="#services" className="hover:text-[#3FC1C9] transition-colors duration-300 stagger-text">Operations</a>
              <a href="#impact" className="hover:text-[#3FC1C9] transition-colors duration-300 stagger-text">Impact</a>
              <a href="#contact" className="bg-[#3FC1C9] text-[#0A0A0A] px-6 py-2 rounded-lg hover:bg-[#3FC1C9]/90 transition-all duration-300 stagger-text">Engage</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        <NetworkVisualization />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 stagger-text">
            Intelligent
          </h1>
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#3FC1C9] stagger-text">
            Operational Systems
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed stagger-text">
            We design, deploy, and optimize AI-powered systems that transform operational complexity into competitive advantage.
          </p>
          <button className="bg-[#3FC1C9] text-[#0A0A0A] px-12 py-4 rounded-lg text-lg font-semibold hover:bg-[#3FC1C9]/90 transition-all duration-300 stagger-text hover:scale-105 cta-button">
            Initialize System
          </button>
        </div>
      </section>

      {/* Animated Metrics Dashboard */}
      <section className="py-20 border-t border-[#3FC1C9]/20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedMetrics />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="scroll-trigger">
            <h3 className="text-5xl font-bold mb-8 stagger-text">
              Systems That <span className="text-[#3FC1C9]">Think</span>
            </h3>
            <p className="text-xl leading-relaxed mb-8 stagger-text">
              We architect intelligent operational frameworks that don't just automate—they adapt, learn, and evolve with your business demands.
            </p>
            <div className="space-y-6 stagger-text">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-[#3FC1C9] rounded-full animate-pulse"></div>
                <span className="text-lg">Adaptive Process Intelligence</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-[#3FC1C9] rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-lg">Real-time Operational Optimization</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-[#3FC1C9] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-lg">Predictive System Scaling</span>
              </div>
            </div>
          </div>
          <div className="scroll-trigger">
            <div className="bg-[#111111] p-8 rounded-2xl border border-[#3FC1C9]/20 stagger-text">
              <h4 className="text-2xl font-semibold mb-6 text-[#3FC1C9]">Live System Status</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Processing Efficiency</span>
                  <span className="text-[#3FC1C9] font-mono">98.7%</span>
                </div>
                <div className="w-full bg-[#0A0A0A] rounded-full h-2">
                  <div className="bg-[#3FC1C9] h-2 rounded-full w-[98.7%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Optimizations</span>
                  <span className="text-[#3FC1C9] font-mono">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Response Time</span>
                  <span className="text-[#3FC1C9] font-mono">0.23ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-32 bg-[#111111]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 scroll-trigger">
            <h3 className="text-5xl font-bold mb-8 stagger-text">
              Operational <span className="text-[#3FC1C9]">Excellence</span>
            </h3>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed stagger-text">
              Every system we deploy transforms operational challenges into strategic advantages through intelligent automation.
            </p>
          </div>
          <ServiceCards />
        </div>
      </section>

      {/* Impact Stats */}
      <section ref={impactRef} id="impact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <ImpactStats />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-6 scroll-trigger">
          <h3 className="text-5xl font-bold mb-8 stagger-text">
            Ready to <span className="text-[#3FC1C9]">Optimize</span>?
          </h3>
          <p className="text-xl mb-12 leading-relaxed stagger-text">
            Transform your operational complexity into competitive intelligence. Let's architect your AI-powered future.
          </p>
          <button className="bg-[#3FC1C9] text-[#0A0A0A] px-16 py-6 rounded-lg text-xl font-semibold hover:bg-[#3FC1C9]/90 transition-all duration-300 stagger-text hover:scale-105 cta-button">
            Initialize Partnership
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#3FC1C9]/20 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3FC1C9] mb-4">AI8TY</div>
            <p className="text-lg opacity-80">Intelligent Operational Systems</p>
            <div className="mt-8 space-x-8">
              <a href="#" className="hover:text-[#3FC1C9] transition-colors duration-300">Systems</a>
              <a href="#" className="hover:text-[#3FC1C9] transition-colors duration-300">Operations</a>
              <a href="#" className="hover:text-[#3FC1C9] transition-colors duration-300">Impact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
