import { useEffect, useRef } from 'react';
import { useAudioSettings } from './audioSettingsStore';
import * as THREE from 'three';

export function useTensionAudio(
  enemyPosition: THREE.Vector3 | null,
  playerPosition: THREE.Vector3 | null,
  mouthRevealed: boolean = false
) {
  const { volume, muted } = useAudioSettings();
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (muted) return;

    // Initialize Web Audio
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      
      const oscillator = audioContextRef.current.createOscillator();
      const gainNode = audioContextRef.current.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 60; // Low frequency hum
      
      gainNode.gain.value = 0;
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      oscillator.start();
      
      oscillatorRef.current = oscillator;
      gainNodeRef.current = gainNode;
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [muted]);

  useEffect(() => {
    if (!gainNodeRef.current || !enemyPosition || !playerPosition || muted) return;

    const distance = enemyPosition.distanceTo(playerPosition);
    const maxDistance = 15;
    const minDistance = 2;

    let intensity = 0;
    if (distance < maxDistance) {
      intensity = 1 - Math.max(0, (distance - minDistance) / (maxDistance - minDistance));
    }

    // Increase intensity if mouth is revealed
    if (mouthRevealed) {
      intensity = Math.min(1, intensity * 1.5);
    }

    const targetGain = intensity * (volume / 100) * 0.3;
    gainNodeRef.current.gain.linearRampToValueAtTime(
      targetGain,
      audioContextRef.current!.currentTime + 0.1
    );
  }, [enemyPosition, playerPosition, mouthRevealed, volume, muted]);
}
