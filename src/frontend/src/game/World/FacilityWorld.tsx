import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GreenHoodEntity } from '../Enemies/GreenHood/GreenHoodEntity';

export function FacilityWorld() {
  const flickerLightRef = useRef<THREE.PointLight>(null);
  const flickerTime = useRef(0);

  useFrame((state, delta) => {
    flickerTime.current += delta;
    if (flickerLightRef.current) {
      const flicker = Math.sin(flickerTime.current * 20) * 0.15 + 0.85;
      flickerLightRef.current.intensity = 2.2 * flicker;
    }
  });

  return (
    <>
      {/* Global dark-but-visible lighting preset */}
      {/* Baseline ambient - provides minimum visibility everywhere */}
      <ambientLight intensity={0.35} color="#505060" />
      
      {/* Hemisphere light - subtle sky/ground gradient for depth */}
      <hemisphereLight 
        color="#606070" 
        groundColor="#303035" 
        intensity={0.5} 
      />
      
      {/* Key directional light - main illumination source */}
      <directionalLight 
        position={[8, 12, 6]} 
        intensity={0.8} 
        color="#b8b8c8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      
      {/* Fill light - softens shadows without washing out scene */}
      <directionalLight 
        position={[-5, 8, -4]} 
        intensity={0.3} 
        color="#7a7a88"
      />

      {/* Cafeteria area */}
      <group position={[0, 0, 5]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#484850" roughness={0.85} metalness={0.05} />
        </mesh>
        
        {/* Walls */}
        <mesh position={[0, 2, -6]} receiveShadow>
          <boxGeometry args={[12, 4, 0.3]} />
          <meshStandardMaterial color="#585860" roughness={0.75} />
        </mesh>
        <mesh position={[-6, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 12]} />
          <meshStandardMaterial color="#585860" roughness={0.75} />
        </mesh>
        <mesh position={[6, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 12]} />
          <meshStandardMaterial color="#585860" roughness={0.75} />
        </mesh>

        {/* Cafeteria tables */}
        <mesh position={[-2, 0.4, 3]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#686870" roughness={0.65} />
        </mesh>
        <mesh position={[2, 0.4, 3]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#686870" roughness={0.65} />
        </mesh>

        {/* Counter */}
        <mesh position={[0, 0.5, 8]} castShadow>
          <boxGeometry args={[8, 1, 1.5]} />
          <meshStandardMaterial color="#585860" roughness={0.6} />
        </mesh>

        {/* Cafeteria practical light - subtle overhead */}
        <pointLight
          position={[0, 3.5, 3]}
          intensity={1.5}
          distance={14}
          color="#d8d8e0"
          decay={2}
        />
      </group>

      {/* Corridor */}
      <group position={[0, 0, -5]}>
        {/* Floor */}
        <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 20]} />
          <meshStandardMaterial color="#444448" roughness={0.85} metalness={0.05} />
        </mesh>
        
        {/* Walls */}
        <mesh position={[-2, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 20]} />
          <meshStandardMaterial color="#545458" roughness={0.75} />
        </mesh>
        <mesh position={[2, 2, 0]} receiveShadow>
          <boxGeometry args={[0.3, 4, 20]} />
          <meshStandardMaterial color="#545458" roughness={0.75} />
        </mesh>

        {/* Lockers (hide spot) */}
        <mesh position={[-1.5, 1, -5]} castShadow userData={{ type: 'hidespot', id: 'locker1' }}>
          <boxGeometry args={[0.8, 2, 0.6]} />
          <meshStandardMaterial color="#686870" roughness={0.6} metalness={0.25} />
        </mesh>

        {/* Barricadable door */}
        <mesh position={[0, 1, -12]} castShadow userData={{ type: 'door', id: 'door1' }}>
          <boxGeometry args={[1.5, 2.5, 0.2]} />
          <meshStandardMaterial color="#786858" roughness={0.7} />
        </mesh>

        {/* Keycard on table - emissive for visibility */}
        <mesh position={[1, 0.6, -8]} castShadow userData={{ type: 'keycard', id: 'keycard1' }}>
          <boxGeometry args={[0.1, 0.15, 0.05]} />
          <meshStandardMaterial 
            color="#f4c894" 
            emissive="#e4b584" 
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Locked terminal/door at end */}
        <mesh position={[0, 1.2, -18]} castShadow userData={{ type: 'terminal', id: 'terminal1' }}>
          <boxGeometry args={[1, 1.5, 0.3]} />
          <meshStandardMaterial 
            color="#484850" 
            emissive="#686848" 
            emissiveIntensity={0.25}
            roughness={0.7}
          />
        </mesh>

        {/* Flickering corridor light - atmospheric practical */}
        <pointLight
          ref={flickerLightRef}
          position={[0, 2.8, -8]}
          intensity={2.2}
          distance={16}
          color="#f0e4c0"
          decay={2}
          castShadow
        />

        {/* Secondary corridor light - extends visibility */}
        <pointLight
          position={[0, 2.8, -16]}
          intensity={1.4}
          distance={12}
          color="#d8d0b8"
          decay={2}
        />
      </group>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 30]} />
        <meshStandardMaterial color="#383840" roughness={0.9} />
      </mesh>

      {/* Green Hood entity */}
      <GreenHoodEntity initialPosition={[4, 0, 8]} />
    </>
  );
}
