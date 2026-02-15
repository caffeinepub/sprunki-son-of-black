import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInputMode } from '../Input/useInputMode';
import { usePlayerState } from '../State/usePlayerState';

export function PlayerController() {
  const { camera } = useThree();
  const { moveInput, lookInput, interactPressed } = useInputMode();
  const { setPlayerPosition } = usePlayerState();
  const velocityRef = useRef(new THREE.Vector3());
  const pitchRef = useRef(0);
  const yawRef = useRef(0);

  useFrame((state, delta) => {
    // Movement
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    forward.y = 0;
    forward.normalize();
    
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    right.y = 0;
    right.normalize();

    const moveSpeed = 3;
    const targetVelocity = new THREE.Vector3();
    targetVelocity.addScaledVector(forward, -moveInput.y * moveSpeed);
    targetVelocity.addScaledVector(right, moveInput.x * moveSpeed);

    velocityRef.current.lerp(targetVelocity, 0.2);
    camera.position.add(velocityRef.current.clone().multiplyScalar(delta));

    // Keep camera at head height
    camera.position.y = 1.6;

    // Look
    const lookSpeed = 0.002;
    yawRef.current -= lookInput.x * lookSpeed;
    pitchRef.current -= lookInput.y * lookSpeed;
    pitchRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitchRef.current));

    camera.rotation.set(pitchRef.current, yawRef.current, 0, 'YXZ');

    // Update player position for AI
    setPlayerPosition(camera.position.clone());
  });

  return null;
}
