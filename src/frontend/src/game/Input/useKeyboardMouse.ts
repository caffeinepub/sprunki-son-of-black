import { useState, useEffect, useRef } from 'react';

export function useKeyboardMouse() {
  const [move, setMove] = useState({ x: 0, y: 0 });
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [interact, setInteract] = useState(false);
  const keysPressed = useRef<Set<string>>(new Set());
  const mouseDelta = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
      if (e.key.toLowerCase() === 'e' || e.key === ' ') {
        setInteract(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
      if (e.key.toLowerCase() === 'e' || e.key === ' ') {
        setInteract(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseDelta.current.x += e.movementX;
      mouseDelta.current.y += e.movementY;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      let x = 0, y = 0;
      if (keysPressed.current.has('w')) y -= 1;
      if (keysPressed.current.has('s')) y += 1;
      if (keysPressed.current.has('a')) x -= 1;
      if (keysPressed.current.has('d')) x += 1;
      setMove({ x, y });

      setLook({ x: mouseDelta.current.x, y: mouseDelta.current.y });
      mouseDelta.current = { x: 0, y: 0 };
    }, 16);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return { move, look, interact };
}
