import { Canvas } from '@react-three/fiber';
import { FacilityWorld } from './World/FacilityWorld';
import { PlayerController } from './Player/PlayerController';
import { SceneDirector } from './Scenes/SceneDirector';
import { HudShell } from '../ui/Hud/HudShell';
import { DialogueProvider } from './Dialogue/DialogueContext';
import { Suspense } from 'react';

export function GameView() {
  return (
    <DialogueProvider>
      <div className="relative w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 1.6, 0], fov: 75 }}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
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
