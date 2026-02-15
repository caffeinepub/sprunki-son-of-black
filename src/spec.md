# Specification

## Summary
**Goal:** Make the facility environment in the 3D game scene visible (not fully black) while keeping the intended dark industrial-horror mood.

**Planned changes:**
- Adjust Three.js / React Three Fiber renderer settings (e.g., exposure/tone mapping/background) and scene lighting so cafeteria/corridor geometry is readable on load without brightening the aesthetic.
- Ensure full-screen overlays (hood vignette and FadeToBlack) do not unintentionally obscure gameplay during normal play by tuning default opacity/blend and keeping FadeToBlack inactive unless explicitly triggered.

**User-visible outcome:** When the game loads, players can clearly see the cafeteria and corridor in a dark, tense atmosphere, and overlays no longer make the screen appear black during normal gameplay (while scripted fades still work when triggered).
