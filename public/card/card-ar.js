// Card AR: track the front of the business card and pop Alexandria out of it,
// with tappable links orbiting her. Runs in the browser (MindAR + three), no app.
import * as THREE from 'three';
import { MindARThree } from '/card/vendor/mindar/mindar-image-three.prod.js';

const CALENDLY = 'https://calendly.com/alexandria-cuellar-ny/30min';
const LINKS = [
  { label: 'Website', href: 'https://auvastudio.com/', icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/>' },
  { label: 'Email', href: 'mailto:hello@auvastudio.com', icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>' },
  { label: 'Instagram', href: 'https://www.instagram.com/auvastudiony/', icon: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>' },
  { label: 'Facebook', href: 'https://www.facebook.com/auvastudiony', icon: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/auva-studio/', icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>' },
];
const NAVY = '#0f1d52', PERI = '#9fb6ff', STAR = '#f39a3b';

const svgImage = (body, stroke) => new Promise((ok) => {
  const img = new Image();
  img.onload = () => ok(img);
  img.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`);
});
const texture = (canvas) => { const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const font = (w, px) => `${w} ${px}px "DM Sans", Arial, sans-serif`;

// A white disc with the icon in navy, label underneath
async function iconSprite(link) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 320; const g = c.getContext('2d');
  g.shadowColor = 'rgba(0,0,0,0.35)'; g.shadowBlur = 18; g.shadowOffsetY = 6;
  g.fillStyle = '#fff'; g.beginPath(); g.arc(128, 120, 96, 0, Math.PI * 2); g.fill();
  g.shadowColor = 'transparent'; g.lineWidth = 6; g.strokeStyle = PERI; g.stroke();
  g.drawImage(await svgImage(link.icon, NAVY), 80, 72, 96, 96);
  g.font = font(600, 36); g.textAlign = 'center'; g.textBaseline = 'middle';
  const tw = g.measureText(link.label).width + 36;
  g.fillStyle = 'rgba(10,20,64,0.85)'; g.beginPath(); g.roundRect(128 - tw / 2, 252, tw, 56, 28); g.fill();
  g.fillStyle = '#fff'; g.fillText(link.label, 128, 281);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture(c), transparent: true, depthWrite: false }));
  s.scale.set(0.17, 0.2125, 1); s.userData.href = link.href; s.userData.base = s.scale.clone();
  return s;
}

// The pill under her photo: the one thing worth doing next
function bookSprite() {
  const c = document.createElement('canvas'); c.width = 768; c.height = 168; const g = c.getContext('2d');
  g.shadowColor = 'rgba(0,0,0,0.35)'; g.shadowBlur = 20; g.shadowOffsetY = 6;
  g.fillStyle = STAR; g.beginPath(); g.roundRect(12, 12, 744, 132, 66); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = '#0a1440'; g.font = font(700, 50); g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('Book a free 30-minute call', 384, 80);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture(c), transparent: true, depthWrite: false }));
  s.scale.set(0.7, 0.153, 1); s.userData.href = CALENDLY; s.userData.base = s.scale.clone();
  return s;
}

function starSprite() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
  g.shadowColor = STAR; g.shadowBlur = 16; g.fillStyle = STAR; g.beginPath();
  [[64, 8], [74, 54], [120, 64], [74, 74], [64, 120], [54, 74], [8, 64], [54, 54]].forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
  g.closePath(); g.fill();
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture(c), transparent: true, depthWrite: false }));
  s.scale.set(0.11, 0.11, 1); return s;
}

export async function startCardAR(container, { found, lost }) {
  await document.fonts.ready;
  const mindar = new MindARThree({
    container, imageTargetSrc: '/card/card.mind', maxTrack: 1,
    uiLoading: 'no', uiScanning: 'no', uiError: 'no',
    filterMinCF: 0.0001, filterBeta: 0.001, missTolerance: 8,
  });
  const { renderer, scene, camera } = mindar;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));

  // Anchor space: the card front is 1 unit wide, 1.75 tall, centred on the origin, +z towards the camera.
  const anchor = mindar.addAnchor(0);

  // She steps out of the printed photo: a dark pool over it, ringed in periwinkle
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.325, 64), new THREE.MeshBasicMaterial({ color: PERI, transparent: true, opacity: 0.9 }));
  const pool = new THREE.Mesh(new THREE.CircleGeometry(0.3, 64), new THREE.MeshBasicMaterial({ color: NAVY, transparent: true, opacity: 0.88 }));
  ring.position.z = pool.position.z = 0.002;
  const floor = new THREE.Group(); floor.position.set(-0.13, 0.27, 0); floor.add(pool, ring); anchor.group.add(floor);

  // Everything that stands up off the card. Rotating x past 90deg turns local +y into "up off the card",
  // leaning a little towards someone holding the card, so she isn't seen edge-on from above.
  const stand = new THREE.Group(); stand.position.copy(floor.position); stand.rotation.x = Math.PI * 0.38; anchor.group.add(stand);

  const meTex = await new THREE.TextureLoader().loadAsync('/card/me.webp'); meTex.colorSpace = THREE.SRGBColorSpace;
  const W = 0.62, H = W * meTex.image.height / meTex.image.width;
  const me = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: meTex, transparent: true, alphaTest: 0.02, side: THREE.DoubleSide }));
  me.position.y = H / 2; me.userData.href = CALENDLY; me.userData.base = me.scale.clone();
  const lift = new THREE.Group(); lift.add(me); stand.add(lift);

  const star = starSprite(); star.position.y = H + 0.08; lift.add(star);
  // The call button hovers over the line between her title and the 3D QR, clear of her name
  const book = bookSprite(); book.position.set(0, -0.5, 0.06); anchor.group.add(book);

  const orbit = new THREE.Group(); orbit.position.y = H * 0.55; stand.add(orbit);
  const icons = await Promise.all(LINKS.map(iconSprite));
  icons.forEach((s, i) => { const a = (i / icons.length) * Math.PI * 2; s.position.set(Math.sin(a) * 0.52, Math.cos(a * 2) * 0.05, Math.cos(a) * 0.52); orbit.add(s); });

  const tappable = [...icons, book, me];

  // Pop-up entrance each time the card is found
  let shownAt = 0;
  anchor.onTargetFound = () => { shownAt = performance.now(); found?.(); };
  anchor.onTargetLost = () => lost?.();
  const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

  // Tap to open
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  let pressed = null;
  const onTap = (e) => {
    if (!anchor.group.visible) return;
    const r = container.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(tappable, false)[0];
    if (!hit) return;
    const { href } = hit.object.userData; pressed = { obj: hit.object, at: performance.now() };
    if (href.startsWith('mailto:')) window.location.href = href; else window.open(href, '_blank', 'noopener');
  };
  container.addEventListener('click', onTap);

  const clock = new THREE.Clock();
  await mindar.start();
  renderer.setAnimationLoop(() => {
    const t = clock.getElapsedTime();
    const k = Math.min(1, (performance.now() - shownAt) / 700);
    stand.scale.setScalar(Math.max(0.001, easeOutBack(k)));
    const kb = Math.min(1, Math.max(0, (performance.now() - shownAt - 350) / 500));
    orbit.rotation.y = t * 0.45;
    icons.forEach((s, i) => { s.position.y = Math.sin(t * 1.6 + i) * 0.03; });
    lift.position.y = Math.sin(t * 1.2) * 0.012;
    star.material.rotation = Math.sin(t * 0.8) * 0.15;
    star.scale.setScalar(0.1 + Math.sin(t * 2.4) * 0.012);
    ring.material.opacity = 0.65 + Math.sin(t * 2) * 0.25;
    for (const s of tappable) s.scale.copy(s.userData.base);
    book.scale.multiplyScalar(Math.max(0.001, easeOutBack(kb)));
    if (pressed && performance.now() - pressed.at < 250) pressed.obj.scale.multiplyScalar(1.15);
    renderer.render(scene, camera);
  });

  return {
    stop() {
      container.removeEventListener('click', onTap);
      renderer.setAnimationLoop(null);
      mindar.stop();
      renderer.dispose();
    },
  };
}
