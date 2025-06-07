
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface CameraTransitionProps {
  currentSection: number;
  onTransitionComplete?: () => void;
}

const CameraTransition: React.FC<CameraTransitionProps> = ({ 
  currentSection, 
  onTransitionComplete 
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler());
  const isTransitioning = useRef(false);

  // Define camera positions for each section
  const cameraPositions = {
    0: { position: [0, 0, 50], rotation: [0, 0, 0] }, // Logo
    1: { position: [-20, 10, 40], rotation: [0, -0.3, 0] }, // Info
    2: { position: [20, -10, 45], rotation: [0, 0.3, 0] }, // Metrics
    3: { position: [0, 20, 35], rotation: [-0.2, 0, 0] }, // Services
    4: { position: [0, -20, 40], rotation: [0.2, 0, 0] }, // Contact
  };

  useEffect(() => {
    const targetPos = cameraPositions[currentSection as keyof typeof cameraPositions];
    if (!targetPos || isTransitioning.current) return;

    isTransitioning.current = true;
    targetPosition.current.set(...targetPos.position);
    targetRotation.current.set(...targetPos.rotation);

    // Smooth camera transition using GSAP
    const timeline = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
        onTransitionComplete?.();
      }
    });

    timeline
      .to(camera.position, {
        x: targetPosition.current.x,
        y: targetPosition.current.y,
        z: targetPosition.current.z,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(camera.rotation, {
        x: targetRotation.current.x,
        y: targetRotation.current.y,
        z: targetRotation.current.z,
        duration: 1.5,
        ease: "power2.inOut",
      }, "<");

    console.log(`Camera transitioning to section ${currentSection}`);
  }, [currentSection, camera, onTransitionComplete]);

  useFrame(() => {
    // Smooth camera updates
    camera.updateMatrixWorld();
  });

  return null;
};

export default CameraTransition;
