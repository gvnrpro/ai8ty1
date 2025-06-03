
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingText {
  element: HTMLElement;
  position: THREE.Vector3;
  opacity: number;
}

const CinematicExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const pointsRef = useRef<THREE.Points>();
  const timeRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const storyTexts = [
    "AI systems and digital experiences for tomorrow's leading brands.",
    "Where operational control meets creative intelligence.",
    "Operational AI. Creative Impact.",
    "Outcome-driven systems engineered to move markets.",
    "We build AI-powered systems built to scale.",
    "Let's Build Together."
  ];

  useEffect(() => {
    console.log('CinematicExperience: Starting initialization');
    
    if (!canvasRef.current || !containerRef.current) {
      console.log('CinematicExperience: Canvas or container ref not available');
      return;
    }

    console.log('CinematicExperience: Setting up Three.js scene');

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0A0A0A, 1);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    console.log('CinematicExperience: Creating infinity path');

    // Create infinity loop path points
    const createInfinityPath = () => {
      const points = [];
      const radius = 5;
      const segments = 200;
      
      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 4;
        const x = radius * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
        const y = radius * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t));
        const z = Math.sin(t * 0.5) * 2;
        
        points.push(new THREE.Vector3(x, y, z));
      }
      
      console.log(`CinematicExperience: Created infinity path with ${points.length} points`);
      return points;
    };

    // Create particle system along infinity path
    const pathPoints = createInfinityPath();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const pathIndex = Math.floor(Math.random() * pathPoints.length);
      const basePoint = pathPoints[pathIndex];
      
      // Add some random offset from the path
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 3
      );
      
      const finalPoint = basePoint.clone().add(offset);
      
      positions[i * 3] = finalPoint.x;
      positions[i * 3 + 1] = finalPoint.y;
      positions[i * 3 + 2] = finalPoint.z;
      
      // Color variation between white and cyan
      const isAccent = Math.random() > 0.7;
      if (isAccent) {
        colors[i * 3] = 0.247; // #3FC1C9 normalized
        colors[i * 3 + 1] = 0.757;
        colors[i * 3 + 2] = 0.788;
      } else {
        const intensity = 0.5 + Math.random() * 0.5;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity;
      }
    }

    console.log(`CinematicExperience: Created particle system with ${particleCount} particles`);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Add subtle ambient lighting
    const ambientLight = new THREE.AmbientLight(0x3FC1C9, 0.1);
    scene.add(ambientLight);

    // Camera initial position
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    console.log('CinematicExperience: Setting up mouse controls');

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    console.log('CinematicExperience: Creating floating text elements');

    // Create floating text elements
    const textElements: HTMLElement[] = [];
    storyTexts.forEach((text, index) => {
      const textEl = document.createElement('div');
      textEl.textContent = text;
      textEl.className = 'fixed text-white text-xl md:text-3xl font-light text-center max-w-4xl px-8 pointer-events-none z-10';
      textEl.style.left = '50%';
      textEl.style.top = '50%';
      textEl.style.transform = 'translate(-50%, -50%)';
      textEl.style.opacity = '0';
      textEl.style.fontFamily = 'Inter, sans-serif';
      containerRef.current?.appendChild(textEl);
      textElements.push(textEl);
    });

    console.log(`CinematicExperience: Created ${textElements.length} text elements`);

    console.log('CinematicExperience: Setting up GSAP ScrollTrigger animations');

    // GSAP ScrollTrigger for camera movement and text reveals
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        
        // Move camera along infinity path
        const pathIndex = Math.floor(self.progress * (pathPoints.length - 1));
        const currentPoint = pathPoints[pathIndex];
        const nextPoint = pathPoints[(pathIndex + 1) % pathPoints.length];
        
        if (currentPoint && nextPoint) {
          const t = (self.progress * pathPoints.length) % 1;
          const interpolatedPoint = currentPoint.clone().lerp(nextPoint, t);
          
          camera.position.copy(interpolatedPoint);
          
          // Look ahead along the path
          const lookAheadIndex = (pathIndex + 10) % pathPoints.length;
          const lookAtPoint = pathPoints[lookAheadIndex];
          if (lookAtPoint) {
            camera.lookAt(lookAtPoint);
          }
        }
      }
    });

    // Text reveal animations
    textElements.forEach((textEl, index) => {
      const startProgress = (index / textElements.length) * 0.8;
      const endProgress = startProgress + 0.15;
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: `${startProgress * 100}% top`,
        end: `${endProgress * 100}% top`,
        scrub: 1,
        onUpdate: (self) => {
          const textProgress = Math.max(0, Math.min(1, (self.progress - startProgress) / (endProgress - startProgress)));
          textEl.style.opacity = textProgress.toString();
          
          // Staggered word animation
          const words = textEl.textContent?.split(' ') || [];
          textEl.innerHTML = words.map((word, wordIndex) => {
            const wordDelay = wordIndex * 0.1;
            const wordOpacity = Math.max(0, Math.min(1, (textProgress - wordDelay) / 0.3));
            return `<span style="opacity: ${wordOpacity}; transition: opacity 0.3s ease;">${word}</span>`;
          }).join(' ');
        }
      });
    });

    console.log('CinematicExperience: Starting animation loop');

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;
      
      if (pointsRef.current) {
        // Rotate particle system slowly
        pointsRef.current.rotation.y += 0.001;
        
        // Pulse effect
        const pulseIntensity = 0.8 + Math.sin(timeRef.current * 2) * 0.2;
        (pointsRef.current.material as THREE.PointsMaterial).opacity = pulseIntensity;
        
        // Mouse influence on camera
        if (cameraRef.current) {
          const mouseInfluence = 0.05;
          cameraRef.current.rotation.x += (mouseRef.current.y * mouseInfluence - cameraRef.current.rotation.x) * 0.05;
          cameraRef.current.rotation.y += (mouseRef.current.x * mouseInfluence - cameraRef.current.rotation.y) * 0.05;
        }
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log('CinematicExperience: Resized to', window.innerWidth, 'x', window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    console.log('CinematicExperience: Initialization complete');

    // Cleanup
    return () => {
      console.log('CinematicExperience: Cleaning up');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      textElements.forEach(el => el.remove());
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '600vh' }}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ background: '#0A0A0A' }}
      />
      
      {/* AI8TY Logo */}
      <div className="fixed top-8 left-8 text-2xl font-bold text-[#3FC1C9] z-20">
        AI8TY
      </div>
      
      {/* Scroll indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm z-20 animate-pulse">
        Scroll to explore
      </div>
    </div>
  );
};

export default CinematicExperience;
