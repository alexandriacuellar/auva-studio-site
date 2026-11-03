// Card demo preview: the same pop-out as /card/ (avatar, orbiting icons, Book button),
// on a virtual card in a 3D view, for people with no printed card and no second screen.
// The helpers below are copied from /card/card-ar.js so the live card page stays untouched.
import * as THREE from 'three';

const CALENDLY = 'https://calendly.com/alexandria-cuellar-ny/30min';
const LINKS = [
  { label: 'Website', href: 'https://auvastudio.com/', icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/>' },
  { label: 'Contact', href: 'https://auvastudio.com/contact/', icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>' },
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
  g.font = font(700, 50); g.textAlign = 'center'; g.textBaseline = 'middle';
  const tw = Math.min(252, g.measureText(link.label).width + 34);
  g.fillStyle = 'rgba(10,20,64,0.9)'; g.beginPath(); g.roundRect(128 - tw / 2, 238, tw, 76, 38); g.fill();
  g.fillStyle = '#fff'; g.fillText(link.label, 128, 278, 236);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture(c), transparent: true, depthWrite: false }));
  s.scale.set(0.19, 0.2375, 1); s.userData.href = link.href; s.userData.base = s.scale.clone();
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

export async function startCardPreview(container, { card }) {
  await document.fonts.ready;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 1.2));
  const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 50);
  const size = () => {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false); renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    // Fit the card and the figure above it on narrow phones and wide screens alike.
    camera.position.set(0, 0.5, (w / h < 0.7 ? 5 : 4.7));
    camera.lookAt(0, w / h < 0.7 ? 0.4 : 0.25, 0);
    camera.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  // The card lies tilted back like it's held in a hand; anchor space matches card-ar.js.
  const holder = new THREE.Group(); holder.rotation.x = -0.75; holder.position.y = -0.15; scene.add(holder);
  const anchor = { group: new THREE.Group() }; holder.add(anchor.group);
  const cardTex = await new THREE.TextureLoader().loadAsync(card); cardTex.colorSpace = THREE.SRGBColorSpace; cardTex.anisotropy = 8;
  const cardMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.75), new THREE.MeshBasicMaterial({ map: cardTex }));
  const back = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.75), new THREE.MeshBasicMaterial({ color: NAVY }));
  back.rotation.y = Math.PI; back.position.z = -0.002;
  anchor.group.add(cardMesh, back);

  const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.325, 64), new THREE.MeshBasicMaterial({ color: PERI, transparent: true, opacity: 0.85 }));
  ring.position.z = 0.002;
  const sc = document.createElement('canvas'); sc.width = sc.height = 128; const sg = sc.getContext('2d');
  const grad = sg.createRadialGradient(64, 64, 0, 64, 64, 64); grad.addColorStop(0, 'rgba(0,0,0,0.55)'); grad.addColorStop(1, 'rgba(0,0,0,0)');
  sg.fillStyle = grad; sg.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), transparent: true, depthWrite: false }));
  shadow.position.set(0, 0.02, 0.004);
  const floor = new THREE.Group(); floor.position.set(-0.13, 0.27, 0); floor.add(ring, shadow); anchor.group.add(floor);

  // The card is tilted back 0.75 rad, so 0.75 stands her straight up; a little more leans her towards the viewer.
  const stand = new THREE.Group(); stand.position.copy(floor.position); stand.rotation.x = 0.9; anchor.group.add(stand);
  const meTex = await new THREE.TextureLoader().loadAsync('/card/avatar.webp'); meTex.colorSpace = THREE.SRGBColorSpace;
  const H = 1.1, W = H * meTex.image.width / meTex.image.height;
  const me = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ map: meTex, transparent: true, alphaTest: 0.02, side: THREE.DoubleSide }));
  me.position.y = H / 2; me.userData.href = CALENDLY; me.userData.base = me.scale.clone();
  const lift = new THREE.Group(); lift.add(me); stand.add(lift);
  const star = starSprite(); star.position.set(W / 2 + 0.12, H * 0.86, 0); lift.add(star);
  const book = bookSprite(); book.position.set(0, -0.5, 0.06); anchor.group.add(book);
  const orbit = new THREE.Group(); orbit.position.set(-floor.position.x, H * 0.55, 0); stand.add(orbit);
  const icons = await Promise.all(LINKS.map(iconSprite));
  icons.forEach((s, i) => { const a = (i / icons.length) * Math.PI * 2; s.position.set(Math.sin(a) * 0.4, Math.cos(a * 2) * 0.05, Math.cos(a) * 0.4); orbit.add(s); });
  const tappable = [...icons, book, me];
  const easeOutBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

  // Drag to turn the card a little; a tap (no drag) opens what's under the finger.
  let yaw = 0, tilt = 0, drag = null, moved = false, pressed = null;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const el = renderer.domElement; el.style.touchAction = 'none';
  const down = (e) => { drag = { x: e.clientX, y: e.clientY, yaw, tilt }; moved = false; el.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 6) moved = true;
    yaw = Math.max(-0.9, Math.min(0.9, drag.yaw + dx * 0.006));
    tilt = Math.max(-0.35, Math.min(0.45, drag.tilt + dy * 0.004));
  };
  const up = (e) => {
    const wasDrag = moved; drag = null;
    if (wasDrag) return;
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects([...icons, book], false)[0] || ray.intersectObject(me, false)[0];
    if (!hit) return;
    pressed = { obj: hit.object, at: performance.now() };
    window.open(hit.object.userData.href, '_blank', 'noopener');
  };
  el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);

  const shownAt = performance.now() + 250;
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const t = still ? 0 : clock.getElapsedTime();
    const k = still ? 1 : Math.min(1, Math.max(0, (performance.now() - shownAt) / 700));
    holder.rotation.y += ((drag ? yaw : yaw + Math.sin(t * 0.4) * 0.12) - holder.rotation.y) * 0.12;
    holder.rotation.x += ((-0.75 + tilt) - holder.rotation.x) * 0.12;
    stand.scale.setScalar(Math.max(0.001, easeOutBack(k)));
    const kb = still ? 1 : Math.min(1, Math.max(0, (performance.now() - shownAt - 350) / 500));
    orbit.rotation.y = t * 0.45;
    icons.forEach((s, i) => { s.position.y = Math.sin(t * 1.6 + i) * 0.03; });
    lift.rotation.z = Math.sin(t * 1.1) * 0.025;
    star.material.rotation = Math.sin(t * 0.8) * 0.15;
    star.scale.setScalar(0.1 + Math.sin(t * 2.4) * 0.012);
    for (const s of tappable) s.scale.copy(s.userData.base);
    book.scale.multiplyScalar(Math.max(0.001, easeOutBack(kb)));
    if (pressed && performance.now() - pressed.at < 250) pressed.obj.scale.multiplyScalar(1.15);
    renderer.render(scene, camera);
  });

  return {
    stop() {
      renderer.setAnimationLoop(null);
      removeEventListener('resize', size);
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up);
      renderer.dispose();
    },
  };
}
