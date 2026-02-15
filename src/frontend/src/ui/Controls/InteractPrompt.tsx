import { useState, useEffect } from 'react';

export function InteractPrompt() {
  const [prompt, setPrompt] = useState<string | null>(null);

  // This would be connected to the interaction system
  // For now, it's a placeholder
  useEffect(() => {
    // Example: setPrompt("Press E to Hide");
  }, []);

  if (!prompt) return null;

  return (
    <div className="bg-black/80 border border-primary/50 rounded px-4 py-2">
      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
        {prompt}
      </p>
    </div>
  );
}
