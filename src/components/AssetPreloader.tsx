
import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

interface AssetPreloaderProps {
  onComplete: () => void;
  children: React.ReactNode;
}

const AssetPreloader: React.FC<AssetPreloaderProps> = ({ onComplete, children }) => {
  const { progress, loaded, total } = useProgress();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (progress === 100 && !isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 500); // Small delay for smooth transition
      
      return () => clearTimeout(timer);
    }
  }, [progress, isComplete, onComplete]);

  if (!isComplete) {
    return (
      <div className="asset-preloader">
        <div className="preloader-content">
          <div className="preloader-title">Initializing AI8TY Universe</div>
          <div className="preloader-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text">
              {Math.round(progress)}% ({loaded}/{total} assets)
            </div>
          </div>
          <div className="preloader-particles">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i} 
                className="preloader-particle" 
                style={{ animationDelay: `${i * 0.1}s` }} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AssetPreloader;
