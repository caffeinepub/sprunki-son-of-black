import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useDialogue } from '../../Dialogue/DialogueContext';
import { SCRIPTED_LINES } from '../../Dialogue/scriptedLines';
import { usePlayerState } from '../../State/usePlayerState';

export type AIState = 'idle' | 'patrol' | 'chase';

export function useGreenHoodAI(currentPosition: THREE.Vector3) {
  const [aiState, setAIState] = useState<AIState>('idle');
  const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null);
  const { queueLine } = useDialogue();
  const lastThreatTime = useRef(0);
  const { playerPosition } = usePlayerState();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playerPosition) return;

      const distance = currentPosition.distanceTo(playerPosition);
      const now = Date.now();

      // Detection logic
      if (distance < 3 && aiState !== 'chase') {
        setAIState('chase');
        setTargetPosition(playerPosition.clone());
        
        if (now - lastThreatTime.current > 5000) {
          queueLine(SCRIPTED_LINES.noSkinLeft);
          lastThreatTime.current = now;
        }
      } else if (distance < 8 && aiState === 'idle') {
        setAIState('patrol');
        setTargetPosition(playerPosition.clone());
      } else if (distance > 10 && aiState === 'chase') {
        setAIState('patrol');
      }

      // Update target in chase
      if (aiState === 'chase') {
        setTargetPosition(playerPosition.clone());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [aiState, currentPosition, playerPosition, queueLine]);

  return { aiState, targetPosition };
}
