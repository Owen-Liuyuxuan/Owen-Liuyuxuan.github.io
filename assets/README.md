# Public Assets Directory

Place your pixel art assets here before deploying.

## Required Assets (user to generate via AI)

1. **avatar-pixel.png** → `public/assets/sprites/avatar-pixel.png`
   - 128×128 px, PNG with transparent background
   - Pixel art portrait of a young Asian male researcher
   - Dark hoodie with cyan circuit-board pattern
   - Friendly smile, slightly turned right
   - 16-bit retro game character style
   - See `../.cursor/instructions/asset_prompt.md` for full prompt

2. **favicon.ico** + **favicon-32x32.png** → `public/favicon.ico` and `public/favicon-32x32.png`
   - 32×32 px, pixel art "O" or "YL" monogram
   - Electric cyan on transparent background
   - See `../.cursor/instructions/asset_prompt.md` for full prompt

## Optional Assets (can be CSS-only)

- `public/assets/sprites/icon-*.png` — custom pixel tab icons
- `public/assets/textures/card-noise.png` — card background texture
- `public/assets/scenes/hero-bg.png` — hero banner scene
- `public/assets/sprites/speech-bubble.png` — companion speech bubble frame

See `../.cursor/instructions/asset_prompt.md` for all prompts.

## CV PDF

Place your resume PDF at:
- `public/cv.pdf`

Or update `src/data/profile.ts` → `links` array to point to the correct URL.
