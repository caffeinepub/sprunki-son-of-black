import { DialogueBox } from '../Dialogue/DialogueBox';
import { StressIndicator } from './StressIndicator';
import { MobileJoystick } from '../Controls/MobileJoystick';
import { InteractButton } from '../Controls/InteractButton';
import { InteractPrompt } from '../Controls/InteractPrompt';
import { SettingsPanel } from '../Settings/SettingsPanel';
import { HoodVignetteOverlay } from '../Overlays/HoodVignetteOverlay';
import { FadeToBlack } from '../Overlays/FadeToBlack';
import { useInputMode } from '../../game/Input/useInputMode';
import { Settings } from 'lucide-react';
import { useState } from 'react';

export function HudShell() {
  const { isTouchDevice } = useInputMode();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fadeActive, setFadeActive] = useState(false);

  return (
    <>
      <HoodVignetteOverlay />
      
      <div className="absolute inset-0 pointer-events-none">
        {/* Top HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
          <StressIndicator />
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 bg-black/50 rounded border border-primary/30 hover:bg-black/70 transition-colors"
          >
            <Settings className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* Mobile controls */}
        {isTouchDevice && (
          <>
            <div className="absolute bottom-24 left-4 pointer-events-auto">
              <MobileJoystick />
            </div>
            <div className="absolute bottom-24 right-4 pointer-events-auto">
              <InteractButton />
            </div>
          </>
        )}

        {/* Interact prompt */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <InteractPrompt />
        </div>

        {/* Dialogue box at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-auto">
          <DialogueBox />
        </div>
      </div>

      <FadeToBlack active={fadeActive} />
      <SettingsPanel open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
