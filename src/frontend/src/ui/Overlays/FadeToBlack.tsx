import { useState, useEffect } from 'react';

interface FadeToBlackProps {
  active?: boolean;
  duration?: number;
}

export function FadeToBlack({ active = false, duration = 2000 }: FadeToBlackProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (active) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        setOpacity(progress);
        
        if (progress >= 1) {
          clearInterval(interval);
        }
      }, 16);

      return () => clearInterval(interval);
    } else {
      setOpacity(0);
    }
  }, [active, duration]);

  // Only render when active or fading out
  if (!active && opacity === 0) return null;

  return (
    <div
      className="absolute inset-0 bg-black pointer-events-none z-50"
      style={{ opacity }}
    />
  );
}
