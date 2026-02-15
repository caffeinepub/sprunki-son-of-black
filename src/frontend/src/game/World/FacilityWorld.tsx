import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GreenHoodEntity } from '../Enemies/GreenHood/GreenHoodEntity';

export function FacilityWorld() {
  const flickerLightRef = useRef<THREE.PointLight>(null);
  const flickerTime = useRef(0);

  useFrame((state, delta) => {
    flickerTime.current += delta;
    if (flickerLightRef.current) {
      const flicker = Math.sin(flickerTime.current * 20) * 0.3 + 0.7;
      flickerLightRef.current.intensity = 0.8 * flicker;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 10, 5]} intensity={0.3} castShadow />
      
      {/* Flickering light in corridor */}
      <pointLight
        ref={flickerLightRef}
        position={[0, 2.5, -8]}
        intensity={0.8}
        distance={12}
        color="#e8d4a0"
        castShadow
      />

      {/* Cafeteria area */}
      <group position={[0, 0, 5]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} metalness={0.1} />
        </mesh>
        
        {/* Walls */}
        <mesh position={[0, 2, -6]} receiveShadow>
          <boxGeometry args={[12, 4, 0.3]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
        </mesh>
        <mesh position={[-6, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 12]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
        </mesh>
        <mesh position={[6, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 12]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.8} />
        </mesh>

        {/* Cafeteria tables */}
        <mesh position={[-2, 0.4, 3]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
        </mesh>
        <mesh position={[2, 0.4, 3]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
        </mesh>

        {/* Counter */}
        <mesh position={[0, 0.5, 8]} castShadow>
          <boxGeometry args={[8, 1, 1.5]} />
          <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
        </mesh>
      </group>

      {/* Corridor */}
      <group position={[0, 0, -5]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 20]} />
          <meshStandardMaterial color="#252525" roughness={0.9} metalness={0.1} />
        </mesh>
        
        {/* Walls */}
        <mesh position={[-2, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 20]} />
          <meshStandardMaterial color="#353535" roughness={0.8} />
        </mesh>
        <mesh position={[2, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 20]} />
          <meshStandardMaterial color="#353535" roughness={0.8} />
        </mesh>

        {/* Lockers (hide spot) */}
        <mesh position={[-1.5, 1, -5]} castShadow userData={{ type: 'hidespot', id: 'locker1' }}>
          <boxGeometry args={[0.8, 2, 0.6]} />
          <meshStandardMaterial color="#4a4a4a" roughness={0.6} metalness={0.3} />
        </mesh>

        {/* Barricadable door */}
        <mesh position={[0, 1, -12]} castShadow userData={{ type: 'door', id: 'door1' }}>
          <boxGeometry args={[1.5, 2.5, 0.2]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.7} />
        </mesh>

        {/* Keycard on table */}
        <mesh position={[1, 0.6, -8]} castShadow userData={{ type: 'keycard', id: 'keycard1' }}>
          <boxGeometry args={[0.1, 0.15, 0.05]} />
          <meshStandardMaterial color="#d4a574" emissive="#d4a574" emissiveIntensity={0.3} />
        </mesh>

        {/* Locked terminal/door at end */}
        <mesh position={[0, 1.2, -18]} castShadow userData={{ type: 'terminal', id: 'terminal1' }}>
          <boxGeometry args={[1, 1.5, 0.3]} />
          <meshStandardMaterial color="#2a2a2a" emissive="#4a4a2a" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 30]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Green Hood entity */}
      <GreenHoodEntity initialPosition={[4, 0, 8]} />
    </>
  );
}
