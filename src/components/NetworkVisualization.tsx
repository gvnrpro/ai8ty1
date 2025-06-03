
import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  connections: number[];
  alpha: number;
  size: number;
}

const NetworkVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const phaseRef = useRef<'forming' | 'dissolving' | 'network'>('forming');
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes for AI8TY formation
    const initializeNodes = () => {
      const nodes: Node[] = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create nodes that will form "AI8TY"
      const letterSpacing = 80;
      const startX = centerX - (5 * letterSpacing) / 2;
      
      // AI8TY letter positions (simplified node representation)
      const letterNodes = [
        // A
        { x: startX, y: centerY },
        { x: startX + 20, y: centerY - 30 },
        { x: startX + 40, y: centerY },
        // I
        { x: startX + letterSpacing, y: centerY - 30 },
        { x: startX + letterSpacing, y: centerY },
        { x: startX + letterSpacing, y: centerY + 30 },
        // 8
        { x: startX + letterSpacing * 2, y: centerY - 20 },
        { x: startX + letterSpacing * 2, y: centerY },
        { x: startX + letterSpacing * 2, y: centerY + 20 },
        // T
        { x: startX + letterSpacing * 3, y: centerY - 30 },
        { x: startX + letterSpacing * 3, y: centerY },
        { x: startX + letterSpacing * 3 - 20, y: centerY - 30 },
        { x: startX + letterSpacing * 3 + 20, y: centerY - 30 },
        // Y
        { x: startX + letterSpacing * 4, y: centerY - 30 },
        { x: startX + letterSpacing * 4, y: centerY },
        { x: startX + letterSpacing * 4 - 20, y: centerY - 30 },
        { x: startX + letterSpacing * 4 + 20, y: centerY - 30 },
      ];

      letterNodes.forEach((pos, i) => {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: pos.x,
          targetY: pos.y,
          vx: 0,
          vy: 0,
          connections: [],
          alpha: 0,
          size: 4,
        });
      });

      // Add network nodes for later phase
      for (let i = letterNodes.length; i < 50; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          connections: [],
          alpha: 0,
          size: 2,
        });
      }

      // Create connections
      nodes.forEach((node, i) => {
        const numConnections = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numConnections; j++) {
          const targetIndex = Math.floor(Math.random() * nodes.length);
          if (targetIndex !== i && !node.connections.includes(targetIndex)) {
            node.connections.push(targetIndex);
          }
        }
      });

      nodesRef.current = nodes;
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      timeRef.current += 0.016;

      // Phase management
      if (phaseRef.current === 'forming' && timeRef.current > 3) {
        phaseRef.current = 'dissolving';
        // Set new random targets for network phase
        nodes.forEach(node => {
          node.targetX = Math.random() * canvas.width;
          node.targetY = Math.random() * canvas.height;
        });
      } else if (phaseRef.current === 'dissolving' && timeRef.current > 6) {
        phaseRef.current = 'network';
      }

      // Update nodes
      nodes.forEach((node, i) => {
        // Move towards target with easing
        const dx = node.targetX - node.x;
        const dy = node.targetY - node.y;
        const ease = phaseRef.current === 'forming' ? 0.02 : 0.005;
        
        node.vx += dx * ease;
        node.vy += dy * ease;
        node.vx *= 0.9;
        node.vy *= 0.9;
        
        node.x += node.vx;
        node.y += node.vy;

        // Update alpha based on phase
        if (phaseRef.current === 'forming') {
          node.alpha = Math.min(1, timeRef.current / 2);
        } else if (phaseRef.current === 'dissolving') {
          if (i < 17) { // Letter nodes fade out
            node.alpha = Math.max(0, 1 - (timeRef.current - 3) / 1.5);
          } else { // Network nodes fade in
            node.alpha = Math.min(1, (timeRef.current - 3) / 2);
          }
        } else {
          node.alpha = 1;
        }

        // Network phase - continuous movement
        if (phaseRef.current === 'network') {
          if (Math.random() < 0.005) {
            node.targetX = Math.random() * canvas.width;
            node.targetY = Math.random() * canvas.height;
          }
        }
      });

      // Draw connections
      ctx.strokeStyle = `rgba(63, 193, 201, 0.3)`;
      ctx.lineWidth = 1;
      nodes.forEach((node, i) => {
        if (node.alpha < 0.1) return;
        
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          if (target && target.alpha > 0.1) {
            const distance = Math.hypot(node.x - target.x, node.y - target.y);
            if (distance < 150) {
              const alpha = Math.min(node.alpha, target.alpha) * (1 - distance / 150);
              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(target.x, target.y);
              ctx.stroke();
            }
          }
        });
      });

      // Draw nodes
      nodes.forEach(node => {
        if (node.alpha < 0.1) return;
        
        ctx.globalAlpha = node.alpha;
        ctx.fillStyle = '#3FC1C9';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = '#3FC1C9';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    initializeNodes();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};

export default NetworkVisualization;
