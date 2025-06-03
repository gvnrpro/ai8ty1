
import React from 'react';
import CinematicExperience from '../components/CinematicExperience';
import ReducedMotionFallback from '../components/ReducedMotionFallback';
import { usePreferredMotion } from '../hooks/usePreferredMotion';

const Index = () => {
  const prefersReducedMotion = usePreferredMotion();

  if (prefersReducedMotion) {
    return <ReducedMotionFallback />;
  }

  return (
    <div className="bg-[#0A0A0A] text-[#F0F0F0] min-h-screen overflow-x-hidden">
      <CinematicExperience />
    </div>
  );
};

export default Index;
