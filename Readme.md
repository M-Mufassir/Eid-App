# Eid Greeting Generator

A static frontend web app that creates personalized Eid greeting media using your photos, text, and themed templates.

## Features

- Mobile-responsive UI with modern Eid styling
- Upload 1 to 3 personal photos
- Add sender name (for example: `From Mufassir & Family`)
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
- Animation styles:
  - Fade
  - Zoom
  - Slide
  - Animated particles, sparkles, and flowing ribbon overlays
  - Randomized text animation profiles for motion-rich output
- Export options:
  - PNG download
  - Animated GIF download (`gif.js`)
  - MP4 download (direct if supported, otherwise WebM capture + FFmpeg WASM conversion)
  - MP4 duration follows selected song duration, capped at 20 seconds with fade-out at the end when capped
- Optional music selection (tracks from `Eid - songs`)
- `Surprise Me` button randomizes template, layout, animation, and greeting mode

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

- Background templates are currently mapped to:
  - `Eid Photos/3.png`
  - `Eid Photos/5.jpg`
  - `Eid Photos/14.webp`
- Audio dropdown includes selected sample tracks from `Eid - songs`.
- You can swap assets by editing the arrays at the top of `script.js`:
  - `templates`
  - `audioTracks`

## Browser Notes

- GIF export requires internet access to load `gif.js` worker from CDN.
- MP4 conversion fallback requires internet access to load FFmpeg WASM core files from CDN.
- MP4 export may take longer on browsers that do not support direct MP4 recording (client-side FFmpeg conversion is used).
- Audio capture depends on browser support for `HTMLMediaElement.captureStream`.
- If audio capture is unsupported, MP4 export still works (video-only stream).
