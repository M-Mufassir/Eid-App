// ============================================================
//  Eid Video Studio – Full Decorations & Random Animations
//  Uses local assets: Eid Photos/ & Eid - songs/
//  Features: ribbons, particles, sparkles, lanterns
// ============================================================

// ---------- 1. Asset arrays ----------
const templates = [
  { id: "t1", label: "Golden Mosque", src: "Eid Photos/1.webp" },
  { id: "t2", label: "Starry Night", src: "Eid Photos/2.webp" },
  { id: "t3", label: "Crescent Moon", src: "Eid Photos/3.png" },
  { id: "t4", label: "Emerald Arch", src: "Eid Photos/4.avif" },
  { id: "t5", label: "Lantern Light", src: "Eid Photos/5.jpg" },
  { id: "t6", label: "Floral Eid", src: "Eid Photos/6.avif" },
  { id: "t7", label: "Dome Glow", src: "Eid Photos/7.avif" },
  { id: "t8", label: "Mosaic Art", src: "Eid Photos/8.avif" },
  { id: "t9", label: "Silk Road", src: "Eid Photos/9.png" },
  { id: "t10", label: "Desert Sunset", src: "Eid Photos/10.avif" },
  { id: "t11", label: "Pearl Mosque", src: "Eid Photos/11.avif" },
  { id: "t12", label: "Minaret", src: "Eid Photos/12.jpg" },
  { id: "t13", label: "Garden of Peace", src: "Eid Photos/13.avif" },
  { id: "t14", label: "Calligraphy", src: "Eid Photos/14.webp" },
  { id: "t15", label: "Eid Gifts", src: "Eid Photos/15.jpg" },
  { id: "t16", label: "Family Joy", src: "Eid Photos/16.jpg" }
];

const audioTracks = [
  { id: "a1", label: "Eid Song 1", src: "Eid - songs/Eid Song 1.mp3" },
  { id: "a2", label: "Eid Song 2", src: "Eid - songs/Eid Song 2.mp3" },
  { id: "a3", label: "Eid Song 3", src: "Eid - songs/Eid Song 3.mp3" },
  { id: "a4", label: "Eid Song 4", src: "Eid - songs/Eid Song 4.mp3" },
  { id: "a5", label: "Eid Song 5", src: "Eid - songs/Eid Song 5.mp3" },
  { id: "a6", label: "Eid Song 6", src: "Eid - songs/Eid Song 6.mp3" },
  { id: "a7", label: "Eid Song 7", src: "Eid - songs/Eid Song 7.mp3" },
  { id: "a8", label: "Eid Song 8", src: "Eid - songs/Eid Song 8.mp3" },
  { id: "a9", label: "Eid Song 9", src: "Eid - songs/Eid Song 9.mp3" },
  { id: "a10", label: "Eid Song 10", src: "Eid - songs/Eid Song 10.mp3" },
  { id: "a11", label: "Eid Song 11", src: "Eid - songs/Eid Song 11.mp3" },
  { id: "a12", label: "Eid Song 12", src: "Eid - songs/Eid Song 12.mp3" },
  { id: "a13", label: "Eid Song 13", src: "Eid - songs/Eid Song 13.mp3" },
  { id: "a14", label: "Eid Song 14", src: "Eid - songs/Eid Song 14.mp3" }
];

const greetings = [
  "Eid Mubarak! May your heart be as bright as the crescent moon.",
  "Wishing you peace, joy, and the warmth of loved ones this Eid.",
  "May Allah bless you with endless happiness and barakah.",
  "Eid Mubarak to you and your family. Stay blessed!",
  "Sending you warm Eid hugs and sweet memories.",
  "May this Eid bring you closer to your dreams.",
  "Celebrate with gratitude and love. Eid Mubarak!",
  "May your home be filled with laughter and light.",
  "Taqabbal Allahu minna wa minkum – Eid Mubarak!",
  "Enjoy the sweetness of Eid with your loved ones.",
  "A new day, a new hope. Eid Mubarak!",
  "May the spirit of Eid illuminate your life."
];

// ---------- 2. Layout definitions ----------
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

// ---------- 3. Animation Definitions (Modern) ----------
const animations = [
  {
    name: "Glide",
    getMotion: (t) => ({
      textX: Math.sin(t * 1.2) * 12,
      textY: Math.cos(t * 0.9) * 8,
      textScale: 1 + Math.sin(t * 1.5) * 0.02,
      textRotate: Math.sin(t * 0.7) * 0.02,
      photoY: Math.sin(t * 1.3) * 8,
      photoScale: 1 + Math.sin(t * 1.1) * 0.01
    })
  },
  {
    name: "Pulse",
    getMotion: (t) => ({
      textX: 0,
      textY: Math.sin(t * 2.2) * 6,
      textScale: 1 + Math.sin(t * 2.8) * 0.04,
      textRotate: 0,
      photoY: Math.sin(t * 1.8) * 5,
      photoScale: 1 + Math.sin(t * 2.4) * 0.02
    })
  },
  {
    name: "Ripple",
    getMotion: (t) => ({
      textX: Math.sin(t * 1.8) * 8,
      textY: Math.sin(t * 1.4) * 8,
      textScale: 1 + Math.sin(t * 2.0) * 0.03,
      textRotate: Math.sin(t * 1.2) * 0.015,
      photoY: Math.sin(t * 1.9) * 10,
      photoScale: 1 + Math.sin(t * 1.7) * 0.015
    })
  },
  {
    name: "Aurora",
    getMotion: (t) => ({
      textX: Math.sin(t * 0.6) * 15,
      textY: Math.cos(t * 0.5) * 12,
      textScale: 1 + Math.sin(t * 0.9) * 0.02,
      textRotate: Math.sin(t * 0.4) * 0.025,
      photoY: Math.sin(t * 0.8) * 12,
      photoScale: 1 + Math.sin(t * 0.7) * 0.018
    })
  },
  {
    name: "Orbit",
    getMotion: (t) => ({
      textX: Math.cos(t * 1.1) * 18,
      textY: Math.sin(t * 1.1) * 12,
      textScale: 1 + Math.sin(t * 1.4) * 0.025,
      textRotate: Math.sin(t * 0.9) * 0.03,
      photoY: Math.sin(t * 1.2) * 14,
      photoScale: 1 + Math.sin(t * 1.0) * 0.02
    })
  },
  {
    name: "Cinematic",
    getMotion: (t) => ({
      textX: Math.sin(t * 0.5) * 6,
      textY: Math.sin(t * 0.7) * 4,
      textScale: 1,
      textRotate: Math.sin(t * 0.3) * 0.008,
      photoY: Math.sin(t * 0.6) * 5,
      photoScale: 1 + Math.sin(t * 0.9) * 0.008
    })
  },
  {
    name: "Drift",
    getMotion: (t) => ({
      textX: Math.sin(t * 0.4) * 22,
      textY: Math.cos(t * 0.35) * 18,
      textScale: 1 + Math.sin(t * 0.5) * 0.015,
      textRotate: Math.sin(t * 0.2) * 0.012,
      photoY: Math.sin(t * 0.45) * 16,
      photoScale: 1 + Math.sin(t * 0.55) * 0.01
    })
  },
  {
    name: "Burst",
    getMotion: (t) => ({
      textX: Math.sin(t * 1.6) * 10,
      textY: Math.sin(t * 1.9) * 10,
      textScale: 1 + Math.sin(t * 2.2) * 0.05,
      textRotate: Math.sin(t * 1.7) * 0.025,
      photoY: Math.sin(t * 2.0) * 12,
      photoScale: 1 + Math.sin(t * 1.8) * 0.025
    })
  }
];

function getRandomAnimation() {
  return animations[Math.floor(Math.random() * animations.length)];
}

// ---------- 4. Decorative effects helpers ----------
function createSeededRandom(seed) {
  let current = seed;
  return () => {
    current = (current * 1664525 + 1013904223) >>> 0;
    return current / 4294967296;
  };
}

function createHashSeed(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
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

function drawRibbonLayer(ctx, ribbons, timeSec, alpha, height) {
  ctx.save();
  ribbons.forEach((ribbon, index) => {
    const maxY = height * ribbon.lengthScale;
    const strokeAlpha = alpha * (0.44 + ((index % 3) * 0.1));
    ctx.globalAlpha = strokeAlpha;
    ctx.strokeStyle = ribbon.color;
    ctx.lineWidth = ribbon.width;
    ctx.beginPath();

    for (let y = -35, first = true; y <= maxY; y += 20) {
      const wave = Math.sin(timeSec * ribbon.speed + ribbon.phase + y * 0.02) * ribbon.amplitude;
      const x = ribbon.baseX + wave;
      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.globalAlpha = strokeAlpha * 0.45;
    ctx.strokeStyle = "#fff8d8";
    ctx.lineWidth = Math.max(1, ribbon.width * 0.38);
    ctx.stroke();
  });
  ctx.restore();
}

function drawParticleLayer(ctx, particles, timeSec, alpha, width, height) {
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  particles.forEach((particle) => {
    const travel = (particle.baseY / height + timeSec * particle.speed) % 1;
    const y = height + 50 - travel * (height + 120);
    const x = particle.baseX + Math.sin(timeSec * particle.swing + particle.phase) * particle.drift;
    const twinkle = 0.45 + 0.55 * Math.sin(timeSec * particle.twinkle + particle.phase);

    if (x < -30 || x > width + 30) return;

    ctx.globalAlpha = alpha * particle.alpha * twinkle;
    ctx.fillStyle = "rgba(247, 233, 182, 0.95)";
    ctx.beginPath();
    ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
}

function drawSparkle(ctx, x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(245, 223, 170, 0.95)";
  ctx.lineWidth = 1.25;

  ctx.beginPath();
  ctx.moveTo(-size, 0);
  ctx.lineTo(size, 0);
  ctx.moveTo(0, -size);
  ctx.lineTo(0, size);
  ctx.stroke();

  ctx.rotate(Math.PI / 4);
  ctx.beginPath();
  ctx.moveTo(-size * 0.68, 0);
  ctx.lineTo(size * 0.68, 0);
  ctx.moveTo(0, -size * 0.68);
  ctx.lineTo(0, size * 0.68);
  ctx.stroke();
  ctx.restore();
}

function drawSparkleLayer(ctx, sparkles, timeSec, alpha) {
  sparkles.forEach((spark) => {
    const pulse = (Math.sin(timeSec * spark.pulseSpeed + spark.phase) + 1) / 2;
    if (pulse < 0.45) return;
    drawSparkle(ctx, spark.x, spark.y, spark.size * pulse, alpha * pulse * 0.8);
  });
}

function drawPatternDetails(ctx, progress, timeSec = 0) {
  const glow = 0.25 + progress * 0.75;

  ctx.save();
  ctx.globalAlpha = glow;

  ctx.fillStyle = "rgba(245, 223, 170, 0.88)";
  ctx.beginPath();
  ctx.arc(860, 150, 64, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(888, 150, 56, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = "rgba(245, 223, 170, 0.7)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  const lanternSwing = Math.sin(timeSec * 1.5) * 8;
  ctx.moveTo(178, 62);
  ctx.lineTo(178 + lanternSwing * 0.2, 170);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(178 + lanternSwing, 196, 26, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(245, 223, 170, 0.48)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo(120 + i * 95, 965);
    ctx.lineTo(92 + i * 95, 1010);
    ctx.stroke();
  }

  ctx.restore();
}

// ---------- 5. Global state ----------
let state = {
  selectedTemplateId: null,
  uploadedImages: [],
  customAudioTrack: null,
  isGenerating: false,
  canvas: null,
  ctx: null
};

let el = {};

// ---------- 6. Helper functions ----------
function setStatus(msg, isError = false) {
  if (!el.statusMsg) return;
  el.statusMsg.textContent = msg;
  el.statusMsg.classList.toggle("error", isError);
}

function showLoading(visible, message = "Generating video...") {
  if (!el.loadingOverlay) return;
  if (visible) {
    el.loadingOverlay.classList.add("active");
    if (el.loadingText) el.loadingText.textContent = message;
  } else {
    el.loadingOverlay.classList.remove("active");
  }
}

function updateCountdown(seconds, total) {
  if (!el.countdownNumber) return;
  const remaining = Math.max(0, seconds);
  const percent = 1 - (remaining / total);
  const circle = document.querySelector(".countdown-circle");
  if (circle) {
    circle.style.background = `conic-gradient(#dcb667 ${percent * 360}deg, rgba(244, 217, 151, 0.2) ${percent * 360}deg)`;
  }
  el.countdownNumber.textContent = Math.ceil(remaining);
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getSelectedMode() {
  return document.querySelector('input[name="greetingMode"]:checked')?.value || "random";
}

function isCustomEnabled() {
  return el.customModeToggle?.checked;
}

// ---------- 7. Image & audio loading ----------
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
    img.src = src;
  });
}

async function loadUserImages(files) {
  const images = [];
  for (const file of files) {
    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = URL.createObjectURL(file);
    });
    images.push(img);
  }
  return images;
}

async function getAudioDuration(src) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => {
      resolve(audio.duration ? Math.min(40000, audio.duration * 1000) : 20000);
    };
    audio.onerror = () => resolve(20000);
    audio.src = src;
  });
}

// ---------- 8. Drawing with cover cropping (no distortion) ----------
function drawCover(ctx, img, x, y, w, h) {
  const imgAspect = img.width / img.height;
  const targetAspect = w / h;
  let drawW, drawH, dx, dy;
  if (imgAspect > targetAspect) {
    drawH = h;
    drawW = img.width * (h / img.height);
    dx = x + (w - drawW) / 2;
    dy = y;
  } else {
    drawW = w;
    drawH = img.height * (w / img.width);
    dx = x;
    dy = y + (h - drawH) / 2;
  }
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + " ";
    if (ctx.measureText(test).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + " ";
      currentY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

function getEasedProgress(raw) {
  const t = Math.max(0, Math.min(1, raw));
  return 1 - Math.pow(1 - t, 3);
}

function drawGreetingCard(ctx, renderData, progress, animation) {
  const w = renderData.canvasWidth;
  const h = renderData.canvasHeight;
  const timeSec = progress * (renderData.clipDurationMs / 1000);
  const entranceProgress = Math.min(1, progress / 0.2);
  const eased = getEasedProgress(entranceProgress);

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(renderData.templateImage, 0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, w, h);

  // Decorative layers (ribbons, particles, sparkles, pattern)
  drawRibbonLayer(ctx, renderData.decorations.ribbons, timeSec, 0.85, h);
  drawPatternDetails(ctx, eased, timeSec);
  drawParticleLayer(ctx, renderData.decorations.particles, timeSec, 0.52, w, h);
  drawSparkleLayer(ctx, renderData.decorations.sparkles, timeSec, 0.92);

  // Get animation motion
  const t = progress * Math.PI * 2;
  const motion = animation.getMotion(t);
  const photoYoffset = motion.photoY;
  const photoScale = motion.photoScale;

  const slots = layoutSlots[renderData.layout]?.[Math.min(3, renderData.userImages.length)] || layoutSlots.classic[1];
  slots.forEach((slot, idx) => {
    const img = renderData.userImages[idx];
    if (!img) return;
    const size = slot.size * w * photoScale;
    const x = slot.x * w - size / 2;
    const y = slot.y * h - size / 2 + photoYoffset;

    // Frame
    ctx.save();
    if (slot.shape === "circle") {
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size / 2 + 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(241, 210, 136, 0.85)";
      ctx.fill();
    } else {
      drawRoundRect(ctx, x - 8, y - 8, size + 16, size + 16, 34);
      ctx.fillStyle = "rgba(241, 210, 136, 0.86)";
      ctx.fill();
    }

    // Clip and draw photo
    ctx.beginPath();
    if (slot.shape === "circle") {
      ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    } else {
      drawRoundRect(ctx, x, y, size, size, 26);
    }
    ctx.clip();
    drawCover(ctx, img, x, y, size, size);
    ctx.restore();

    // Outer border
    ctx.beginPath();
    ctx.strokeStyle = "#f4d58c";
    ctx.lineWidth = 6;
    if (slot.shape === "circle") {
      ctx.arc(x + size / 2, y + size / 2, size / 2 + 4, 0, Math.PI * 2);
    } else {
      drawRoundRect(ctx, x - 4, y - 4, size + 8, size + 8, 30);
    }
    ctx.stroke();
  });

  // Text animation
  const greetingY_base = 700;
  const senderY_base = greetingY_base + 110;
  ctx.font = "700 62px Cairo";
  ctx.fillStyle = "#fbf5e6";
  ctx.shadowBlur = 8;
  ctx.shadowColor = "#b97f2e";
  ctx.textAlign = "center";

  const textX = motion.textX;
  const textY = motion.textY;
  const textScale = motion.textScale;
  const textRotate = motion.textRotate;

  ctx.save();
  ctx.translate(w / 2 + textX, greetingY_base + textY);
  ctx.rotate(textRotate);
  ctx.scale(textScale, textScale);
  wrapText(ctx, renderData.greeting, 0, 0, 860, 68);
  ctx.restore();

  ctx.font = "600 44px Cinzel";
  ctx.fillStyle = "#e6c48b";
  ctx.save();
  ctx.translate(w / 2 + textX * 0.6, senderY_base + textY * 0.7);
  ctx.rotate(textRotate * 0.7);
  ctx.scale(textScale * 0.98, textScale * 0.98);
  ctx.fillText(renderData.sender, 0, 0);
  ctx.restore();

  ctx.font = "24px Cairo";
  ctx.fillStyle = "#ffecb3";
  ctx.fillText("Created By Mufassir", w - 40, h - 28);
  ctx.shadowBlur = 0;
}

const MAX_VIDEO_DURATION_MS = 40000;

// ---------- 9. Build render data (random or custom) ----------
async function buildRenderData() {
  if (!state.uploadedImages.length) throw new Error("Upload at least one photo.");

  const userImages = await loadUserImages(state.uploadedImages.slice(0, 3));
  const isCustom = isCustomEnabled();

  // Determine template
  let templateObj;
  if (isCustom && state.selectedTemplateId) {
    templateObj = templates.find(t => t.id === state.selectedTemplateId) || templates[0];
  } else {
    templateObj = randomFrom(templates);
    if (el.templateGrid) {
      const card = document.querySelector(`.template-card[data-id="${templateObj.id}"]`);
      if (card) {
        document.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");
      }
    }
    state.selectedTemplateId = templateObj.id;
  }
  const templateImage = await loadImage(templateObj.src);

  // Determine greeting
  let greeting = "";
  const mode = getSelectedMode();
  if (isCustom && mode === "default") greeting = el.defaultGreeting.value;
  else if (isCustom && mode === "custom") greeting = el.customGreeting.value.trim() || greetings[0];
  else greeting = randomFrom(greetings);

  const sender = el.senderName.value.trim() || "From Your Family";

  // Determine layout
  let layout;
  if (isCustom) {
    layout = el.layoutSelect.value;
  } else {
    layout = randomFrom(["classic", "ribbon", "collage"]);
    if (el.layoutSelect) el.layoutSelect.value = layout;
  }

  // Determine audio track
  let selectedAudioTrack;
  const audioVal = isCustom ? el.audioSelect.value : null;
  if (isCustom && audioVal === "custom-upload" && state.customAudioTrack) {
    selectedAudioTrack = state.customAudioTrack;
  } else if (isCustom && audioVal) {
    selectedAudioTrack = audioTracks.find(t => t.id === audioVal) || audioTracks[0];
  } else {
    selectedAudioTrack = randomFrom(audioTracks);
    if (el.audioSelect) el.audioSelect.value = selectedAudioTrack.id;
  }

  let clipDurationMs = selectedAudioTrack.durationMs || 20000;
  if (selectedAudioTrack.src && !selectedAudioTrack.durationMs) {
    clipDurationMs = await getAudioDuration(selectedAudioTrack.src);
    selectedAudioTrack.durationMs = clipDurationMs;
  }
  clipDurationMs = Math.min(MAX_VIDEO_DURATION_MS, Math.max(8000, clipDurationMs));

  // Animation is always random
  const animation = getRandomAnimation();

  // Decorative elements (seeded for consistency)
  const seedText = `${templateObj.id}|${layout}|${sender}|${greeting}|${Date.now()}|${Math.random()}`;
  const seed = createHashSeed(seedText);
  const decorations = buildDecorations(seed, el.canvas.width, el.canvas.height);

  return {
    templateImage,
    userImages,
    greeting,
    sender,
    layout,
    clipDurationMs,
    canvasWidth: 1080,
    canvasHeight: 1080,
    selectedAudioTrack,
    animation,
    decorations
  };
}

// ---------- 10. Video generation with countdown ----------
async function generateVideo() {
  if (state.isGenerating) return;
  state.isGenerating = true;
  showLoading(true, "Preparing...");

  try {
    const renderData = await buildRenderData();
    const durationMs = renderData.clipDurationMs;
    const totalSeconds = durationMs / 1000;

    const offCanvas = document.createElement("canvas");
    offCanvas.width = renderData.canvasWidth;
    offCanvas.height = renderData.canvasHeight;
    const offCtx = offCanvas.getContext("2d");

    const stream = offCanvas.captureStream(30);
    let audioElement = null;
    const track = renderData.selectedAudioTrack;
    if (track && track.src) {
      audioElement = new Audio(track.src);
      audioElement.loop = track.durationMs ? track.durationMs < durationMs + 500 : true;
      await audioElement.play().catch(e => console.warn("Audio play failed", e));
      if (audioElement.captureStream) {
        const audioStream = audioElement.captureStream();
        audioStream.getAudioTracks().forEach(t => stream.addTrack(t));
      }
    }

    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType: mime });
    const chunks = [];
    recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    recorder.start();

    const startTime = performance.now();
    let animFrame;

    const renderFrame = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const remaining = Math.max(0, durationMs - elapsed) / 1000;
      updateCountdown(remaining, totalSeconds);
      drawGreetingCard(offCtx, renderData, progress, renderData.animation);
      drawGreetingCard(state.ctx, renderData, progress, renderData.animation);
      if (progress < 1) {
        animFrame = requestAnimationFrame(renderFrame);
      } else {
        recorder.stop();
      }
    };

    animFrame = requestAnimationFrame(renderFrame);

    await new Promise(resolve => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `eid-video-${Date.now()}.webm`;
        link.click();
        URL.revokeObjectURL(url);
        if (audioElement) audioElement.pause();
        resolve();
      };
    });

    cancelAnimationFrame(animFrame);
    setStatus("Video generated and downloaded!");
    showLoading(false);
  } catch (err) {
    setStatus(err.message || "Generation failed", true);
    showLoading(false);
  } finally {
    state.isGenerating = false;
  }
}

// ---------- 11. PNG download ----------
async function onDownloadPng() {
  try {
    if (!state.uploadedImages.length) throw new Error("Upload photos first.");
    setStatus("Generating PNG...");
    const renderData = await buildRenderData();
    drawGreetingCard(state.ctx, renderData, 1, renderData.animation);
    const link = document.createElement("a");
    link.download = `eid-card-${Date.now()}.png`;
    link.href = el.canvas.toDataURL();
    link.click();
    setStatus("PNG downloaded.");
  } catch (err) {
    setStatus(err.message, true);
  }
}

// ---------- 12. UI population and event handlers ----------
function populateTemplates() {
  if (!el.templateGrid) return;
  el.templateGrid.innerHTML = "";
  templates.forEach(tmpl => {
    const btn = document.createElement("button");
    btn.className = "template-card";
    btn.dataset.id = tmpl.id;
    btn.innerHTML = `<img src="${tmpl.src}" alt="${tmpl.label}" loading="lazy"><span>${tmpl.label}</span>`;
    btn.onclick = () => {
      if (isCustomEnabled()) {
        state.selectedTemplateId = tmpl.id;
        document.querySelectorAll(".template-card").forEach(c => c.classList.remove("active"));
        btn.classList.add("active");
      }
    };
    el.templateGrid.appendChild(btn);
  });
  const firstCard = document.querySelector(".template-card");
  if (firstCard) {
    firstCard.classList.add("active");
    state.selectedTemplateId = templates[0].id;
  }
}

function populateAudioDropdown() {
  if (!el.audioSelect) return;
  el.audioSelect.innerHTML = "";
  audioTracks.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.label;
    el.audioSelect.appendChild(opt);
  });
  if (state.customAudioTrack) {
    const opt = document.createElement("option");
    opt.value = "custom-upload";
    opt.textContent = state.customAudioTrack.label;
    el.audioSelect.appendChild(opt);
  }
  el.audioSelect.value = "a1";
}

function populateGreetingDropdown() {
  if (!el.defaultGreeting) return;
  el.defaultGreeting.innerHTML = "";
  greetings.forEach(g => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    el.defaultGreeting.appendChild(opt);
  });
}

function onCustomAudioUpload(e) {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith("audio/")) {
    setStatus("Please upload a valid audio file.", true);
    return;
  }
  const url = URL.createObjectURL(file);
  if (state.customAudioTrack) URL.revokeObjectURL(state.customAudioTrack.src);
  state.customAudioTrack = {
    id: "custom-upload",
    label: `🎵 ${file.name}`,
    src: url,
    durationMs: 30000
  };
  populateAudioDropdown();
  el.audioSelect.value = "custom-upload";
  el.audioPreview.src = url;
  el.audioPreview.load();
  setStatus("Custom audio added.");
}

function onAudioSelectChange() {
  const val = el.audioSelect.value;
  if (val === "custom-upload" && state.customAudioTrack) {
    el.audioPreview.src = state.customAudioTrack.src;
  } else {
    const track = audioTracks.find(t => t.id === val);
    el.audioPreview.src = track ? track.src : "";
  }
  el.audioPreview.load();
}

function onSurprise() {
  if (state.isGenerating) return;
  if (!isCustomEnabled()) {
    setStatus("Already in Random mode. Click Create Video for a surprise!");
    return;
  }
  if (el.customModeToggle) el.customModeToggle.checked = false;
  toggleDesignMode();
  setStatus("Switched to Random mode. Click Create Video for surprise!");
}

function toggleDesignMode() {
  const custom = isCustomEnabled();
  if (el.customControls) el.customControls.disabled = !custom;
  if (el.customControlsDropdown) el.customControlsDropdown.open = custom;
  if (el.designModeLabel) el.designModeLabel.textContent = custom ? "Custom Design ON" : "Randomness ON";
  if (el.designModeHint) el.designModeHint.textContent = custom ? "You choose template, layout, song, greeting – animation is random." : "Everything is random on each click.";
  const mode = getSelectedMode();
  if (el.defaultGreeting) el.defaultGreeting.disabled = !custom || mode !== "default";
  if (el.customGreeting) el.customGreeting.disabled = !custom || mode !== "custom";
  document.querySelectorAll(".template-card").forEach(card => {
    if (custom) {
      card.style.opacity = "1";
      card.style.cursor = "pointer";
    } else {
      card.style.opacity = "0.7";
      card.style.cursor = "default";
    }
  });
}

function onGreetingModeChange() {
  const custom = isCustomEnabled();
  const mode = getSelectedMode();
  if (custom) {
    if (el.defaultGreeting) el.defaultGreeting.disabled = mode !== "default";
    if (el.customGreeting) el.customGreeting.disabled = mode !== "custom";
  } else {
    if (el.defaultGreeting) el.defaultGreeting.disabled = true;
    if (el.customGreeting) el.customGreeting.disabled = true;
  }
}

function bindEvents() {
  if (el.photoUpload) {
    el.photoUpload.addEventListener("change", () => {
      const files = Array.from(el.photoUpload.files).slice(0, 3);
      state.uploadedImages = files;
      if (el.uploadList) el.uploadList.textContent = files.length ? `${files.length} photo(s) selected.` : "No photos selected.";
    });
  }
  if (el.createVideoBtn) el.createVideoBtn.addEventListener("click", generateVideo);
  if (el.downloadPngBtn) el.downloadPngBtn.addEventListener("click", onDownloadPng);
  if (el.surpriseBtn) el.surpriseBtn.addEventListener("click", onSurprise);
  if (el.customModeToggle) el.customModeToggle.addEventListener("change", toggleDesignMode);
  if (el.modeInputs) el.modeInputs.forEach(inp => inp.addEventListener("change", onGreetingModeChange));
  if (el.customAudioUpload) el.customAudioUpload.addEventListener("change", onCustomAudioUpload);
  if (el.audioSelect) el.audioSelect.addEventListener("change", onAudioSelectChange);
}

function drawPlaceholder() {
  if (!state.ctx) return;
  const grad = state.ctx.createLinearGradient(0, 0, 0, 1080);
  grad.addColorStop(0, "#0e305a");
  grad.addColorStop(1, "#071f3d");
  state.ctx.fillStyle = grad;
  state.ctx.fillRect(0, 0, 1080, 1080);
  state.ctx.fillStyle = "#f4d997";
  state.ctx.font = "700 48px Cinzel";
  state.ctx.textAlign = "center";
  state.ctx.fillText("Eid Video Studio", 540, 480);
  state.ctx.font = "28px Cairo";
  state.ctx.fillStyle = "#ddd";
  state.ctx.fillText("Upload photos & click Create Video", 540, 580);
}

// ---------- 13. Initialization ----------
document.addEventListener("DOMContentLoaded", () => {
  el = {
    customModeToggle: document.getElementById("customModeToggle"),
    designModeLabel: document.getElementById("designModeLabel"),
    designModeHint: document.getElementById("designModeHint"),
    customControls: document.getElementById("customControls"),
    customControlsDropdown: document.getElementById("customControlsDropdown"),
    templateGrid: document.getElementById("templateGrid"),
    photoUpload: document.getElementById("photoUpload"),
    uploadList: document.getElementById("uploadList"),
    senderName: document.getElementById("senderName"),
    defaultGreeting: document.getElementById("defaultGreeting"),
    customGreeting: document.getElementById("customGreeting"),
    modeInputs: document.querySelectorAll('input[name="greetingMode"]'),
    layoutSelect: document.getElementById("layoutSelect"),
    audioSelect: document.getElementById("audioSelect"),
    customAudioUpload: document.getElementById("customAudioUpload"),
    audioPreview: document.getElementById("audioPreview"),
    createVideoBtn: document.getElementById("createVideoBtn"),
    surpriseBtn: document.getElementById("surpriseBtn"),
    downloadPngBtn: document.getElementById("downloadPngBtn"),
    statusMsg: document.getElementById("statusMsg"),
    loadingOverlay: document.getElementById("loadingOverlay"),
    countdownNumber: document.getElementById("countdownNumber"),
    loadingText: document.getElementById("loadingText"),
    canvas: document.getElementById("greetingCanvas")
  };

  if (!el.canvas) {
    console.error("Canvas element not found!");
    return;
  }
  state.canvas = el.canvas;
  state.ctx = el.canvas.getContext("2d");
  if (!state.ctx) {
    console.error("Could not get canvas context!");
    return;
  }

  populateTemplates();
  populateAudioDropdown();
  populateGreetingDropdown();
  bindEvents();
  toggleDesignMode();
  drawPlaceholder();
  setStatus("Ready. Upload photos and click Create Video.");
});