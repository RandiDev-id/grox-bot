// Mock activity data (matches the screenshot vibe)
const activities = [
  { id: '#06', side: 'BUY',  token: '$PEPE',   result: 'WIN' },
  { id: '#05', side: 'SELL', token: 'COIN-12', result: 'WIN' },
  { id: '#04', side: 'SELL', token: 'COIN-07', result: 'WIN' },
  { id: '#03', side: 'SELL', token: '$PEPE',   result: 'WIN' },
  { id: '#02', side: 'BUY',  token: 'COIN-11', result: 'WIN' },
  { id: '#01', side: 'SELL', token: '$TURBO',  result: 'WIN' },
];

function renderActivity() {
  const list = document.getElementById('activity-list');
  list.innerHTML = activities.map(a => `
    <li>
      <span class="act-id">${a.id}</span>
      <span class="act-side ${a.side.toLowerCase()}">${a.side}</span>
      <span class="act-token">${a.token}</span>
      <span class="act-result">${a.result}</span>
    </li>
  `).join('');
}

// Simple balance history line chart
function drawChart() {
  const canvas = document.getElementById('chart');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = 120 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 120;
  const padding = { top: 10, right: 10, bottom: 10, left: 10 };

  // Mock equity curve (starting ~50 → 73.92)
  const points = [50, 52, 51, 55, 58, 57, 62, 65, 64, 68, 70, 72, 71, 73.5, 73.92];
  const min = Math.min(...points) - 5;
  const max = Math.max(...points) + 5;

  const xStep = (w - padding.left - padding.right) / (points.length - 1);

  // Grid lines
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = padding.top + (h - padding.top - padding.bottom) * (i / 3);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(w - padding.right, y);
    ctx.stroke();
  }

  // Line path
  ctx.beginPath();
  points.forEach((p, i) => {
    const x = padding.left + i * xStep;
    const y = padding.top + (1 - (p - min) / (max - min)) * (h - padding.top - padding.bottom);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  // Stroke
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Gradient fill under line
  const lastX = padding.left + (points.length - 1) * xStep;
  const lastY = padding.top + (1 - (points[points.length - 1] - min) / (max - min)) * (h - padding.top - padding.bottom);
  ctx.lineTo(lastX, h - padding.bottom);
  ctx.lineTo(padding.left, h - padding.bottom);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, padding.top, 0, h);
  grad.addColorStop(0, 'rgba(34, 197, 94, 0.25)');
  grad.addColorStop(1, 'rgba(34, 197, 94, 0)');
  ctx.fillStyle = grad;
  ctx.fill();
}

// Heartbeat / ECG style animation
function drawHeartbeat() {
  const canvas = document.getElementById('heartbeat');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = rect.width * dpr;
  canvas.height = 40 * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = 40;
  let offset = 0;

  function frame() {
    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';

    const mid = h / 2;
    const segments = 40;
    const segW = w / segments;

    for (let i = 0; i <= segments; i++) {
      const x = i * segW;
      let y = mid;

      // Create a heartbeat-like pattern that scrolls
      const t = (i + offset) % 20;
      if (t > 8 && t < 12) {
        // spike
        if (t < 9.5) y = mid - 12;
        else if (t < 10.5) y = mid + 8;
        else y = mid - 4;
      } else if (t > 14 && t < 16) {
        y = mid - 3;
      }

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    offset += 0.35;
    requestAnimationFrame(frame);
  }

  frame();
}

// Tiny live feel: occasional agent status flicker
function animateAgents() {
  const tosk = document.querySelector('.agent[data-id="tosk"]');
  setInterval(() => {
    tosk.classList.toggle('active');
    setTimeout(() => tosk.classList.add('active'), 400);
  }, 4000);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderActivity();
  drawChart();
  drawHeartbeat();
  animateAgents();

  // Redraw chart on resize
  window.addEventListener('resize', () => {
    drawChart();
  });
});
