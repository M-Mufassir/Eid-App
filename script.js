const templates = [
  { id: "moonlight-gold", label: "Moonlight Gold", src: "Eid Photos/3.png" },
  { id: "lantern-night", label: "Lantern Night", src: "Eid Photos/5.jpg" },
  { id: "royal-eid", label: "Royal Eid", src: "Eid Photos/14.webp" }
];

const audioTracks = [
  { id: "none", label: "No background music", src: "" },
  {
    id: "track-1",
    label: "Eid Song 1 (Built-in)",
    src: "Eid - songs/Eid Mubarak 2025 _ Maher Zain _ Mesut Kurtis - Eid Saeed _ Islamic Nasheed(MP3_160K).mp3"
  },
  {
    id: "track-2",
    label: "Eid Song 2 (Built-in)",
    src: "Eid - songs/Greetings Eid Mubarak song_ Harris j- Eid mubarak ft. Sujat Ali _ Iftekhar(MP3_160K).mp3"
  },
  {
    id: "track-3",
    label: "Eid Song 3 (Built-in)",
    src: "Eid - songs/Eid Mubarak Status Video _ Eid Mubarak song by Harris J _ _eidmubarak _statusvideo _shorts(MP3_160K).mp3"
  },
  {
    id: "track-4",
    label: "Eid Song 4 (Built-in)",
    src: "Eid - songs/Eid Mubarak status 2026_ Eid Al Fitr Status 2026 _Eid ul Fitr Status Video 2026_ Eid Whatsapp status(MP3_160K).mp3"
  }
];

const CUSTOM_AUDIO_ID = "custom-upload";
const GIF_EXPORT_ENABLED = false;

const greetings = [
  "Eid Mubarak. May this day bring peace, mercy, and blessings for your home.",
  "Wishing you and your loved ones a joyful and spiritually uplifting Eid.",
  "May Allah accept your prayers and fill your life with barakah this Eid.",
  "Eid Mubarak to you and your family. Stay happy, healthy, and grateful.",
  "Sending warm Eid wishes, heartfelt duas, and lots of sweet moments.",
  "May your Eid be bright with kindness, faith, and togetherness.",
  "Time for smiles, sweets, and family hugs. Eid Mubarak.",
  "Eid vibes only: good food, good hearts, and endless gratitude.",
  "From our family to yours, Eid Mubarak and many blessings.",
  "May this Eid open new doors of hope, joy, and success for you.",
  "Celebrate with faith, love, and generosity. Eid Mubarak.",
  "May your home shine with happiness today and always. Eid Mubarak."
];

const layoutSlots = {
  classic: {
    1: [{ x: 0.5, y: 0.38, size: 0.31, shape: "circle" }],
    2: [
      { x: 0.34, y: 0.35, size: 0.24, shape: "circle" },
      { x: 0.66, y: 0.35, size: 0.24, shape: "circle" }
    ],
    3: [
      { x: 0.27, y: 0.34, size: 0.2, shape: "circle" },
      { x: 0.5, y: 0.27, size: 0.2, shape: "circle" },
      { x: 0.73, y: 0.34, size: 0.2, shape: "circle" }
    ]
  },
  ribbon: {
    1: [{ x: 0.5, y: 0.35, size: 0.34, shape: "round" }],
    2: [
      { x: 0.3, y: 0.35, size: 0.26, shape: "round" },
      { x: 0.7, y: 0.35, size: 0.26, shape: "round" }
    ],
    3: [
      { x: 0.2, y: 0.35, size: 0.22, shape: "round" },
      { x: 0.5, y: 0.35, size: 0.22, shape: "round" },
      { x: 0.8, y: 0.35, size: 0.22, shape: "round" }
    ]
  },
  collage: {
    1: [{ x: 0.5, y: 0.37, size: 0.32, shape: "round" }],
    2: [
      { x: 0.38, y: 0.35, size: 0.24, shape: "round" },
      { x: 0.64, y: 0.42, size: 0.22, shape: "circle" }
    ],
    3: [
      { x: 0.28, y: 0.33, size: 0.2, shape: "round" },
      { x: 0.53, y: 0.28, size: 0.2, shape: "circle" },
      { x: 0.71, y: 0.43, size: 0.2, shape: "round" }
    ]
  }
};

const state = {
  selectedTemplateId: templates[0].id,
  selectedAudioId: "track-1",
  uploadedImageUrls: [],
  customAudioTrack: null,
  isAnimating: false,
  animationHandle: null,
  lastRenderData: null,
  audioDurationCache: new Map()
};

const exportConfig = {
  previewDurationMs: 2600,
  clipDurationMs: 4200,
  gifFps: 12,
  defaultVideoDurationMs: 20000,
  maxVideoDurationMs: 20000,
  videoFadeDurationMs: 1800,
  audioMetadataTimeoutMs: 7000
};

const el = {
  templateGrid: document.getElementById("templateGrid"),
  photoUpload: document.getElementById("photoUpload"),
  uploadList: document.getElementById("uploadList"),
  senderName: document.getElementById("senderName"),
  defaultGreeting: document.getElementById("defaultGreeting"),
  customGreeting: document.getElementById("customGreeting"),
  modeInputs: document.querySelectorAll('input[name="greetingMode"]'),
  layoutSelect: document.getElementById("layoutSelect"),
  animationSelect: document.getElementById("animationSelect"),
  audioSelect: document.getElementById("audioSelect"),
  customAudioUpload: document.getElementById("customAudioUpload"),
  audioPreview: document.getElementById("audioPreview"),
  generateBtn: document.getElementById("generateBtn"),
  surpriseBtn: document.getElementById("surpriseBtn"),
  downloadPngBtn: document.getElementById("downloadPngBtn"),
  downloadGifBtn: document.getElementById("downloadGifBtn"),
  downloadVideoBtn: document.getElementById("downloadVideoBtn"),
  statusMsg: document.getElementById("statusMsg"),
  canvas: document.getElementById("greetingCanvas")
};

const ctx = el.canvas.getContext("2d");

function pathToUrl(path) {
  return encodeURI(path).replace(/#/g, "%23");
}

function getMediaSrc(src) {
  if (!src) {
    return "";
  }

  if (/^(blob:|data:|https?:)/i.test(src)) {
    return src;
  }

  return pathToUrl(src);
}

function setStatus(message, isError = false) {
  el.statusMsg.textContent = message;
  el.statusMsg.classList.toggle("error", isError);
}

function getSelectedMode() {
  return document.querySelector('input[name="greetingMode"]:checked')?.value || "random";
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createHashSeed(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let current = seed || 1;
  return () => {
    current = (current * 1664525 + 1013904223) >>> 0;
    return current / 4294967296;
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isValidDuration(durationSec) {
  return Number.isFinite(durationSec) && durationSec > 0;
}

function buildTextAnimation(seed) {
  const rand = createSeededRandom(seed);
  const styles = ["float", "pulse", "wave", "drift", "cinematic"];
  return {
    style: styles[Math.floor(rand() * styles.length)],
    speed: 0.7 + rand() * 1.6,
    ampX: 6 + rand() * 18,
    ampY: 5 + rand() * 16,
    rotationAmp: 0.004 + rand() * 0.02,
    scaleAmp: 0.01 + rand() * 0.045,
    alphaAmp: 0.06 + rand() * 0.18,
    glowAmp: 0.2 + rand() * 0.65,
    greetingPhase: rand() * Math.PI * 2,
    senderPhase: rand() * Math.PI * 2
  };
}

function getTextMotionFrame(textAnimation, timeSec, role = "greeting") {
  const phase = role === "sender" ? textAnimation.senderPhase : textAnimation.greetingPhase;
  const t = timeSec * textAnimation.speed + phase;

  const result = {
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    alpha: 1,
    glow: 0.45
  };

  switch (textAnimation.style) {
    case "float":
      result.x = Math.sin(t * 0.95) * textAnimation.ampX;
      result.y = Math.cos(t * 1.15) * textAnimation.ampY;
      result.rotation = Math.sin(t * 0.8) * textAnimation.rotationAmp;
      break;
    case "pulse":
      result.scale = 1 + Math.sin(t * 1.6) * textAnimation.scaleAmp;
      result.alpha = 0.92 + Math.sin(t * 1.2) * textAnimation.alphaAmp;
      result.y = Math.sin(t * 0.7) * textAnimation.ampY * 0.35;
      break;
    case "wave":
      result.x = Math.sin(t * 1.7) * textAnimation.ampX * 0.62;
      result.y = Math.sin(t * 2.2) * textAnimation.ampY * 0.72;
      result.rotation = Math.sin(t * 1.1) * textAnimation.rotationAmp * 1.3;
      break;
    case "drift":
      result.x = Math.sin(t * 0.55) * textAnimation.ampX * 1.2;
      result.y = Math.cos(t * 0.45) * textAnimation.ampY * 0.8;
      result.scale = 1 + Math.sin(t * 0.5) * textAnimation.scaleAmp * 0.8;
      break;
    case "cinematic":
      result.x = Math.sin(t * 0.9) * textAnimation.ampX * 0.45;
      result.y = Math.cos(t * 1.05) * textAnimation.ampY * 0.5;
      result.scale = 1 + Math.sin(t * 1.3) * textAnimation.scaleAmp;
      result.rotation = Math.sin(t * 0.65) * textAnimation.rotationAmp * 0.7;
      result.alpha = 0.92 + Math.sin(t * 1.4) * textAnimation.alphaAmp * 0.85;
      break;
    default:
      break;
  }

  result.alpha = clamp(result.alpha, 0.68, 1);
  result.glow = clamp(0.35 + (Math.sin(t * 1.4) + 1) * 0.5 * textAnimation.glowAmp, 0.2, 1);
  return result;
}

async function resolveAudioDurationMs(src) {
  if (!src) {
    return null;
  }

  if (state.audioDurationCache.has(src)) {
    return state.audioDurationCache.get(src);
  }

  const durationMs = await new Promise((resolve) => {
    const audio = new Audio();
    let timeoutId;

    const cleanup = () => {
      clearTimeout(timeoutId);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("error", onError);
    };

    const onLoaded = () => {
      cleanup();
      if (isValidDuration(audio.duration)) {
        resolve(Math.round(audio.duration * 1000));
        return;
      }
      resolve(null);
    };

    const onError = () => {
      cleanup();
      resolve(null);
    };

    timeoutId = setTimeout(() => {
      cleanup();
      resolve(null);
    }, exportConfig.audioMetadataTimeoutMs);

    audio.preload = "metadata";
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("error", onError);
    audio.src = pathToUrl(src);
  });

  state.audioDurationCache.set(src, durationMs);
  return durationMs;
}

function buildVideoTimingFromDurationMs(durationMs) {
  const boundedDurationMs = clamp(
    Math.round(durationMs),
    1000,
    exportConfig.maxVideoDurationMs
  );

  const wasCapped = durationMs > exportConfig.maxVideoDurationMs;
  return {
    clipDurationMs: boundedDurationMs,
    fadeOutStartMs: wasCapped
      ? Math.max(0, exportConfig.maxVideoDurationMs - exportConfig.videoFadeDurationMs)
      : null,
    wasCapped
  };
}

async function resolveVideoTiming(selectedTrack) {
  const fallback = {
    clipDurationMs: exportConfig.defaultVideoDurationMs,
    sourceDurationMs: null,
    fadeOutStartMs: null,
    wasCapped: false
  };

  if (!selectedTrack?.src) {
    return fallback;
  }

  const sourceDurationMs = await resolveAudioDurationMs(selectedTrack.src);
  if (!sourceDurationMs) {
    return fallback;
  }

  const timing = buildVideoTimingFromDurationMs(sourceDurationMs);
  return {
    clipDurationMs: timing.clipDurationMs,
    sourceDurationMs,
    fadeOutStartMs: timing.fadeOutStartMs,
    wasCapped: timing.wasCapped
  };
}

function getAnimationFrameState(animation, introEased, timeSec) {
  const breathe = Math.sin(timeSec * 1.15);
  const drift = Math.sin(timeSec * 0.72);
  const pulse = Math.sin(timeSec * 1.9);

  const state = {
    bgScale: 1,
    bgOffsetX: drift * 10,
    bgOffsetY: Math.cos(timeSec * 0.9) * 8,
    photoScale: 1 + pulse * 0.012,
    photoOffsetY: breathe * 6,
    textAlpha: introEased
  };

  if (animation === "zoom") {
    const loopScale = 1.015 + Math.sin(timeSec * 0.55) * 0.03;
    state.bgScale = (1.12 - introEased * 0.1) * loopScale;
    state.photoScale += Math.sin(timeSec * 1.25) * 0.02;
  } else if (animation === "slide") {
    state.bgOffsetY += (1 - introEased) * 70;
    state.photoOffsetY += (1 - introEased) * 80 + Math.sin(timeSec * 1.6) * 10;
    state.bgOffsetX += Math.sin(timeSec * 1.05) * 16;
  } else {
    // Fade style stays alive throughout the full clip, not only intro.
    state.textAlpha = clamp(introEased * (0.84 + (Math.sin(timeSec * 1.45) + 1) * 0.08), 0.45, 1);
    state.bgScale = 1.01 + Math.sin(timeSec * 0.68) * 0.012;
  }

  return state;
}

async function waitForMediaReady(mediaElement, timeoutMs = 7000) {
  if (mediaElement.readyState >= 2) {
    return;
  }

  await new Promise((resolve, reject) => {
    let timeoutId;

    const cleanup = () => {
      clearTimeout(timeoutId);
      mediaElement.removeEventListener("canplay", onReady);
      mediaElement.removeEventListener("error", onError);
    };

    const onReady = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("Unable to load selected audio track for video export."));
    };

    timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("Audio loading timed out. Try another track or check your connection."));
    }, timeoutMs);

    mediaElement.addEventListener("canplay", onReady);
    mediaElement.addEventListener("error", onError);
    mediaElement.load();
  });
}

async function prepareAudioForRecording(selectedTrack) {
  if (!selectedTrack?.src) {
    return {
      audioElement: null,
      audioTracks: [],
      hasAudioTrack: false,
      setLevel: () => undefined,
      cleanup: () => undefined
    };
  }

  const audioElement = new Audio(getMediaSrc(selectedTrack.src));
  audioElement.preload = "auto";
  await waitForMediaReady(audioElement, exportConfig.audioMetadataTimeoutMs);

  const AudioContextRef = window.AudioContext || window.webkitAudioContext;
  if (AudioContextRef) {
    try {
      const audioContext = new AudioContextRef();
      await audioContext.resume();

      const sourceNode = audioContext.createMediaElementSource(audioElement);
      const gainNode = audioContext.createGain();
      const destinationNode = audioContext.createMediaStreamDestination();

      sourceNode.connect(gainNode);
      gainNode.connect(destinationNode);

      const audioTracks = destinationNode.stream.getAudioTracks();
      return {
        audioElement,
        audioTracks,
        hasAudioTrack: audioTracks.length > 0,
        setLevel: (value) => {
          gainNode.gain.value = clamp(value, 0, 1);
        },
        cleanup: () => {
          sourceNode.disconnect();
          gainNode.disconnect();
          destinationNode.disconnect();
          audioContext.close();
        }
      };
    } catch (_error) {
      // Fallback to captureStream below.
    }
  }

  if (typeof audioElement.captureStream === "function") {
    const audioStream = audioElement.captureStream();
    const audioTracks = audioStream.getAudioTracks();
    return {
      audioElement,
      audioTracks,
      hasAudioTrack: audioTracks.length > 0,
      setLevel: (value) => {
        audioElement.volume = clamp(value, 0, 1);
      },
      cleanup: () => undefined
    };
  }

  return {
    audioElement,
    audioTracks: [],
    hasAudioTrack: false,
    setLevel: () => undefined,
    cleanup: () => undefined
  };
}

function getSelectedGreeting() {
  const mode = getSelectedMode();

  if (mode === "default") {
    return el.defaultGreeting.value || greetings[0];
  }

  if (mode === "custom") {
    const custom = el.customGreeting.value.trim();
    return custom || greetings[0];
  }

  return randomFrom(greetings);
}

function getSelectedTemplate() {
  return templates.find((item) => item.id === state.selectedTemplateId) || templates[0];
}

function getSelectedAudioTrack() {
  const selectedId = el.audioSelect.value || state.selectedAudioId;
  if (selectedId === CUSTOM_AUDIO_ID && state.customAudioTrack) {
    return state.customAudioTrack;
  }
  return audioTracks.find((item) => item.id === selectedId) || audioTracks[0];
}

function toTitleFileNames(fileList) {
  const names = fileList.map((file) => file.name);
  return names.join(" | ");
}

function clearUploadedUrls() {
  state.uploadedImageUrls.forEach((url) => URL.revokeObjectURL(url));
  state.uploadedImageUrls = [];
}

function clearCustomAudioTrack() {
  if (state.customAudioTrack?.src) {
    state.audioDurationCache.delete(state.customAudioTrack.src);
    URL.revokeObjectURL(state.customAudioTrack.src);
  }
  if (state.selectedAudioId === CUSTOM_AUDIO_ID) {
    state.selectedAudioId = "track-1";
  }
  state.customAudioTrack = null;
}

function updateUploadSummary(files) {
  if (!files.length) {
    el.uploadList.textContent = "No photos selected.";
    return;
  }
  el.uploadList.textContent = `${files.length} selected: ${toTitleFileNames(files)}`;
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${source}`));
    img.src = source;
  });
}

function fitCover(ctxArg, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const dx = x + (width - drawWidth) / 2;
  const dy = y + (height - drawHeight) / 2;
  ctxArg.drawImage(image, dx, dy, drawWidth, drawHeight);
}

function drawFramedPhoto(ctxArg, img, x, y, size, shape, alpha = 1) {
  const framePad = 12;
  const frameRadius = shape === "circle" ? (size + framePad * 2) / 2 : 34;

  ctxArg.save();
  ctxArg.globalAlpha = alpha;

  if (shape === "circle") {
    ctxArg.beginPath();
    ctxArg.arc(x + size / 2, y + size / 2, size / 2 + framePad, 0, Math.PI * 2);
    ctxArg.fillStyle = "rgba(241, 210, 136, 0.85)";
    ctxArg.fill();
  } else {
    drawRoundRect(ctxArg, x - framePad, y - framePad, size + framePad * 2, size + framePad * 2, frameRadius);
    ctxArg.fillStyle = "rgba(241, 210, 136, 0.86)";
    ctxArg.fill();
  }

  if (shape === "circle") {
    ctxArg.beginPath();
    ctxArg.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctxArg.clip();
  } else {
    drawRoundRect(ctxArg, x, y, size, size, 26);
    ctxArg.clip();
  }

  fitCover(ctxArg, img, x, y, size, size);
  ctxArg.restore();
}

function drawRoundRect(ctxArg, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctxArg.beginPath();
  ctxArg.moveTo(x + r, y);
  ctxArg.arcTo(x + width, y, x + width, y + height, r);
  ctxArg.arcTo(x + width, y + height, x, y + height, r);
  ctxArg.arcTo(x, y + height, x, y, r);
  ctxArg.arcTo(x, y, x + width, y, r);
  ctxArg.closePath();
}

function wrapText(ctxArg, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  words.forEach((word, index) => {
    const test = `${line}${word} `;
    const width = ctxArg.measureText(test).width;
    if (width > maxWidth && index > 0) {
      ctxArg.fillText(line.trim(), x, currentY);
      line = `${word} `;
      currentY += lineHeight;
      return;
    }
    line = test;
  });

  ctxArg.fillText(line.trim(), x, currentY);
  return currentY;
}

function buildDecorations(seed, width, height) {
  const rand = createSeededRandom(seed);
  const ribbonColors = ["#dcb667", "#f2dea8", "#98b7dd", "#9ed8c2", "#b49ee2"];

  const ribbons = Array.from({ length: 8 }, () => ({
    baseX: width * (0.08 + rand() * 0.84),
    width: 2 + rand() * 4,
    amplitude: 10 + rand() * 28,
    speed: 1.2 + rand() * 1.8,
    phase: rand() * Math.PI * 2,
    lengthScale: 0.66 + rand() * 0.24,
    color: ribbonColors[Math.floor(rand() * ribbonColors.length)]
  }));

  const particles = Array.from({ length: 95 }, () => ({
    baseX: rand() * width,
    baseY: rand() * height,
    radius: 1.1 + rand() * 3.6,
    speed: 0.08 + rand() * 0.26,
    drift: 4 + rand() * 36,
    phase: rand() * Math.PI * 2,
    swing: 0.9 + rand() * 2.2,
    twinkle: 1.3 + rand() * 3.4,
    alpha: 0.25 + rand() * 0.55
  }));

  const sparkles = Array.from({ length: 28 }, () => ({
    x: width * (0.04 + rand() * 0.92),
    y: height * (0.05 + rand() * 0.9),
    size: 2 + rand() * 4.8,
    pulseSpeed: 2 + rand() * 4,
    phase: rand() * Math.PI * 2
  }));

  return { ribbons, particles, sparkles };
}

function drawRibbonLayer(ctxArg, ribbons, timeSec, alpha, height) {
  ctxArg.save();
  ribbons.forEach((ribbon, index) => {
    const maxY = height * ribbon.lengthScale;
    const strokeAlpha = alpha * (0.44 + ((index % 3) * 0.1));
    ctxArg.globalAlpha = strokeAlpha;
    ctxArg.strokeStyle = ribbon.color;
    ctxArg.lineWidth = ribbon.width;
    ctxArg.beginPath();

    for (let y = -35, first = true; y <= maxY; y += 20) {
      const wave = Math.sin(timeSec * ribbon.speed + ribbon.phase + y * 0.02) * ribbon.amplitude;
      const x = ribbon.baseX + wave;
      if (first) {
        ctxArg.moveTo(x, y);
        first = false;
      } else {
        ctxArg.lineTo(x, y);
      }
    }
    ctxArg.stroke();

    ctxArg.globalAlpha = strokeAlpha * 0.45;
    ctxArg.strokeStyle = "#fff8d8";
    ctxArg.lineWidth = Math.max(1, ribbon.width * 0.38);
    ctxArg.stroke();
  });
  ctxArg.restore();
}

function drawParticleLayer(ctxArg, particles, timeSec, alpha, width, height) {
  ctxArg.save();
  ctxArg.globalCompositeOperation = "screen";

  particles.forEach((particle) => {
    const travel = (particle.baseY / height + timeSec * particle.speed) % 1;
    const y = height + 50 - travel * (height + 120);
    const x = particle.baseX + Math.sin(timeSec * particle.swing + particle.phase) * particle.drift;
    const twinkle = 0.45 + 0.55 * Math.sin(timeSec * particle.twinkle + particle.phase);

    if (x < -30 || x > width + 30) {
      return;
    }

    ctxArg.globalAlpha = alpha * particle.alpha * twinkle;
    ctxArg.fillStyle = "rgba(247, 233, 182, 0.95)";
    ctxArg.beginPath();
    ctxArg.arc(x, y, particle.radius, 0, Math.PI * 2);
    ctxArg.fill();
  });

  ctxArg.restore();
}

function drawSparkle(ctxArg, x, y, size, alpha) {
  ctxArg.save();
  ctxArg.translate(x, y);
  ctxArg.globalAlpha = alpha;
  ctxArg.strokeStyle = "rgba(245, 223, 170, 0.95)";
  ctxArg.lineWidth = 1.25;

  ctxArg.beginPath();
  ctxArg.moveTo(-size, 0);
  ctxArg.lineTo(size, 0);
  ctxArg.moveTo(0, -size);
  ctxArg.lineTo(0, size);
  ctxArg.stroke();

  ctxArg.rotate(Math.PI / 4);
  ctxArg.beginPath();
  ctxArg.moveTo(-size * 0.68, 0);
  ctxArg.lineTo(size * 0.68, 0);
  ctxArg.moveTo(0, -size * 0.68);
  ctxArg.lineTo(0, size * 0.68);
  ctxArg.stroke();
  ctxArg.restore();
}

function drawSparkleLayer(ctxArg, sparkles, timeSec, alpha) {
  sparkles.forEach((spark) => {
    const pulse = (Math.sin(timeSec * spark.pulseSpeed + spark.phase) + 1) / 2;
    if (pulse < 0.45) {
      return;
    }

    drawSparkle(ctxArg, spark.x, spark.y, spark.size * pulse, alpha * pulse * 0.8);
  });
}

function drawPatternDetails(ctxArg, progress, timeSec = 0) {
  const glow = 0.25 + progress * 0.75;

  ctxArg.save();
  ctxArg.globalAlpha = glow;

  ctxArg.fillStyle = "rgba(245, 223, 170, 0.88)";
  ctxArg.beginPath();
  ctxArg.arc(860, 150, 64, 0, Math.PI * 2);
  ctxArg.fill();

  ctxArg.globalCompositeOperation = "destination-out";
  ctxArg.beginPath();
  ctxArg.arc(888, 150, 56, 0, Math.PI * 2);
  ctxArg.fill();

  ctxArg.globalCompositeOperation = "source-over";
  ctxArg.strokeStyle = "rgba(245, 223, 170, 0.7)";
  ctxArg.lineWidth = 4;
  ctxArg.beginPath();
  const lanternSwing = Math.sin(timeSec * 1.5) * 8;
  ctxArg.moveTo(178, 62);
  ctxArg.lineTo(178 + lanternSwing * 0.2, 170);
  ctxArg.stroke();

  ctxArg.beginPath();
  ctxArg.arc(178 + lanternSwing, 196, 26, 0, Math.PI * 2);
  ctxArg.stroke();

  ctxArg.strokeStyle = "rgba(245, 223, 170, 0.48)";
  ctxArg.lineWidth = 2;
  for (let i = 0; i < 9; i += 1) {
    ctxArg.beginPath();
    ctxArg.moveTo(120 + i * 95, 965);
    ctxArg.lineTo(92 + i * 95, 1010);
    ctxArg.stroke();
  }

  ctxArg.restore();
}

function getEasedProgress(raw) {
  const t = Math.max(0, Math.min(1, raw));
  return 1 - Math.pow(1 - t, 3);
}

function getSlots(layout, imageCount) {
  const safeCount = Math.max(1, Math.min(3, imageCount));
  return layoutSlots[layout]?.[safeCount] || layoutSlots.classic[safeCount];
}

function getFrameFadeProgress(renderData, elapsedMs) {
  if (!Number.isFinite(renderData.fadeOutStartMs)) {
    return 0;
  }

  if (elapsedMs <= renderData.fadeOutStartMs) {
    return 0;
  }

  const fadeDuration = Math.max(1, renderData.clipDurationMs - renderData.fadeOutStartMs);
  return clamp((elapsedMs - renderData.fadeOutStartMs) / fadeDuration, 0, 1);
}

function drawGreetingCard(ctxArg, renderData, progress) {
  const timelineProgress = Math.max(0, Math.min(1, progress));
  const elapsedMs = renderData.clipDurationMs * timelineProgress;
  const timeSec = elapsedMs / 1000;
  const entranceProgress = Math.min(1, timelineProgress / 0.2);
  const eased = getEasedProgress(entranceProgress);
  const fadeProgress = getFrameFadeProgress(renderData, elapsedMs);
  const sceneOpacity = 1 - fadeProgress;
  const animationState = getAnimationFrameState(renderData.animation, eased, timeSec);
  const { canvasWidth, canvasHeight } = renderData;

  ctxArg.clearRect(0, 0, canvasWidth, canvasHeight);

  const bgScale = animationState.bgScale;
  const bgWidth = canvasWidth * bgScale;
  const bgHeight = canvasHeight * bgScale;
  const bgX = (canvasWidth - bgWidth) / 2 + animationState.bgOffsetX;
  const bgY = (canvasHeight - bgHeight) / 2 + animationState.bgOffsetY;
  fitCover(ctxArg, renderData.templateImage, bgX, bgY, bgWidth, bgHeight);

  const overlayGradient = ctxArg.createLinearGradient(0, 0, 0, canvasHeight);
  overlayGradient.addColorStop(0, "rgba(3, 15, 33, 0.2)");
  overlayGradient.addColorStop(0.65, "rgba(2, 13, 31, 0.35)");
  overlayGradient.addColorStop(1, "rgba(1, 8, 22, 0.72)");
  ctxArg.fillStyle = overlayGradient;
  ctxArg.fillRect(0, 0, canvasWidth, canvasHeight);

  drawRibbonLayer(ctxArg, renderData.decorations.ribbons, timeSec, 0.85 * sceneOpacity, canvasHeight);
  drawPatternDetails(ctxArg, eased, timeSec);
  drawParticleLayer(ctxArg, renderData.decorations.particles, timeSec, 0.52 * sceneOpacity, canvasWidth, canvasHeight);

  const textAlpha = animationState.textAlpha * sceneOpacity;
  const slideOffset = animationState.photoOffsetY;
  const photoScale = animationState.photoScale;

  const slots = getSlots(renderData.layout, renderData.userImages.length);

  slots.forEach((slot, index) => {
    const userImage = renderData.userImages[index];
    if (!userImage) {
      return;
    }

    const size = slot.size * canvasWidth * photoScale;
    const x = slot.x * canvasWidth - size / 2;
    const y = slot.y * canvasHeight - size / 2 + slideOffset;

    drawFramedPhoto(ctxArg, userImage, x, y, size, slot.shape, sceneOpacity);
  });

  const greetingMotion = getTextMotionFrame(renderData.textAnimation, timeSec, "greeting");
  const senderMotion = getTextMotionFrame(renderData.textAnimation, timeSec, "sender");
  const greetingBaseY = 720 + slideOffset * 0.45 + greetingMotion.y;

  ctxArg.save();
  ctxArg.globalAlpha = textAlpha * greetingMotion.alpha;
  ctxArg.translate(canvasWidth / 2 + greetingMotion.x, greetingBaseY);
  ctxArg.rotate(greetingMotion.rotation);
  ctxArg.scale(greetingMotion.scale, greetingMotion.scale);
  ctxArg.textAlign = "center";
  ctxArg.fillStyle = "#f7f2e6";
  ctxArg.font = "700 62px Cairo, sans-serif";
  ctxArg.shadowColor = `rgba(243, 219, 158, ${0.22 + greetingMotion.glow * 0.4})`;
  ctxArg.shadowBlur = 12 + greetingMotion.glow * 16;

  const wrappedEndY = wrapText(ctxArg, renderData.greeting, 0, 0, 850, 68);
  ctxArg.restore();

  const senderBaseY = greetingBaseY + wrappedEndY * greetingMotion.scale + 88 + senderMotion.y;
  ctxArg.save();
  ctxArg.globalAlpha = textAlpha * senderMotion.alpha;
  ctxArg.translate(canvasWidth / 2 + senderMotion.x, senderBaseY);
  ctxArg.rotate(senderMotion.rotation * 0.9);
  ctxArg.scale(senderMotion.scale, senderMotion.scale);
  ctxArg.textAlign = "center";
  ctxArg.fillStyle = "#dcb667";
  ctxArg.font = "700 44px Cinzel, serif";
  ctxArg.shadowColor = `rgba(220, 182, 103, ${0.2 + senderMotion.glow * 0.3})`;
  ctxArg.shadowBlur = 8 + senderMotion.glow * 12;
  ctxArg.fillText(renderData.sender, 0, 0);
  ctxArg.restore();

  drawSparkleLayer(ctxArg, renderData.decorations.sparkles, timeSec, 0.92 * sceneOpacity);

  if (fadeProgress > 0) {
    ctxArg.save();
    ctxArg.globalAlpha = clamp(fadeProgress * 1.1, 0, 1);
    const fadeGradient = ctxArg.createLinearGradient(0, 0, 0, canvasHeight);
    fadeGradient.addColorStop(0, "rgba(4, 12, 24, 0.55)");
    fadeGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    ctxArg.fillStyle = fadeGradient;
    ctxArg.fillRect(0, 0, canvasWidth, canvasHeight);
    ctxArg.restore();
  }
}

function toggleGreetingInputs() {
  const mode = getSelectedMode();
  el.defaultGreeting.disabled = mode !== "default";
  el.customGreeting.disabled = mode !== "custom";
}

function populateTemplates() {
  el.templateGrid.innerHTML = "";

  templates.forEach((template) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-card";
    button.dataset.templateId = template.id;
    button.innerHTML = `
      <img src="${pathToUrl(template.src)}" alt="${template.label}" loading="lazy" />
      <span>${template.label}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedTemplateId = template.id;
      markSelectedTemplate();
    });

    el.templateGrid.appendChild(button);
  });

  markSelectedTemplate();
}

function markSelectedTemplate() {
  el.templateGrid.querySelectorAll(".template-card").forEach((card) => {
    const isActive = card.dataset.templateId === state.selectedTemplateId;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-selected", String(isActive));
  });
}

function populateGreetingDropdown() {
  el.defaultGreeting.innerHTML = "";
  greetings.forEach((line) => {
    const option = document.createElement("option");
    option.value = line;
    option.textContent = line;
    el.defaultGreeting.appendChild(option);
  });
}

function populateAudioDropdown() {
  el.audioSelect.innerHTML = "";

  audioTracks.forEach((track) => {
    const option = document.createElement("option");
    option.value = track.id;
    option.textContent = track.label;
    el.audioSelect.appendChild(option);
  });

  if (state.customAudioTrack) {
    const customOption = document.createElement("option");
    customOption.value = CUSTOM_AUDIO_ID;
    customOption.textContent = state.customAudioTrack.label;
    el.audioSelect.appendChild(customOption);
  }

  const hasPreferred = Array.from(el.audioSelect.options).some((option) => option.value === state.selectedAudioId);
  if (hasPreferred) {
    el.audioSelect.value = state.selectedAudioId;
  } else if (el.audioSelect.options.length > 0) {
    el.audioSelect.value = el.audioSelect.options[0].value;
    state.selectedAudioId = el.audioSelect.value;
  }
}

function upsertCustomAudioOption() {
  const existing = el.audioSelect.querySelector(`option[value="${CUSTOM_AUDIO_ID}"]`);
  if (!state.customAudioTrack) {
    if (existing) {
      existing.remove();
    }
    return;
  }

  if (existing) {
    existing.textContent = state.customAudioTrack.label;
    return;
  }

  const option = document.createElement("option");
  option.value = CUSTOM_AUDIO_ID;
  option.textContent = state.customAudioTrack.label;
  el.audioSelect.appendChild(option);
}

function prepareAudioPreview() {
  const track = getSelectedAudioTrack();

  if (!track.src) {
    el.audioPreview.pause();
    el.audioPreview.removeAttribute("src");
    el.audioPreview.load();
    return;
  }

  const resolvedSrc = getMediaSrc(track.src);
  el.audioPreview.src = resolvedSrc;
  el.audioPreview.load();
  resolveAudioDurationMs(track.src).catch(() => null);
}

function onCustomAudioUploadChange() {
  const file = el.customAudioUpload.files?.[0];
  if (!file) {
    return;
  }

  if (!file.type.startsWith("audio/")) {
    setStatus("Please upload a valid audio file.", true);
    el.customAudioUpload.value = "";
    return;
  }

  clearCustomAudioTrack();
  const objectUrl = URL.createObjectURL(file);
  state.customAudioTrack = {
    id: CUSTOM_AUDIO_ID,
    label: `Custom: ${file.name}`,
    src: objectUrl
  };
  upsertCustomAudioOption();
  el.audioSelect.value = CUSTOM_AUDIO_ID;
  state.selectedAudioId = CUSTOM_AUDIO_ID;
  prepareAudioPreview();
  setStatus("Custom background audio added.");
}

function onAudioSelectionChange() {
  state.selectedAudioId = el.audioSelect.value || "none";
  prepareAudioPreview();
}

async function buildRenderData() {
  if (!state.uploadedImageUrls.length) {
    throw new Error("Please upload at least one photo before generating.");
  }

  const selectedTemplate = getSelectedTemplate();
  const templateImage = await loadImage(pathToUrl(selectedTemplate.src));
  const userImages = await Promise.all(state.uploadedImageUrls.map((url) => loadImage(url)));
  const greeting = getSelectedGreeting();
  const sender = el.senderName.value.trim() || "From Your Family";
  const layout = el.layoutSelect.value;
  const animation = el.animationSelect.value;
  const seedText = `${selectedTemplate.id}|${sender}|${greeting}|${layout}|${animation}`;
  const decorationSeed = createHashSeed(seedText);
  const textAnimationSeed = createHashSeed(`${seedText}|${Date.now()}|${Math.random()}`);
  const decorations = buildDecorations(decorationSeed, el.canvas.width, el.canvas.height);
  const textAnimation = buildTextAnimation(textAnimationSeed);

  return {
    templateImage,
    userImages,
    greeting,
    sender,
    layout,
    animation,
    decorations,
    textAnimation,
    clipDurationMs: exportConfig.clipDurationMs,
    fadeOutStartMs: null,
    canvasWidth: el.canvas.width,
    canvasHeight: el.canvas.height
  };
}

function enableDownloads(enable) {
  el.downloadPngBtn.disabled = !enable;
  el.downloadGifBtn.disabled = true;
  el.downloadVideoBtn.disabled = !enable;
}

async function animatePreview(renderData) {
  state.isAnimating = true;

  if (state.animationHandle) {
    cancelAnimationFrame(state.animationHandle);
    state.animationHandle = null;
  }

  const durationMs = exportConfig.previewDurationMs;
  const started = performance.now();

  return new Promise((resolve) => {
    const step = (time) => {
      const progress = Math.min(1, (time - started) / durationMs);
      drawGreetingCard(ctx, renderData, progress);

      if (progress < 1) {
        state.animationHandle = requestAnimationFrame(step);
        return;
      }

      state.lastRenderData = renderData;
      state.isAnimating = false;
      state.animationHandle = null;
      resolve();
    };

    state.animationHandle = requestAnimationFrame(step);
  });
}

function downloadBlob(blob, fileName) {
  if (!(blob instanceof Blob) || blob.size === 0) {
    throw new Error("Export failed: empty media file.");
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function downloadDataUrl(dataUrl, fileName) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = fileName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function isCanvasSecurityError(error) {
  const name = String(error?.name || "");
  const message = String(error?.message || "").toLowerCase();
  return name === "SecurityError" || message.includes("tainted") || message.includes("insecure");
}

async function exportCanvasPngBlob(canvas) {
  if (typeof canvas.toBlob === "function") {
    return await new Promise((resolve, reject) => {
      try {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("PNG encoder returned an empty blob."));
            return;
          }
          resolve(blob);
        }, "image/png");
      } catch (error) {
        reject(error);
      }
    });
  }

  // Fallback for browsers without canvas.toBlob support.
  try {
    const dataUrl = canvas.toDataURL("image/png");
    const response = await fetch(dataUrl);
    return await response.blob();
  } catch (error) {
    throw error;
  }
}

function timestampedName(extension) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `eid-greeting-${stamp}.${extension}`;
}

function getVideoExtensionFromMime(mimeType) {
  if (mimeType?.includes("mp4")) {
    return "mp4";
  }
  return "webm";
}

function getPreferredRecorderMime() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4;codecs=h264,aac",
    "video/mp4"
  ];

  return candidates.find((mime) => MediaRecorder.isTypeSupported(mime)) || "";
}

async function onGenerateClick() {
  if (state.isAnimating) {
    return false;
  }

  try {
    setStatus("Rendering greeting...");
    const renderData = await buildRenderData();
    prepareAudioPreview();

    if (el.audioPreview.src) {
      el.audioPreview.currentTime = 0;
      el.audioPreview.play().catch(() => undefined);
    }

    await animatePreview(renderData);
    enableDownloads(true);
    setStatus("Ready. Download PNG or Video. Video uses selected song length (up to 20s).");
    return true;
  } catch (error) {
    setStatus(error.message, true);
    return false;
  }
}

async function onDownloadPngClick() {
  try {
    if (!state.lastRenderData) {
      const isGenerated = await onGenerateClick();
      if (!isGenerated || !state.lastRenderData) {
        return;
      }
    }

    const fileName = timestampedName("png");
    let pngBlob;
    try {
      pngBlob = await exportCanvasPngBlob(el.canvas);
      downloadBlob(pngBlob, fileName);
    } catch (blobError) {
      if (!isCanvasSecurityError(blobError)) {
        throw blobError;
      }

      // Last chance fallback for strict browser policies.
      const dataUrl = el.canvas.toDataURL("image/png");
      downloadDataUrl(dataUrl, fileName);
    }

    setStatus("PNG downloaded.");
  } catch (error) {
    if (isCanvasSecurityError(error)) {
      setStatus("PNG export blocked by browser security. Run the app via a local server (e.g., npx serve .) instead of opening index.html directly.", true);
      return;
    }
    setStatus(error.message || "Failed to download PNG.", true);
  }
}

async function onDownloadGifClick() {
  if (!GIF_EXPORT_ENABLED) {
    setStatus("GIF export is unavailable in this offline/mobile-safe build. Use Download Video.", true);
    return;
  }
}

async function onDownloadVideoClick() {
  if (!("MediaRecorder" in window)) {
    setStatus("Video export is not supported in this browser.", true);
    return;
  }

  let recordedAudio = {
    audioElement: null,
    audioTracks: [],
    hasAudioTrack: false,
    setLevel: () => undefined,
    cleanup: () => undefined
  };

  try {
    if (!state.lastRenderData) {
      const isGenerated = await onGenerateClick();
      if (!isGenerated || !state.lastRenderData) {
        return;
      }
    }

    const selectedTrack = getSelectedAudioTrack();
    let videoTiming = await resolveVideoTiming(selectedTrack);
    const videoTextAnimation = buildTextAnimation(createHashSeed(`video-text|${Date.now()}|${Math.random()}`));

    const offscreen = document.createElement("canvas");
    offscreen.width = state.lastRenderData.canvasWidth;
    offscreen.height = state.lastRenderData.canvasHeight;
    const offCtx = offscreen.getContext("2d");

    const fps = 30;
    const stream = offscreen.captureStream(fps);
    const tracks = [...stream.getVideoTracks()];
    recordedAudio = await prepareAudioForRecording(selectedTrack);
    const { audioElement } = recordedAudio;
    recordedAudio.audioTracks.forEach((track) => tracks.push(track));

    // If metadata lookup failed earlier, use actual loaded audio duration when available.
    if (
      selectedTrack.src &&
      !videoTiming.sourceDurationMs &&
      audioElement &&
      isValidDuration(audioElement.duration)
    ) {
      const derivedDurationMs = Math.round(audioElement.duration * 1000);
      const derivedTiming = buildVideoTimingFromDurationMs(derivedDurationMs);
      videoTiming = {
        ...videoTiming,
        sourceDurationMs: derivedDurationMs,
        clipDurationMs: derivedTiming.clipDurationMs,
        fadeOutStartMs: derivedTiming.fadeOutStartMs,
        wasCapped: derivedTiming.wasCapped
      };
    }

    const renderData = {
      ...state.lastRenderData,
      clipDurationMs: videoTiming.clipDurationMs,
      fadeOutStartMs: videoTiming.fadeOutStartMs,
      textAnimation: videoTextAnimation
    };

    if (videoTiming.wasCapped) {
      setStatus("Song is longer than 20s. Video will fade out and end at 20 seconds.");
    }

    const mixedStream = new MediaStream(tracks);
    const chosenMimeType = getPreferredRecorderMime();
    if (!chosenMimeType) {
      throw new Error("No supported video codec found for MediaRecorder.");
    }
    const recorder = new MediaRecorder(mixedStream, { mimeType: chosenMimeType });

    const chunks = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const stopped = new Promise((resolve) => {
      recorder.onstop = () => resolve();
    });

    if (chosenMimeType.startsWith("video/mp4")) {
      setStatus("Recording MP4 video...");
    } else {
      setStatus("Recording WebM video...");
    }
    recorder.start();

    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(() => undefined);
    }

    const durationMs = renderData.clipDurationMs;
    const started = performance.now();

    await new Promise((resolve) => {
      const step = (time) => {
        const elapsedMs = time - started;
        const progress = Math.min(1, elapsedMs / durationMs);
        drawGreetingCard(offCtx, renderData, progress);

        if (audioElement && Number.isFinite(videoTiming.fadeOutStartMs)) {
          if (elapsedMs >= videoTiming.fadeOutStartMs) {
            const fadeWindow = Math.max(1, durationMs - videoTiming.fadeOutStartMs);
            const fadeRatio = clamp((elapsedMs - videoTiming.fadeOutStartMs) / fadeWindow, 0, 1);
            recordedAudio.setLevel(1 - fadeRatio);
          } else {
            recordedAudio.setLevel(1);
          }
        }

        if (progress < 1) {
          requestAnimationFrame(step);
          return;
        }

        resolve();
      };

      requestAnimationFrame(step);
    });

    await new Promise((resolve) => setTimeout(resolve, 120));
    recorder.stop();
    await stopped;

    if (audioElement) {
      audioElement.pause();
      recordedAudio.setLevel(1);
    }

    const extension = getVideoExtensionFromMime(chosenMimeType);
    const recordedBlob = new Blob(chunks, { type: chosenMimeType });
    downloadBlob(recordedBlob, timestampedName(extension));

    const label = extension.toUpperCase();
    if (selectedTrack.src && !recordedAudio.hasAudioTrack) {
      setStatus(`${label} downloaded. Audio capture was unavailable in this browser.`);
    } else if (videoTiming.wasCapped) {
      setStatus(`${label} downloaded. Video ended with fade at 20 seconds.`);
    } else {
      setStatus(`${label} downloaded.`);
    }
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    try {
      if (recordedAudio.audioElement) {
        recordedAudio.audioElement.pause();
        recordedAudio.setLevel(1);
      }
      recordedAudio.cleanup();
    } catch (_cleanupError) {
      // Ignore cleanup errors.
    }
  }
}

function randomizeSelection(selectElement) {
  const options = Array.from(selectElement.options);
  const chosen = randomFrom(options);
  selectElement.value = chosen.value;
}

async function onSurpriseClick() {
  if (state.isAnimating) {
    return;
  }

  state.selectedTemplateId = randomFrom(templates).id;
  markSelectedTemplate();

  randomizeSelection(el.layoutSelect);
  randomizeSelection(el.animationSelect);

  const randomMode = document.querySelector('input[name="greetingMode"][value="random"]');
  if (randomMode) {
    randomMode.checked = true;
    toggleGreetingInputs();
  }

  setStatus("Surprise options picked. Rendering...");
  await onGenerateClick();
}

function bindEvents() {
  el.photoUpload.addEventListener("change", () => {
    const files = Array.from(el.photoUpload.files || []).slice(0, 3);

    if ((el.photoUpload.files || []).length > 3) {
      setStatus("Only the first 3 photos are used.");
    }

    clearUploadedUrls();
    state.uploadedImageUrls = files.map((file) => URL.createObjectURL(file));
    updateUploadSummary(files);
    enableDownloads(false);
  });

  el.modeInputs.forEach((input) => {
    input.addEventListener("change", toggleGreetingInputs);
  });

  el.audioSelect.addEventListener("change", onAudioSelectionChange);
  el.customAudioUpload.addEventListener("change", onCustomAudioUploadChange);
  el.audioPreview.addEventListener("error", () => {
    setStatus("Selected audio could not be loaded (404/path issue). Choose another built-in song or upload your own.", true);
  });
  el.generateBtn.addEventListener("click", onGenerateClick);
  el.surpriseBtn.addEventListener("click", onSurpriseClick);
  el.downloadPngBtn.addEventListener("click", onDownloadPngClick);
  el.downloadGifBtn.addEventListener("click", onDownloadGifClick);
  el.downloadVideoBtn.addEventListener("click", onDownloadVideoClick);

  window.addEventListener("beforeunload", () => {
    clearUploadedUrls();
    clearCustomAudioTrack();
  });
}

function drawInitialCanvas() {
  const gradient = ctx.createLinearGradient(0, 0, 0, el.canvas.height);
  gradient.addColorStop(0, "#0e305a");
  gradient.addColorStop(1, "#071f3d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, el.canvas.width, el.canvas.height);

  ctx.fillStyle = "rgba(244, 217, 151, 0.9)";
  ctx.font = "700 62px Cinzel, serif";
  ctx.textAlign = "center";
  ctx.fillText("Eid Greeting Generator", el.canvas.width / 2, 430);

  ctx.font = "600 42px Cairo, sans-serif";
  ctx.fillStyle = "rgba(247, 242, 230, 0.95)";
  ctx.fillText("Upload photos and click Generate", el.canvas.width / 2, 520);

  drawPatternDetails(ctx, 1);
}

function init() {
  populateTemplates();
  populateGreetingDropdown();
  populateAudioDropdown();
  bindEvents();
  toggleGreetingInputs();
  prepareAudioPreview();
  drawInitialCanvas();
  enableDownloads(false);
}

init();
