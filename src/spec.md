# Specification

## Summary
**Goal:** Make the 3D game map view render fullscreen across desktop and mobile without introducing scrollbars, while keeping HUD overlays correctly positioned above the canvas.

**Planned changes:**
- Update the GameView (or equivalent) layout/CSS so the React Three Fiber Canvas container fills the viewport (100vw/100vh or equivalent) without letterboxing from parent sizing.
- Ensure root layout elements allow full-height rendering (e.g., html/body/app root set to 100% height) and prevent unintended overflow that causes scrollbars.
- Verify/adjust HUD overlay positioning/z-index so existing UI (stress indicator, settings button, dialogue box, mobile controls) remains correctly anchored on top of the fullscreen canvas.

**User-visible outcome:** The 3D scene fills the entire visible screen on desktop and mobile with no unwanted page scrollbars, and the HUD remains properly positioned over the fullscreen game view.
