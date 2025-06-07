import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import CosmicInfoSection from './CosmicInfoSection';
import CosmicMetrics from './CosmicMetrics';
import CosmicServices from './CosmicServices';
import CosmicContact from './CosmicContact';
import CosmicNavigation from './CosmicNavigation';
import Enhanced3DText from './Enhanced3DText';
import EnhancedNebulaBackground from './EnhancedNebulaBackground';
import PerformanceOptimizedParticles from './PerformanceOptimizedParticles';
import AssetPreloader from './AssetPreloader';
import CameraTransition from './CameraTransition';
import InteractiveServiceCard from './InteractiveServiceCard';
import ContactForm from './ContactForm';
import './CosmicLogoAssembly.scss';

// Nebula Background Component with proper texture
const NebulaBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a nebula-like texture using gradients as fallback
  const nebulaTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create radial gradient for nebula effect
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(26, 10, 46, 0.8)');
    gradient.addColorStop(0.3, 'rgba(63, 193, 201, 0.3)');
    gradient.addColorStop(0.6, 'rgba(26, 10, 46, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Add some noise
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const opacity = Math.random() * 0.5;
      ctx.fillStyle = `rgba(63, 193, 201, ${opacity})`;
      ctx.fillRect(x, y, 1, 1);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial map={nebulaTexture} transparent />
    </mesh>
  );
};

// Updated Text Particles Component with performance optimizations
const TextParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const textElements = React.useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const elementCount = isMobile ? 15 : 30; // Reduce on mobile
    
    return Array.from({ length: elementCount }, (_, i) => ({
      text: Math.random() > 0.5 ? 'AI' : '∞',
      position: [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
      ] as [number, number, number],
      key: i,
      scale: 0.2 + Math.random() * 0.3,
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003;
      groupRef.current.rotation.x += 0.0001;
    }
  });

  return (
    <group ref={groupRef}>
      {textElements.map((element) => (
        <Enhanced3DText
          key={element.key}
          text={element.text}
          position={element.position}
          scale={element.scale}
          color="#3FC1C9"
        />
      ))}
    </group>
  );
};

// Cosmic Particles (stars)
const CosmicParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;
  
  const positions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial color="#ffffff" size={0.3} transparent opacity={0.8} />
    </Points>
  );
};

// Enhanced Loader Component
const CosmicLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Exactly 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

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
};

// Logo Assembly Animation Component with better mobile support
const LogoInfinityAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const infinityRef = useRef<SVGPathElement>(null);
  const aiRef = useRef<HTMLSpanElement>(null);
  const tyRef = useRef<HTMLSpanElement>(null);
  const aiOrbitRef = useRef<HTMLDivElement>(null);
  const tyOrbitRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const masterTl = gsap.timeline();
    
    // Adjusted timing for mobile
    const orbitTl = gsap.timeline({ repeat: -1 });
    
    if (aiOrbitRef.current && tyOrbitRef.current) {
      const duration = isMobile ? 1.5 : 2; // Faster on mobile
      orbitTl.to(aiOrbitRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        duration,
        ease: "linear",
      });
      
      orbitTl.to(tyOrbitRef.current, {
        rotation: -360,
        transformOrigin: "center center",
        duration,
        ease: "linear",
      }, "<");
    }

    gsap.to(".orbit-particle", {
      rotation: 360,
      transformOrigin: "center center",
      repeat: -1,
      duration: isMobile ? 1.5 : 2,
      ease: "linear",
    });

    setTimeout(() => {
      orbitTl.kill();
      
      masterTl
        .to([aiOrbitRef.current, tyOrbitRef.current], {
          rotation: 0,
          x: 0,
          y: 0,
          duration: isMobile ? 1 : 1.5,
          ease: "elastic.out(1, 0.3)",
        })
        .fromTo(infinityRef.current, 
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          { 
            strokeDashoffset: 0, 
            duration: isMobile ? 2 : 2.5,
            ease: "power2.out",
            onStart: () => {
              if (infinityRef.current) {
                infinityRef.current.classList.add("infinity-glow");
              }
            }
          }
        )
        .to(infinityRef.current, {
          opacity: 0.6,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        .fromTo(ctaRef.current, 
          { opacity: 0, y: 50, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
          },
          "-=1"
        );
    }, 3000);

    setTimeout(() => {
      onComplete();
    }, isMobile ? 7000 : 8000); // Shorter on mobile
  }, [onComplete]);

  return (
    <div className="infinity-container">
      <svg width="500" height="300" viewBox="0 0 500 300" className="max-w-full h-auto">
        <path
          ref={infinityRef}
          d="M 200 100 C 150 50, 150 150, 200 100 C 250 50, 250 150, 200 100 M 250 150 C 300 100, 300 200, 250 150 C 200 200, 200 100, 250 150"
          stroke="#3FC1C9"
          strokeWidth="4"
          fill="none"
          className="infinity-path"
          transform="rotate(90 250 150)"
        />
      </svg>
      
      <div className="logo-text">
        <div ref={aiOrbitRef} className="orbit-container ai-orbit">
          <span ref={aiRef} className="ai">AI</span>
          <div className="orbit-particle" />
          <div className="orbit-particle" style={{ animationDelay: '1s' }} />
        </div>
        
        <div ref={tyOrbitRef} className="orbit-container ty-orbit">
          <span ref={tyRef} className="ty">TY</span>
          <div className="orbit-particle" />
          <div className="orbit-particle" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      <div ref={ctaRef} className="cta">
        <button 
          className="ai8ty-button ai8ty-button--primary"
          onClick={() => console.log('Explore clicked')}
        >
          Explore Our Work
        </button>
        <button 
          className="ai8ty-button"
          onClick={() => console.log('About clicked')}
        >
          About AI8TY
        </button>
      </div>
    </div>
  );
};

// Main Cosmic Logo Assembly Component
const CosmicLogoAssembly: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  
  // Section visibility states
  const [showLogo, setShowLogo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);

  // Initialize ambient sound after loader
  useEffect(() => {
    if (!showLoader && !audioContext && assetsLoaded) {
      const initAmbientSound = async () => {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          
          // Create ambient hum with better parameters
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          const filter = audioCtx.createBiquadFilter();
          
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(130, audioCtx.currentTime);
          
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(300, audioCtx.currentTime);
          
          gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 3);
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          oscillator.start();
          setAudioContext(audioCtx);
          
          console.log('Enhanced ambient audio initialized');
        } catch (error) {
          console.log('Audio context not supported or blocked:', error);
        }
      };

      setTimeout(initAmbientSound, 500);
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [showLoader, audioContext, assetsLoaded]);

  const handleFormSubmit = (data: any) => {
    console.log('Contact form submitted:', data);
    // Here you would typically send data to your backend
  };

  const handleAssetsLoaded = () => {
    setAssetsLoaded(true);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowLogo(true);
  };

  const handleLogoComplete = () => {
    setShowInfo(true);
    setShowNavigation(true);
  };

  const handleSectionChange = (section: number) => {
    if (section === currentSection) return;
    
    setCurrentSection(section);
    
    // Reset all sections with smooth transitions
    const hidePromises = [
      setShowLogo(false),
      setShowInfo(false),
      setShowMetrics(false),
      setShowServices(false),
      setShowContact(false)
    ];
    
    // Show selected section after transition
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
    }, 300);
  };

  return (
    <div className="cosmic-app">
      {showLoader && <CosmicLoader onComplete={() => {
        setShowLoader(false);
        setShowLogo(true);
      }} />}
      
      {!showLoader && (
        <>
          <div className="canvas-container">
            <AssetPreloader onComplete={() => setAssetsLoaded(true)}>
              <Canvas 
                camera={{ position: [0, 0, 50], fov: 75 }}
                performance={{ min: 0.5 }}
                dpr={Math.min(window.devicePixelRatio, 2)}
              >
                <Suspense fallback={null}>
                  <CameraTransition currentSection={currentSection} />
                  <EnhancedNebulaBackground />
                  <PerformanceOptimizedParticles count={1500} spread={200} />
                  <TextParticles />
                  <ambientLight intensity={0.3} color="#3FC1C9" />
                  <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
                </Suspense>
              </Canvas>
            </AssetPreloader>
          </div>
          
          {showLogo && currentSection === 0 && (
            <LogoInfinityAnimation onComplete={() => {
              setShowNavigation(true);
            }} />
          )}
          
          {showInfo && currentSection === 1 && (
            <CosmicInfoSection 
              isVisible={true} 
              onComplete={() => {}} 
            />
          )}
          
          {showMetrics && currentSection === 2 && (
            <CosmicMetrics 
              isVisible={true} 
              onComplete={() => {}} 
            />
          )}
          
          {showServices && currentSection === 3 && (
            <div className="ai8ty-section">
              <h3 className="text-3xl font-bold mb-12 text-white">
                Our <span className="ai8ty-text-gradient">Services</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InteractiveServiceCard
                  icon="⚡"
                  title="Process Automation"
                  description="Self-optimizing workflows that adapt to changing demands"
                  features={[
                    "Intelligent workflow orchestration",
                    "Real-time process optimization",
                    "Adaptive rule engines",
                    "Performance monitoring"
                  ]}
                  delay={0}
                />
                <InteractiveServiceCard
                  icon="🧠"
                  title="Operational Intelligence"
                  description="AI systems that learn and evolve with your business"
                  features={[
                    "Predictive analytics",
                    "Anomaly detection",
                    "Decision support systems",
                    "Custom AI models"
                  ]}
                  delay={0.2}
                />
                <InteractiveServiceCard
                  icon="🔗"
                  title="System Integration"
                  description="Unified operational intelligence across platforms"
                  features={[
                    "API-first architecture",
                    "Real-time data synchronization",
                    "Legacy system modernization",
                    "Cloud-native solutions"
                  ]}
                  delay={0.4}
                />
              </div>
            </div>
          )}
          
          {showContact && currentSection === 4 && (
            <div className="ai8ty-section">
              <h3 className="text-3xl font-bold mb-8 text-white">
                Ready to <span className="ai8ty-text-gradient">Transform</span>?
              </h3>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          )}
          
          <CosmicNavigation
            isVisible={showNavigation}
            currentSection={currentSection}
            onSectionChange={handleSectionChange}
          />
        </>
      )}
    </div>
  );
};

export default CosmicLogoAssembly;
