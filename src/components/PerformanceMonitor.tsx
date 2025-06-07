
import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({ fps: 60, frameTime: 16 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const frameTime = (currentTime - lastTime) / frameCount;
        
        const memoryUsage = (performance as any).memory?.usedJSHeapSize;

        setMetrics({
          fps,
          frameTime: Math.round(frameTime * 100) / 100,
          memoryUsage: memoryUsage ? Math.round(memoryUsage / 1024 / 1024) : undefined
        });

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    // Show performance monitor in development or when FPS is low
    const shouldShow = process.env.NODE_ENV === 'development';
    setIsVisible(shouldShow);

    if (shouldShow) {
      animationId = requestAnimationFrame(measurePerformance);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  if (!isVisible) return null;

  const fpsColor = metrics.fps >= 55 ? 'text-green-400' : 
                   metrics.fps >= 30 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-sm font-mono">
      <div className={`flex items-center gap-2 ${fpsColor}`}>
        <span>FPS: {metrics.fps}</span>
        <span>Frame: {metrics.frameTime}ms</span>
      </div>
      {metrics.memoryUsage && (
        <div className="text-blue-400">
          Memory: {metrics.memoryUsage}MB
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
