# Specification

## Summary
**Goal:** Replace the facility’s current lighting with a single global “dark-but-visible” preset so all areas remain readable while preserving an industrial horror mood.

**Planned changes:**
- Update `frontend/src/game/World/FacilityWorld.tsx` to use a consistent global lighting preset across the entire facility (corridor and cafeteria) that keeps floors, walls, and key props visible without becoming bright.
- Adjust renderer exposure/tone-mapping/clear color in `frontend/src/game/GameView.tsx` to avoid crushed blacks on load while keeping emissive elements from washing out and maintaining a dark background.
- Verify overlays do not undermine visibility by keeping the hood vignette subtle and ensuring FadeToBlack has no effect unless its `active` prop is explicitly enabled.

**User-visible outcome:** During normal gameplay, the facility stays dark and tense but remains clearly visible everywhere (no large pure-black areas), with stable rendering on load and non-intrusive overlays.
