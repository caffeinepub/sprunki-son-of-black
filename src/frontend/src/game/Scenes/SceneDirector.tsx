import { useEffect, useRef } from 'react';
import { useDialogue } from '../Dialogue/DialogueContext';
import { usePlayerState } from '../State/usePlayerState';
import { SCRIPTED_LINES } from '../Dialogue/scriptedLines';

export function SceneDirector() {
  const { queueLine } = useDialogue();
  const { currentScene, setScene } = usePlayerState();
  const hasTriggeredIntro = useRef(false);

  useEffect(() => {
    if (currentScene === 'intro' && !hasTriggeredIntro.current) {
      hasTriggeredIntro.current = true;
      
      // Trigger cafeteria encounter after 2 seconds
      setTimeout(() => {
        queueLine(SCRIPTED_LINES.crunchy, 5000);
      }, 2000);
    }
  }, [currentScene, queueLine, setScene]);

  return null;
}
