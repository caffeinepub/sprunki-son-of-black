import { Canvas } from '@react-three/fiber';
import { FacilityWorld } from './World/FacilityWorld';
import { PlayerController } from './Player/PlayerController';
import { SceneDirector } from './Scenes/SceneDirector';
import { HudShell } from '../ui/Hud/HudShell';
import { DialogueProvider } from './Dialogue/DialogueContext';
import { Suspense } from 'react';
import * as THREE from 'three';

export function GameView() {
  return (
    <DialogueProvider>
      <div className="relative w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 0], fov: 75 }}
          gl={{ 
            antialias: false, 
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            outputColorSpace: THREE.SRGBColorSpace
          }}
          scene={{ background: new THREE.Color('#0a0a0a') }}
        >
          <Suspense fallback={null}>
            <FacilityWorld />
            <PlayerController />
            <SceneDirector />
          </Suspense>
        </Canvas>
        <HudShell />
      </div>
    </DialogueProvider>
  );
}
