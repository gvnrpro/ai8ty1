
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface QuantumParticleSystemProps {
  count?: number;
  spread?: number;
  energy?: number;
}

const QuantumParticleSystem: React.FC<QuantumParticleSystemProps> = ({ 
  count = 2000, 
  spread = 300,
  energy = 1
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const velocityRef = useRef<Float32Array>();
  
  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const velocity = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Quantum field distribution
      const radius = Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Quantum energy colors
      const energyLevel = Math.random();
      colors[i3] = 0.2 + energyLevel * 0.8; // Red
      colors[i3 + 1] = 0.8 + energyLevel * 0.2; // Green
      colors[i3 + 2] = 1.0; // Blue
      
      scales[i] = Math.random() * 0.8 + 0.2;
      
      // Initial velocity
      velocity[i3] = (Math.random() - 0.5) * 0.01;
      velocity[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocity[i3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    velocityRef.current = velocity;
    return { positions, colors, scales };
  }, [count, spread]);

  useFrame((state) => {
    if (pointsRef.current && velocityRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const velocity = velocityRef.current;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Quantum field fluctuations
        const wave = Math.sin(time * 2 + i * 0.01) * 0.5;
        
        positions[i3] += velocity[i3] * energy + Math.sin(time + i) * 0.002;
        positions[i3 + 1] += velocity[i3 + 1] * energy + Math.cos(time + i) * 0.002;
        positions[i3 + 2] += velocity[i3 + 2] * energy + wave * 0.001;
        
        // Boundary conditions
        if (Math.abs(positions[i3]) > spread) velocity[i3] *= -0.8;
        if (Math.abs(positions[i3 + 1]) > spread) velocity[i3 + 1] *= -0.8;
        if (Math.abs(positions[i3 + 2]) > spread) velocity[i3 + 2] *= -0.8;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <PointMaterial 
        vertexColors
        size={1.5} 
        transparent 
        opacity={0.9}
        alphaTest={0.01}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default QuantumParticleSystem;
