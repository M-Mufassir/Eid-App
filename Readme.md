# Eid Greeting Generator

A static frontend web app that creates personalized Eid greeting media using your photos, text, and themed templates.

## Features

- Mobile-responsive UI with modern Eid styling
- Upload 1 to 3 personal photos (JPG, JPEG, PNG, WEBP, AVIF, GIF, BMP, TIFF, HEIC/HEIF, SVG when browser supports decoding)
- Add sender name (for example: `From Mufassir & Family`)
- `Randomness ON` mode by default (only image + sender name needed)
  - Auto-randomizes template, greeting wish, animation style, and background song each generation
- Optional `Custom Design` mode via slider toggle to use manual controls
- Pick from 3 built-in Eid background templates (from `Eid Photos`)
- Greeting modes:
  - Random greeting
  - Pick from defaults
  - Custom text
- 12 predefined Eid greetings (formal, religious, and casual)
- Canvas-based composition with:
  - Background template
  - Framed user photos (circle or rounded)
  - Wrapped greeting text
  - Sender signature
  - Bottom-right creator watermark: `Created By Mufassir`
- Animation styles:
  - Fade
  - Zoom
  - Slide
  - Animated particles, sparkles, and flowing ribbon overlays
  - Randomized text animation profiles for motion-rich output
- Export options:
  - PNG download
  - GIF button intentionally disabled in this offline-safe build
  - Video download in browser-supported format (`.webm` or `.mp4`)
  - Video export prepares a `Download Rendered Video` button below preview
  - Preview/video duration follows `max(20 seconds, selected song length)`
  - Top-layer loading overlay includes a reactive circular countdown during video generation
- Optional music selection (tracks from `Eid - songs`)
- Built-in songs work directly without custom upload
- Upload your own custom background audio file (`audio/*`)
- `Surprise Me` button randomizes template, layout, animation, and greeting mode
- Upload pipeline handles mixed personal-image dimensions more safely (large images are downscaled for reliable rendering)

## Project Structure

```text
Eid-App/
  index.html
  style.css
  script.js
  Readme.md
  Eid Photos/
  Eid - songs/
```

## Run Locally

1. Open the project folder.
2. Start a static file server (recommended) from project root.

   Example with Node:

   ```bash
   npx serve .
   ```

3. Open the shown local URL (for example `http://localhost:3000`).

You can also open `index.html` directly, but a local server gives better compatibility for media loading.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open repository `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`:
   - Source: `Deploy from a branch`
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`
5. Save and wait for GitHub Pages to publish.
6. Open the generated Pages URL.

## Asset Notes

- Background templates are mapped to all available files in `Eid Photos/` (`1` to `16`).
- Audio dropdown includes selected sample tracks from `Eid - songs`.
- You can swap assets by editing the arrays at the top of `script.js`:
  - `templates`
  - `audioTracks`

## Browser Notes

- Audio capture depends on browser support for `HTMLMediaElement.captureStream`.
- If audio capture is unsupported, video export still works (video-only stream).
- If you see `404` for audio, choose a different built-in track or run from a local server (`npx serve .`) to avoid path/origin issues.
