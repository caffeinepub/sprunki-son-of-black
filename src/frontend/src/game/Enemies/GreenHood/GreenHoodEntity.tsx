import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GreenHoodModel } from './GreenHoodModel';
import { useGreenHoodAI } from './greenHoodAI';

export interface GreenHoodHandle {
  setHoodState: (revealed: boolean) => void;
  getPosition: () => THREE.Vector3;
  setChaseSpeed: (speed: number) => void;
}

interface GreenHoodEntityProps {
  initialPosition: [number, number, number];
}

export const GreenHoodEntity = forwardRef<GreenHoodHandle, GreenHoodEntityProps>(
  ({ initialPosition }, ref) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hoodRevealed, setHoodRevealed] = useState(false);
    const [position, setPosition] = useState(new THREE.Vector3(...initialPosition));
    const velocityRef = useRef(new THREE.Vector3());
    const speedRef = useRef(1.5);

    useImperativeHandle(ref, () => ({
      setHoodState: (revealed: boolean) => setHoodRevealed(revealed),
      getPosition: () => position.clone(),
      setChaseSpeed: (speed: number) => {
        speedRef.current = speed;
      }
    }));

    const { aiState, targetPosition } = useGreenHoodAI(position);

    useFrame((state, delta) => {
      if (!groupRef.current) return;

      // Move towards target
      if (targetPosition) {
        const direction = new THREE.Vector3()
          .subVectors(targetPosition, position)
          .normalize();
        
        const speed = aiState === 'chase' ? speedRef.current * 2 : speedRef.current;
        velocityRef.current.lerp(direction.multiplyScalar(speed), 0.1);
        
        const newPos = position.clone().add(velocityRef.current.multiplyScalar(delta));
        setPosition(newPos);
        groupRef.current.position.copy(newPos);

        // Face movement direction
        if (velocityRef.current.length() > 0.01) {
          const angle = Math.atan2(velocityRef.current.x, velocityRef.current.z);
          groupRef.current.rotation.y = angle;
        }
      }
    });

    return (
      <group ref={groupRef} position={initialPosition}>
        <GreenHoodModel hoodRevealed={hoodRevealed} />
      </group>
    );
  }
);

GreenHoodEntity.displayName = 'GreenHoodEntity';
