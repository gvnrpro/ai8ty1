
import React from 'react';
import CosmicLogoAssembly from '../components/CosmicLogoAssembly';
import ReducedMotionFallback from '../components/ReducedMotionFallback';
import { useAccessibility } from '../components/AccessibilityProvider';

const Index = () => {
  const { prefersReducedMotion } = useAccessibility();

  if (prefersReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return <CosmicLogoAssembly />;
};

export default Index;
