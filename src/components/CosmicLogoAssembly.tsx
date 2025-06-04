
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import './CosmicLogoAssembly.scss';

// Particle Background Component
const CosmicParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  
  const positions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0004;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial color="#ffffff" size={0.5} transparent opacity={0.6} />
    </Points>
  );
};

// Nebula Background Component  
const NebulaBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <planeGeometry args={[500, 500]} />
      <meshBasicMaterial color="#1a0a2e" transparent opacity={0.2} />
    </mesh>
  );
};

// Floating Code Particles Component
const CodeParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  const codeElements = React.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      text: Math.random() > 0.5 ? 'AI' : '∞',
      position: [
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
      ] as [number, number, number],
      key: i,
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0004;
    }
  });

  return (
    <group ref={groupRef}>
      {codeElements.map((element) => (
        <mesh key={element.key} position={element.position}>
          <boxGeometry args={[2, 2, 0.1]} />
          <meshBasicMaterial color="#3FC1C9" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

// Loader Component
const Loader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="cosmic-loader">
      <h1>Entering the Void...</h1>
      <div className="loader-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="particle" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );
};

// Logo Assembly Animation Component
const LogoInfinityAnimation: React.FC = () => {
  const infinityRef = useRef<SVGPathElement>(null);
  const aiRef = useRef<HTMLSpanElement>(null);
  const tyRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aiOrbitRef = useRef<HTMLDivElement>(null);
  const tyOrbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial orbit animations
    const orbitTl = gsap.timeline();
    
    if (aiOrbitRef.current && tyOrbitRef.current) {
      orbitTl.to(aiOrbitRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 2,
        ease: "linear",
      });
      
      orbitTl.to(tyOrbitRef.current, {
        rotation: -360,
        transformOrigin: "center center",
        repeat: -1,
        duration: 2,
        ease: "linear",
      }, "<");
    }

    // Orbit particles animation
    gsap.to(".orbit-particle", {
      rotation: 360,
      transformOrigin: "center center",
      repeat: -1,
      duration: 2,
      ease: "linear",
    });

    // Lock-in animation triggered after loader
    setTimeout(() => {
      const lockInTl = gsap.timeline();
      
      lockInTl
        .to([aiOrbitRef.current, tyOrbitRef.current], {
          rotation: 0,
          x: 0,
          y: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        })
        .fromTo(infinityRef.current, 
          { strokeDasharray: 1000, strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 2 }
        )
        .to(infinityRef.current, {
          onStart: () => {
            if (infinityRef.current) {
              infinityRef.current.classList.add("infinity-glow");
            }
          },
        })
        .to(infinityRef.current, {
          opacity: 0.8,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        .fromTo(ctaRef.current, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1 }
        );
    }, 3500);

  }, []);

  return (
    <div className="infinity-container">
      <svg width="500" height="300" viewBox="0 0 500 300">
        <path
          ref={infinityRef}
          d="M 150 150 C 100 100, 100 200, 150 150 C 200 100, 200 200, 150 150"
          stroke="#fff"
          strokeWidth="4"
          fill="none"
          className="infinity-path"
        />
      </svg>
      
      <div className="logo-text">
        <div ref={aiOrbitRef} className="orbit-container">
          <span ref={aiRef} className="ai">AI</span>
          <div className="orbit-particle" />
          <div className="orbit-particle" style={{ animationDelay: '1s' }} />
        </div>
        
        <div ref={tyOrbitRef} className="orbit-container">
          <span ref={tyRef} className="ty">TY</span>
          <div className="orbit-particle" />
          <div className="orbit-particle" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      <div ref={ctaRef} className="cta">
        <button>Explore Our Work</button>
        <button>About AI8TY</button>
      </div>
    </div>
  );
};

// Main Cosmic Logo Assembly Component
const CosmicLogoAssembly: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);

  // Initialize ambient sound
  useEffect(() => {
    const initAmbientSound = () => {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(130, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        
        return audioCtx;
      } catch (error) {
        console.log('Audio context not supported');
      }
    };

    if (!showLoader) {
      initAmbientSound();
    }
  }, [showLoader]);

  return (
    <div className="cosmic-app">
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      
      {!showLoader && (
        <>
          <div className="canvas-container">
            <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
              <Suspense fallback={null}>
                <NebulaBackground />
                <CosmicParticles />
                <CodeParticles />
              </Suspense>
            </Canvas>
          </div>
          <LogoInfinityAnimation />
        </>
      )}
    </div>
  );
};

export default CosmicLogoAssembly;
