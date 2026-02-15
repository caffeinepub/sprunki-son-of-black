import { useState, useEffect, useRef } from 'react';
import { useKeyboardMouse } from './useKeyboardMouse';
import { useTouchLook } from './useTouchLook';

export function useInputMode() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [moveInput, setMoveInput] = useState({ x: 0, y: 0 });
  const [lookInput, setLookInput] = useState({ x: 0, y: 0 });
  const [interactPressed, setInteractPressed] = useState(false);

  const keyboardMouse = useKeyboardMouse();
  const touchLook = useTouchLook();

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) {
      setLookInput(touchLook);
    } else {
      setMoveInput(keyboardMouse.move);
      setLookInput(keyboardMouse.look);
      setInteractPressed(keyboardMouse.interact);
    }
  }, [isTouchDevice, keyboardMouse, touchLook]);

  return {
    isTouchDevice,
    moveInput,
    lookInput,
    interactPressed,
    setMoveInput,
    setInteractPressed
  };
}
