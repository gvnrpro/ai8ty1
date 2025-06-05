
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TextParticleFallbackProps {
  text: string;
  position: [number, number, number];
  scale: number;
}

const TextParticleFallback: React.FC<TextParticleFallbackProps> = ({ text, position, scale }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 0.2]} />
      <meshBasicMaterial color="#3FC1C9" transparent opacity={0.6} />
    </mesh>
  );
};

export default TextParticleFallback;
