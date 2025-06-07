
import React from 'react';
import { Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface Enhanced3DTextProps {
  text: string;
  position: [number, number, number];
  scale: number;
  color?: string;
}

const Enhanced3DText: React.FC<Enhanced3DTextProps> = ({ 
  text, 
  position, 
  scale, 
  color = "#3FC1C9" 
}) => {
  // Create fallback geometry for when font fails to load
  const createFallbackTexture = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 256;
    canvas.height = 128;
    
    context.fillStyle = color;
    context.font = `${scale * 100}px Arial, sans-serif`;
    context.textAlign = 'center';
    context.fillText(text, 128, 80);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  return (
    <Center position={position}>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={scale}
        height={0.1}
        curveSegments={12}
      >
        {text}
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.8}
        />
      </Text3D>
    </Center>
  );
};

export default Enhanced3DText;
