# Specification

## Summary
**Goal:** Build a 3D game prototype vertical slice of *Sprunki: Son of Black*: a first-person horror experience in an industrial facility with mobile-friendly controls, The Green Hood antagonist AI, hood-fall stress mechanic, key survival interactions, scripted scenes, and persistent session state.

**Planned changes:**
- Create and apply a consistent gritty industrial/clinical horror UI theme (high-contrast warning colors; readable typography; jagged/pixel-horror treatment for threat text; avoid blue/purple primary styling).
- Render a playable **3D game** first-person facility scene (corridor + cafeteria) with realistic-leaning lighting, low ambience, flickering lights, and a persistent hood-shadow/vignette limited-vision effect.
- Add mobile-first controls (on-screen movement joystick, swipe/drag look, Interact button) with desktop fallback controls.
- Implement a bottom-screen dialogue/threat text box with queued/timed lines and an API for scripted + AI-triggered text; include specified lines (“You look... crunchy.”, “I will eat you whole,” “No skin left.”).
- Create The Green Hood as a stylized/cartoony 3D enemy (ragged dark green hood, glowing eyes, hidden vs revealed mouth state) that can move/animate.
- Implement The Green Hood AI state machine (idle/stare, patrol/search, chase) with proximity + line-of-sight considerations and chase escalation; trigger threat text via the dialogue system.
- Implement the hood-fall mechanic: mid-chase mouth reveal, detect if player looks within a short window, trigger rapid hood-cover reaction and stress penalty with clear HUD feedback; persist stress to backend.
- Add survival interactions: at least one hide spot (break detection), one barricadable door (delay pursuit), and one simple puzzle gate (keycard/code to unlock next area); persist minimal progression state.
- Add audio telegraphing: proximity-based low-frequency hum plus contextual mouth-smacking sound; provide mute/volume settings.
- Script and implement 3 scenes as a deterministic vertical slice: cafeteria first encounter (“You look... crunchy.”), corridor chase with mid-chase hood reveal + speed increase, and ending that shows “Eat you whole” then fades to black.
- Backend (single Motoko actor): persist and load structured game state (stress, progression flags, current scene/checkpoint) via query/update methods used by the frontend.
- Add and use required generated static images (dialogue box frame/background, mobile control icons, vignette overlay) under `frontend/public/assets/generated`.

**User-visible outcome:** Players can run a mobile-friendly 3D first-person horror prototype: explore a facility, experience scripted encounter/chase/ending scenes, evade The Green Hood using hiding/barricades/puzzle gating, see threat text in a styled dialogue box, hear proximity-based audio cues, and have stress/progression saved and reloaded.
