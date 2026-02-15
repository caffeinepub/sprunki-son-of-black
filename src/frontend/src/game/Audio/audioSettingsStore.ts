import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioSettings {
  volume: number;
  muted: boolean;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
}

export const useAudioSettings = create<AudioSettings>()(
  persist(
    (set) => ({
      volume: 70,
      muted: false,
      setVolume: (volume) => set({ volume }),
      setMuted: (muted) => set({ muted })
    }),
    {
      name: 'audio-settings'
    }
  )
);
