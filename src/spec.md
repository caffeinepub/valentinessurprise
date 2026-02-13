# Specification

## Summary
**Goal:** Make the `ValentinesSurprise` CTA click feel more “interesting” and “lovely” by adding a clear Valentine-themed delight interaction, while keeping the existing audio-play fallback behavior intact.

**Planned changes:**
- Add a noticeable Valentine-themed animation on “Forever Yours ❤️” click (e.g., floating hearts burst/confetti-style effect).
- Reveal an additional romantic message via a smooth animated UI reveal on click (English text only).
- Ensure the click interaction is safe to repeat (cap/cleanup animation elements and timers; no console/runtime errors) while preserving the existing audio start attempt when autoplay was blocked.

**User-visible outcome:** Clicking “Forever Yours ❤️” triggers a charming Valentine surprise (hearts/confetti and an extra love note) and still attempts to start the existing music playback when needed.
