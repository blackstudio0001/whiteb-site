// Rain
const canvas = document.getElementById('bg-rain');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const drops = Array.from({ length: 220 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  len: 12 + Math.random() * 28,
  speed: 2 + Math.random() * 5,
  op: 0.04 + Math.random() * 0.14,
  w: 0.4 + Math.random() * 0.7
}));

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach(d => {
    const g = ctx.createLinearGradient(d.x, d.y, d.x - d.len * 0.08, d.y + d.len);
    g.addColorStop(0, `rgba(200,200,210,0)`);
    g.addColorStop(1, `rgba(200,200,210,${d.op})`);
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - d.len * 0.08, d.y + d.len);
    ctx.strokeStyle = g;
    ctx.lineWidth = d.w;
    ctx.stroke();
    d.y += d.speed;
    if (d.y > canvas.height + 40) {
      d.y = -40;
      d.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawRain);
}
drawRain();

// Music — autoplay on first user interaction (browser policy)
const audio = new Audio('FRIENDLY_THUG_52_NGG_-_Lost_Angeles_76929092.mp3');
audio.loop = true;
audio.volume = 0.6;

function tryPlay() {
  audio.play().catch(() => {});
  document.removeEventListener('click', tryPlay);
  document.removeEventListener('keydown', tryPlay);
  document.removeEventListener('touchstart', tryPlay);
}

// Try immediate autoplay first, fallback to first interaction
audio.play().catch(() => {
  document.addEventListener('click', tryPlay);
  document.addEventListener('keydown', tryPlay);
  document.addEventListener('touchstart', tryPlay);
});
