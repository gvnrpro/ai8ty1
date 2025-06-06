
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PerformanceOptimizedParticlesProps {
  count?: number;
  spread?: number;
}

const PerformanceOptimizedParticles: React.FC<PerformanceOptimizedParticlesProps> = ({ 
  count = 1500, 
  spread = 200 
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Reduce particle count on mobile devices
  const optimizedCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    return isMobile ? Math.floor(count * 0.3) : count;
  }, [count]);
  
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(optimizedCount * 3);
    const colors = new Float32Array(optimizedCount * 3);
    const sizes = new Float32Array(optimizedCount);
    
    for (let i = 0; i < optimizedCount; i++) {
      const i3 = i * 3;
      
      // Position
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;
      
      // Color variation (cyan to white)
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i3] = intensity; // R
      colors[i3 + 1] = intensity; // G
      colors[i3 + 2] = Math.min(1, intensity + 0.3); // B (more blue)
      
      // Size variation
      sizes[i] = Math.random() * 0.5 + 0.2;
    }
    
    return { positions, colors, sizes };
  }, [optimizedCount, spread]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
      pointsRef.current.rotation.x += 0.0001;
      
      // Add subtle floating motion
      const time = state.clock.elapsedTime;
      pointsRef.current.position.y = Math.sin(time * 0.1) * 0.5;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial 
        vertexColors
        size={0.3} 
        transparent 
        opacity={0.8}
        alphaTest={0.01}
        depthWrite={false}
      />
    </Points>
  );
};

export default PerformanceOptimizedParticles;
