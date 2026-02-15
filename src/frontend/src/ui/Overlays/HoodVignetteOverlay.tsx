export function HoodVignetteOverlay() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-10"
      style={{
        backgroundImage: 'url(/assets/generated/hood-vignette-overlay.dim_1024x1024.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: 'multiply',
        opacity: 0.4
      }}
    />
  );
}
