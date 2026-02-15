import { useRef, useEffect, useState } from 'react';
import { useInputMode } from '../../game/Input/useInputMode';

export function MobileJoystick() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const { setMoveInput } = useInputMode();
  const touchId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchId.current = touch.identifier;
      setIsActive(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchId.current === null) return;
      
      const touch = Array.from(e.touches).find(t => t.identifier === touchId.current);
      if (!touch || !container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deltaX = touch.clientX - centerX;
      let deltaY = touch.clientY - centerY;

      const maxDistance = 40;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > maxDistance) {
        deltaX = (deltaX / distance) * maxDistance;
        deltaY = (deltaY / distance) * maxDistance;
      }

      setKnobPosition({ x: deltaX, y: deltaY });
      setMoveInput({
        x: deltaX / maxDistance,
        y: deltaY / maxDistance
      });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = Array.from(e.changedTouches);
      if (touches.some(t => t.identifier === touchId.current)) {
        touchId.current = null;
        setIsActive(false);
        setKnobPosition({ x: 0, y: 0 });
        setMoveInput({ x: 0, y: 0 });
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [setMoveInput]);

  return (
    <div
      ref={containerRef}
      className="relative w-32 h-32 touch-none no-select"
      style={{
        backgroundImage: 'url(/assets/generated/mobile-joystick-base.dim_256x256.png)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 transition-opacity"
        style={{
          backgroundImage: 'url(/assets/generated/mobile-joystick-knob.dim_256x256.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: `translate(calc(-50% + ${knobPosition.x}px), calc(-50% + ${knobPosition.y}px))`,
          opacity: isActive ? 1 : 0.6
        }}
      />
    </div>
  );
}
