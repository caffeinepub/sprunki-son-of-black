import { useState, useEffect, useRef } from 'react';

export function useTouchLook() {
  const [lookDelta, setLookDelta] = useState({ x: 0, y: 0 });
  const lastTouch = useRef<{ x: number; y: number } | null>(null);
  const accumulatedDelta = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        // Only track touches on right half of screen
        if (touch.clientX > window.innerWidth / 2) {
          lastTouch.current = { x: touch.clientX, y: touch.clientY };
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (lastTouch.current && e.touches.length > 0) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastTouch.current.x;
        const deltaY = touch.clientY - lastTouch.current.y;
        
        accumulatedDelta.current.x += deltaX * 2;
        accumulatedDelta.current.y += deltaY * 2;
        
        lastTouch.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchEnd = () => {
      lastTouch.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    const interval = setInterval(() => {
      setLookDelta({ ...accumulatedDelta.current });
      accumulatedDelta.current = { x: 0, y: 0 };
    }, 16);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(interval);
    };
  }, []);

  return lookDelta;
}
