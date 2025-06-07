
import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface CameraTransitionProps {
  currentSection: number;
  scrollProgress: number;
  onTransitionComplete?: () => void;
}

const CameraTransition: React.FC<CameraTransitionProps> = ({ 
  currentSection, 
  scrollProgress,
  onTransitionComplete 
}) => {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetRotation = useRef(new THREE.Euler());
  const isTransitioning = useRef(false);

  // Define camera positions for scroll-based navigation
  const cameraPositions = {
    0: { position: [0, 0, 50] as const, rotation: [0, 0, 0] as const }, // Logo
    1: { position: [-30, 15, 45] as const, rotation: [0, -0.4, 0] as const }, // Info
    2: { position: [25, -15, 50] as const, rotation: [0, 0.4, 0] as const }, // Metrics
    3: { position: [0, 25, 40] as const, rotation: [-0.3, 0, 0] as const }, // Services
    4: { position: [0, -25, 45] as const, rotation: [0.3, 0, 0] as const }, // Contact
  };

  useEffect(() => {
    const targetPos = cameraPositions[currentSection as keyof typeof cameraPositions];
    if (!targetPos || isTransitioning.current) return;

    isTransitioning.current = true;
    targetPosition.current.set(targetPos.position[0], targetPos.position[1], targetPos.position[2]);
    targetRotation.current.set(targetPos.rotation[0], targetPos.rotation[1], targetPos.rotation[2]);

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
        duration: 2,
        ease: "power3.inOut",
      })
      .to(camera.rotation, {
        x: targetRotation.current.x,
        y: targetRotation.current.y,
        z: targetRotation.current.z,
        duration: 2,
        ease: "power3.inOut",
      }, "<");

  }, [currentSection, camera, onTransitionComplete]);

  // Smooth scroll-based camera movement
  useFrame(() => {
    if (!isTransitioning.current && scrollProgress !== undefined) {
      const smoothProgress = scrollProgress * 0.1;
      camera.position.y += Math.sin(smoothProgress) * 0.02;
      camera.position.x += Math.cos(smoothProgress * 0.5) * 0.01;
    }
    camera.updateMatrixWorld();
  });

  return null;
};

export default CameraTransition;
