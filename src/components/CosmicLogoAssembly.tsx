
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevolutionaryLogoAssembly from './RevolutionaryLogoAssembly';
import CosmicInfoSection from './CosmicInfoSection';
import PredictiveMetrics from './PredictiveMetrics';
import CosmicServices from './CosmicServices';
import CosmicContact from './CosmicContact';
import FuturisticNavigation from './FuturisticNavigation';
import EnhancedNebulaBackground from './EnhancedNebulaBackground';
import QuantumParticleSystem from './QuantumParticleSystem';
import HolographicInterface from './HolographicInterface';
import CameraTransition from './CameraTransition';
import ScrollManager from './ScrollManager';
import AssetPreloader from './AssetPreloader';
import './CosmicLogoAssembly.scss';

gsap.registerPlugin(ScrollTrigger);

const CosmicLogoAssembly: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  // Section visibility states
  const [showLogo, setShowLogo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
      setShowLogo(true);
      setShowNavigation(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (section: number) => {
    if (section === currentSection) return;
    
    setCurrentSection(section);
    
    // Reset all sections
    setShowLogo(false);
    setShowInfo(false);
    setShowMetrics(false);
    setShowServices(false);
    setShowContact(false);
    
    // Show selected section
    setTimeout(() => {
      switch (section) {
        case 0:
          setShowLogo(true);
          break;
        case 1:
          setShowInfo(true);
          break;
        case 2:
          setShowMetrics(true);
          break;
        case 3:
          setShowServices(true);
          break;
        case 4:
          setShowContact(true);
          break;
      }
    }, 100);
  };

  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress);
  };

  const handleLogoComplete = () => {
    console.log('Logo assembly complete');
  };

  if (showLoader) {
    return (
      <div className="cosmic-loader">
        <h1>Entering the AI8TY Universe...</h1>
        <div className="loader-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cosmic-app">
      <ScrollManager 
        onSectionChange={handleSectionChange}
        onScrollProgress={handleScrollProgress}
      >
        <div className="canvas-container">
          <AssetPreloader onComplete={() => setAssetsLoaded(true)}>
            <Canvas 
              camera={{ position: [0, 0, 50], fov: 75 }}
              performance={{ min: 0.5 }}
              dpr={Math.min(window.devicePixelRatio, 2)}
            >
              <Suspense fallback={null}>
                <CameraTransition 
                  currentSection={currentSection} 
                  scrollProgress={scrollProgress}
                />
                <EnhancedNebulaBackground />
                <QuantumParticleSystem count={1500} spread={200} energy={1} />
                <ambientLight intensity={0.3} color="#3FC1C9" />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
              </Suspense>
            </Canvas>
          </AssetPreloader>
        </div>
        
        {showLogo && currentSection === 0 && (
          <RevolutionaryLogoAssembly onComplete={handleLogoComplete} />
        )}
        
        {showInfo && currentSection === 1 && (
          <HolographicInterface isVisible={true} section="info">
            <CosmicInfoSection isVisible={true} onComplete={() => {}} />
          </HolographicInterface>
        )}
        
        {showMetrics && currentSection === 2 && (
          <HolographicInterface isVisible={true} section="metrics">
            <PredictiveMetrics isVisible={true} />
          </HolographicInterface>
        )}
        
        {showServices && currentSection === 3 && (
          <HolographicInterface isVisible={true} section="services">
            <CosmicServices isVisible={true} onComplete={() => {}} />
          </HolographicInterface>
        )}
        
        {showContact && currentSection === 4 && (
          <HolographicInterface isVisible={true} section="contact">
            <CosmicContact isVisible={true} onComplete={() => {}} />
          </HolographicInterface>
        )}
        
        <FuturisticNavigation
          isVisible={showNavigation}
          currentSection={currentSection}
          scrollProgress={scrollProgress}
          onSectionChange={handleSectionChange}
        />
      </ScrollManager>
    </div>
  );
};

export default CosmicLogoAssembly;
