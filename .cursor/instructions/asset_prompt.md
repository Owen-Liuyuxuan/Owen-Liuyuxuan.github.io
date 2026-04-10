# 🎨 AI Asset Generation Prompts

This document contains prompts and reference descriptions for generating
the visual assets needed for the website. Use your preferred AI image
generation tool (Midjourney, DALL-E 3, Stable Diffusion, etc.).

---

## Asset 1: Pixel Avatar Sprite (REQUIRED)

**File**: `public/assets/sprites/avatar-pixel.png`
**Size**: 128×128 px (will also be displayed at 64×64 for companion)
**Format**: PNG with transparent background

### Prompt:
```
Pixel art portrait of a young Asian male researcher/engineer,
short black hair, wearing a dark hoodie with a small cyan circuit-board
pattern on the chest, friendly smile, slightly turned to the right,
clean pixel art style, 128x128 pixels, transparent background,
16-bit retro game character sprite, electric cyan and white highlights
on dark navy background accents, no anti-aliasing, crisp pixel edges
```

### Reference Style:
- Think "Stardew Valley" character portrait meets cyberpunk color scheme
- The character should feel approachable and nerdy
- Cyan glow highlights on hair edges or hoodie details
- Expression: confident, slightly smiling

### Variants Needed:
1. **Default** — neutral/smiling (used for hero + companion idle)
2. **Thinking** — hand on chin (optional, for narrator "loading" state)

---

## Asset 2: Favicon / Logo (REQUIRED)

**File**: `public/favicon.ico` + `public/favicon-32x32.png`
**Size**: 32×32 px and 16×16 px
**Format**: ICO + PNG

### Prompt:
```
Pixel art icon, 32x32 pixels, letter "O" or "YL" monogram,
electric cyan color on transparent background, retro game style,
clean pixel edges, glowing effect, suitable for browser favicon
```

### Alternative approach:
- Use a mini version of the avatar sprite (just the head, 32×32)
- Or a pixel-art robot/AI head icon in cyan

---

## Asset 3: Tab Category Icons (OPTIONAL)

**File**: `public/assets/sprites/icon-{name}.png`
**Size**: 32×32 px each
**Format**: PNG with transparent background

If you want custom pixel icons instead of emoji for the nav tabs:

### Prompts per icon:
```
Pixel art icon, 32x32 pixels, transparent background, clean edges,
electric cyan and white palette, retro 16-bit game style:

- icon-home.png:     "A small pixel house/base with a glowing cyan door"
- icon-quests.png:   "A pixel scroll/parchment with a checkmark seal"
- icon-arsenal.png:  "A pixel wrench crossed with a sword, cyan glow"
- icon-intel.png:    "A pixel radar dish with radiating signal waves"
- icon-fieldlog.png: "A pixel open book with a compass on top"
```

---

## Asset 4: Card Background Texture (OPTIONAL)

**File**: `public/assets/textures/card-noise.png`
**Size**: 256×256 px, tileable
**Format**: PNG

### Prompt:
```
Seamless tileable texture, very subtle noise/grain pattern,
dark navy blue (#111827), barely visible pixel grid lines in
cyan (#00d4ff) at 3% opacity, suitable for card background overlay,
256x256 pixels
```

### Alternative:
- Can be generated purely in CSS with a repeating radial-gradient
- Skip this asset if CSS-only background is sufficient

---

## Asset 5: Hero Banner / Scene Background (OPTIONAL — for extra flair)

**File**: `public/assets/scenes/hero-bg.png`
**Size**: 1920×400 px (or SVG)
**Format**: PNG with transparency or SVG

### Prompt:
```
Pixel art wide panoramic scene, 16-bit retro game style,
a futuristic cityscape at night with glowing cyan windows,
a small autonomous vehicle driving on the road,
dark navy sky with subtle stars, electric cyan and violet neon lights,
parallax-ready layered composition (foreground road, mid buildings, far sky),
1920x400 pixels, semi-transparent bottom edge fading to black
```

### Usage:
- Placed behind the HeroSection as a decorative banner
- Could implement subtle CSS parallax scroll effect
- If too complex, skip — the dot-grid background is sufficient

---

## Asset 6: Companion Speech Bubble Frame (OPTIONAL)

**File**: `public/assets/sprites/speech-bubble.png`
**Size**: 320×120 px (9-slice scalable)
**Format**: PNG with transparency

### Prompt:
```
Pixel art speech bubble frame, retro RPG dialog box style,
dark navy interior (#111827), cyan pixel border (#00d4ff),
small triangle pointer at bottom-right pointing down,
320x120 pixels, transparent outside, suitable for 9-slice scaling,
clean pixel edges, 2px border width
```

### Alternative:
- Can be implemented purely in CSS with border + pseudo-element triangle
- Pixel art version gives more authentic game feel

---

## Generation Tips

### For Midjourney:
- Add `--ar 1:1` for square assets, `--ar 16:3` for banner
- Add `--style raw` for cleaner pixel art
- Add `--no blur, anti-aliasing, smooth` to keep pixel edges crisp
- Upscale with nearest-neighbor (NOT bilinear) to maintain pixel sharpness

### For DALL-E 3:
- Be explicit about "no anti-aliasing, crisp pixel edges"
- Request transparent background explicitly
- May need post-processing to clean up edges

### For Stable Diffusion:
- Use a pixel-art LoRA/checkpoint (e.g., "pixel-art-xl")
- Set output resolution to exact target size
- Use img2img with a rough sketch for better control

### Post-Processing (all tools):
1. Open in any image editor (GIMP, Photoshop, Aseprite)
2. Scale down to target size using **nearest-neighbor** interpolation
3. Clean up any anti-aliased edges manually if needed
4. Export as PNG with transparency
5. Optimize with `pngquant` or `optipng` for smaller file size

---

## Asset Checklist

| # | Asset | Priority | Status |
|---|---|---|---|
| 1 | Pixel Avatar (default) | 🔴 Required | ⬜ TODO |
| 1b | Pixel Avatar (thinking) | 🟡 Nice-to-have | ⬜ TODO |
| 2 | Favicon | 🔴 Required | ⬜ TODO |
| 3 | Tab Icons (×5) | 🟢 Optional | ⬜ TODO |
| 4 | Card Texture | 🟢 Optional (CSS fallback) | ⬜ TODO |
| 5 | Hero Banner Scene | 🟢 Optional | ⬜ TODO |
| 6 | Speech Bubble Frame | 🟢 Optional (CSS fallback) | ⬜ TODO |