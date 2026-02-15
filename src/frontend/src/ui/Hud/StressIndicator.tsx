import { usePlayerState } from '../../game/State/usePlayerState';
import { Progress } from '@/components/ui/progress';

export function StressIndicator() {
  const { stress } = usePlayerState();
  const stressPercent = Math.min(100, stress);

  const getStressColor = () => {
    if (stress < 30) return 'oklch(var(--stress-low))';
    if (stress < 70) return 'oklch(var(--stress-medium))';
    return 'oklch(var(--stress-high))';
  };

  return (
    <div className="bg-black/70 border border-primary/30 rounded p-3 min-w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Stress
        </span>
        <span className="text-sm font-bold" style={{ color: getStressColor() }}>
          {stress}%
        </span>
      </div>
      <Progress 
        value={stressPercent} 
        className="h-2"
        style={{
          '--progress-background': getStressColor()
        } as React.CSSProperties}
      />
    </div>
  );
}
