
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EnhancedNebulaBackground: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create enhanced nebula texture with noise
  const nebulaTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Create multiple gradient layers for depth
    const createGradientLayer = (opacity: number, offset: number = 0) => {
      const gradient = ctx.createRadialGradient(
        512 + offset, 512 + offset, 0, 
        512 + offset, 512 + offset, 512
      );
      gradient.addColorStop(0, `rgba(26, 10, 46, ${opacity})`);
      gradient.addColorStop(0.2, `rgba(63, 193, 201, ${opacity * 0.4})`);
      gradient.addColorStop(0.4, `rgba(138, 43, 226, ${opacity * 0.3})`);
      gradient.addColorStop(0.7, `rgba(26, 10, 46, ${opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(0, 0, 0, ${opacity})`);
      return gradient;
    };
    
    // Base layer
    ctx.fillStyle = createGradientLayer(0.9);
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Secondary layer with offset
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = createGradientLayer(0.3, 100);
    ctx.fillRect(0, 0, 1024, 1024);
    
    // Add cosmic dust particles
    ctx.globalCompositeOperation = 'lighten';
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 3;
      const opacity = Math.random() * 0.8;
      const hue = Math.random() > 0.7 ? 180 : 280; // Cyan or purple
      
      ctx.fillStyle = `hsla(${hue}, 70%, 70%, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add nebula wisps
    ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 200);
      gradient.addColorStop(0, 'rgba(63, 193, 201, 0.2)');
      gradient.addColorStop(1, 'rgba(63, 193, 201, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1024, 1024);
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0001;
      // Add subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -100]}>
      <planeGeometry args={[600, 600]} />
      <meshBasicMaterial 
        map={nebulaTexture} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export default EnhancedNebulaBackground;
