# Specification

## Summary
**Goal:** Fix the black-screen rendering issue so the 3D facility scene is clearly visible during gameplay while keeping the intended dark industrial-horror mood.

**Planned changes:**
- Verify and adjust renderer configuration in `frontend/src/game/GameView.tsx` (tone mapping, exposure, and related render settings) to prevent the scene from rendering fully black by default.
- Verify lighting/material visibility in `frontend/src/game/World/FacilityWorld.tsx` so facility geometry renders visibly under normal gameplay conditions.
- Ensure UI overlays (hood vignette and fade-to-black) do not obscure the scene during normal play; confirm fade-to-black is inactive by default and only appears when explicitly triggered.
- Confirm the game Canvas remains fullscreen with no scrollbars on both desktop and mobile-sized viewports.

**User-visible outcome:** On load, players can see the 3D facility (floors/walls/props) on desktop and mobile; the vignette stays subtle, and fade-to-black only appears when triggered.
