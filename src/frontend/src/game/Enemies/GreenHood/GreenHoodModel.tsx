import { useRef } from 'react';
import * as THREE from 'three';

interface GreenHoodModelProps {
  hoodRevealed: boolean;
}

export function GreenHoodModel({ hoodRevealed }: GreenHoodModelProps) {
  return (
    <group position={[0, 1, 0]}>
      {/* Body */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial color="#1a3a1a" roughness={0.9} />
      </mesh>

      {/* Hood */}
      {!hoodRevealed && (
        <mesh position={[0, 0.5, 0]} castShadow>
          <coneGeometry args={[0.4, 0.6, 8]} />
          <meshStandardMaterial color="#0d2a0d" roughness={0.95} />
        </mesh>
      )}

      {/* Eyes - glowing */}
      <mesh position={[-0.1, 0.4, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={2}
        />
      </mesh>
      <mesh position={[0.1, 0.4, 0.25]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Mouth - revealed when hood falls */}
      {hoodRevealed && (
        <group position={[0, 0.2, 0.3]}>
          <mesh>
            <torusGeometry args={[0.15, 0.08, 8, 12]} />
            <meshStandardMaterial color="#4a3a2a" roughness={0.8} />
          </mesh>
          {/* Jagged teeth */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 0.15,
                  Math.sin(angle) * 0.15,
                  0
                ]}
                rotation={[0, 0, angle]}
              >
                <coneGeometry args={[0.02, 0.08, 3]} />
                <meshStandardMaterial color="#e8e8e8" />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Point light for eyes */}
      <pointLight position={[0, 0.4, 0.3]} intensity={0.5} distance={2} color="#ffff00" />
    </group>
  );
}
