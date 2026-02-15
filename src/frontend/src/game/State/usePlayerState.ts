import { useState, useEffect, useCallback } from 'react';
import { useActor } from '../../hooks/useActor';
import * as THREE from 'three';

interface PlayerState {
  stress: number;
  currentScene: string;
  hasKeycard: boolean;
  hasFoundCode: boolean;
  isInSaveSpot: boolean;
  doorsBarricaded: string[];
}

export function usePlayerState() {
  const { actor } = useActor();
  const [state, setState] = useState<PlayerState>({
    stress: 0,
    currentScene: 'intro',
    hasKeycard: false,
    hasFoundCode: false,
    isInSaveSpot: false,
    doorsBarricaded: []
  });
  const [playerPosition, setPlayerPosition] = useState<THREE.Vector3 | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!actor) return;

    actor.getPlayerState().then(([stress, scene, keycard, code, saveSpot, doors]) => {
      setState({
        stress: Number(stress),
        currentScene: scene,
        hasKeycard: keycard,
        hasFoundCode: code,
        isInSaveSpot: saveSpot,
        doorsBarricaded: doors
      });
      setIsLoading(false);
    });
  }, [actor]);

  const updateStress = useCallback(async (amount: number) => {
    if (!actor) return;
    
    await actor.updateStress(BigInt(amount));
    setState(prev => ({
      ...prev,
      stress: Math.max(0, prev.stress + amount)
    }));
  }, [actor]);

  const setScene = useCallback(async (scene: string) => {
    if (!actor) return;
    
    await actor.setScene(scene);
    setState(prev => ({ ...prev, currentScene: scene }));
  }, [actor]);

  const findKeycard = useCallback(async () => {
    if (!actor) return;
    
    await actor.findKeycard();
    setState(prev => ({ ...prev, hasKeycard: true }));
  }, [actor]);

  const findCode = useCallback(async () => {
    if (!actor) return;
    
    await actor.findCode();
    setState(prev => ({ ...prev, hasFoundCode: true }));
  }, [actor]);

  const enterSaveSpot = useCallback(async () => {
    if (!actor) return;
    
    await actor.enterSaveSpot();
    setState(prev => ({ ...prev, isInSaveSpot: true }));
  }, [actor]);

  const exitSaveSpot = useCallback(async () => {
    if (!actor) return;
    
    await actor.exitSaveSpot();
    setState(prev => ({ ...prev, isInSaveSpot: false }));
  }, [actor]);

  const barricadeDoor = useCallback(async (doorId: string) => {
    if (!actor) return;
    
    try {
      await actor.barricadeDoor(doorId);
      setState(prev => ({
        ...prev,
        doorsBarricaded: [...prev.doorsBarricaded, doorId]
      }));
    } catch (e) {
      console.error('Failed to barricade door:', e);
    }
  }, [actor]);

  return {
    ...state,
    isLoading,
    updateStress,
    setScene,
    findKeycard,
    findCode,
    enterSaveSpot,
    exitSaveSpot,
    barricadeDoor,
    playerPosition,
    setPlayerPosition
  };
}
