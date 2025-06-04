
import React from 'react';
import CosmicLogoAssembly from '../components/CosmicLogoAssembly';
import ReducedMotionFallback from '../components/ReducedMotionFallback';
import { usePreferredMotion } from '../hooks/usePreferredMotion';

const Index = () => {
  const prefersReducedMotion = usePreferredMotion();

  if (prefersReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return <CosmicLogoAssembly />;
};

export default Index;
