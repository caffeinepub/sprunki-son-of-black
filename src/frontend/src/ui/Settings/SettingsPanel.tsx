import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAudioSettings } from '../../game/Audio/audioSettingsStore';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { volume, muted, setVolume, setMuted } = useAudioSettings();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="volume" className="text-sm font-semibold">
              Master Volume
            </Label>
            <Slider
              id="volume"
              min={0}
              max={100}
              step={1}
              value={[volume]}
              onValueChange={([v]) => setVolume(v)}
              disabled={muted}
              className="w-full"
            />
            <span className="text-xs text-muted-foreground">{volume}%</span>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="mute" className="text-sm font-semibold">
              Mute Audio
            </Label>
            <Switch
              id="mute"
              checked={muted}
              onCheckedChange={setMuted}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
