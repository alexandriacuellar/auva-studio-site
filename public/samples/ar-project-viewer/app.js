// AR Project Viewer demo: a farmhouse that isn't built yet, on the table or full size.
// The page shows a 3D preview with the same buttons as AR (roof, finish, day or night).
// Android phones and Meta Quest 3 get a three.js WebXR session; iPhones open the matching
// .glb in Apple's AR viewer through model-viewer; computers get a QR code.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildHouse, FINISHES } from './house.js';

const $ = (id) => document.getElementById(id);
const TABLE = 1 / 50;
const state = { roof: false, finish: 'white', night: false, full: false };
const houses = [];

function makeHouse() {
  const h = buildHouse({ finish: state.finish });
  h.roofT = state.roof ? 1 : 0;
  h.setNight(state.night);
  houses.push(h);
  return h;
}
function stepRoof(h, dt) {
  const target = state.roof ? 1 : 0;
  if (h.roofT === target && dt) return false;
  h.roofT = dt ? (target > h.roofT ? Math.min(1, h.roofT + dt * 1.6) : Math.max(0, h.roofT - dt * 1.6)) : target;
  const k = h.roofT * h.roofT * (3 - 2 * h.roofT);
  h.roof.position.y = k * 6;
  h.roof.visible = h.roofT < 0.999;
  for (const m of h.roofMats) { m.transparent = k > 0.001; m.opacity = 1 - k; m.depthWrite = k < 0.5; }
  h.labels.visible = k > 0.4;
  h.labels.children.forEach((s) => { s.material.opacity = Math.min(1, (k - 0.4) / 0.5); });
  return true;
}
function lightsFor(scene, night) {
  scene.userData.hemi.intensity = night ? 1.6 : 0.75;
  scene.userData.hemi.color.set(night ? '#7d8fc4' : '#ffffff');
  scene.userData.sun.intensity = night ? 0.5 : 1.5;
  scene.userData.sun.color.set(night ? '#9fb2e8' : '#fff1dc');
  scene.userData.hemi.groundColor.set(night ? '#2a2f45' : '#7a6f5c');
  scene.userData.renderer.toneMappingExposure = 1;
  scene.environment = night ? null : scene.userData.env;
}
function makeScene(renderer) {
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  const hemi = new THREE.HemisphereLight(0xffffff, 0x7a6f5c, 0.75);
  const sun = new THREE.DirectionalLight(0xfff1dc, 1.5); sun.position.set(-4, 8, 6);
  scene.add(hemi, sun); scene.userData = { hemi, sun, renderer, env: scene.environment };
  return scene;
}

// ---------- Page preview ----------
const stage = $('stage');
const pv = { renderer: new THREE.WebGLRenderer({ antialias: true, alpha: true }) };
pv.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
pv.renderer.toneMapping = THREE.ACESFilmicToneMapping;
stage.prepend(pv.renderer.domElement);
pv.renderer.domElement.setAttribute('aria-label', 'A 3D model of the Stone Ridge Farmhouse. Drag to turn it.');
pv.renderer.domElement.setAttribute('role', 'img');
pv.scene = makeScene(pv.renderer);
pv.house = makeHouse(); pv.scene.add(pv.house.root);
pv.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 300);
pv.view = { yaw: 0.65, pitch: 0.5, dist: 46, spin: true };

function sizePreview() {
  const w = stage.clientWidth, h = stage.clientHeight;
  pv.renderer.setSize(w, h, false); pv.camera.aspect = w / h;
  pv.view.fit = w / h < 1.2 ? 1.2 / (w / h) : 1; pv.camera.updateProjectionMatrix();
}
new ResizeObserver(sizePreview).observe(stage); sizePreview();

let drag = null; const pointers = new Map();
const cv = pv.renderer.domElement;
cv.style.touchAction = 'pan-y';
cv.addEventListener('pointerdown', (e) => { pointers.set(e.pointerId, [e.clientX, e.clientY]); drag = { x: e.clientX, y: e.clientY }; pv.view.spin = false; pv.view.touched = true; cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', (e) => {
  if (!pointers.has(e.pointerId)) return;
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()]; const d0 = Math.hypot(a[0] - b[0], a[1] - b[1]);
    pointers.set(e.pointerId, [e.clientX, e.clientY]);
    const [c, d] = [...pointers.values()]; const d1 = Math.hypot(c[0] - d[0], c[1] - d[1]);
    pv.view.dist = THREE.MathUtils.clamp(pv.view.dist * d0 / d1, 24, 70); return;
  }
  pointers.set(e.pointerId, [e.clientX, e.clientY]);
  pv.view.yaw -= (e.clientX - drag.x) * 0.008;
  pv.view.pitch = THREE.MathUtils.clamp(pv.view.pitch + (e.clientY - drag.y) * 0.006, 0.12, 1.4);
  drag = { x: e.clientX, y: e.clientY };
});
const lift = (e) => { pointers.delete(e.pointerId); };
cv.addEventListener('pointerup', (e) => { lift(e); drag = pointers.size ? drag : null; }); cv.addEventListener('pointercancel', lift);
cv.addEventListener('wheel', (e) => { e.preventDefault(); pv.view.dist = THREE.MathUtils.clamp(pv.view.dist * (1 + e.deltaY * 0.001), 24, 70); pv.view.spin = false; }, { passive: false });

let pvLast = 0, pvOn = true;
new IntersectionObserver(([en]) => { pvOn = en.isIntersecting; }).observe(stage);
function previewFrame(t) {
  const dt = Math.min((t - pvLast) / 1000, 0.1) || 0; pvLast = t;
  if (!pvOn || xr.session) return;
  if (pv.view.spin && !matchMedia('(prefers-reduced-motion: reduce)').matches) pv.view.yaw += dt * 0.12;
  stepRoof(pv.house, dt);
  if (!pv.view.touched) { const want = state.roof ? 0.95 : 0.5; pv.view.pitch += Math.sign(want - pv.view.pitch) * Math.min(Math.abs(want - pv.view.pitch), dt * 0.8); }
  const { yaw, pitch } = pv.view, dist = pv.view.dist * pv.view.fit;
  pv.camera.position.set(Math.sin(yaw) * Math.cos(pitch) * dist, 1.5 + Math.sin(pitch) * dist, Math.cos(yaw) * Math.cos(pitch) * dist);
  pv.camera.lookAt(0, 1.2, 0);
  pv.renderer.render(pv.scene, pv.camera);
}
pv.renderer.setAnimationLoop(previewFrame);

// ---------- Controls (page and AR share the same state) ----------
function apply() {
  houses.forEach((h) => { h.setFinish(state.finish); h.setNight(state.night); });
  lightsFor(pv.scene, state.night); if (xr.scene) lightsFor(xr.scene, state.night);
  stage.classList.toggle('night', state.night);
  document.querySelectorAll('[data-roof]').forEach((b) => { b.setAttribute('aria-pressed', String(state.roof)); b.querySelector('span').textContent = state.roof ? 'Put the roof back' : 'Lift the roof'; });
  document.querySelectorAll('[data-night]').forEach((b) => { b.setAttribute('aria-pressed', String(state.night)); b.querySelector('span').textContent = state.night ? 'Back to daytime' : 'See it at night'; });
  document.querySelectorAll('[data-finish]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.finish === state.finish)));
  $('finish-name').textContent = FINISHES[state.finish].label;
  $('ar-finish').querySelector('span').textContent = FINISHES[state.finish].label;
  $('ar-size').querySelector('span').textContent = state.full ? 'Table size' : 'Full size';
  $('plan-note').hidden = !state.roof;
  syncFallback();
  if (xr.session) refreshPanel();
}
document.querySelectorAll('[data-roof]').forEach((b) => b.addEventListener('click', () => { state.roof = !state.roof; apply(); }));
document.querySelectorAll('[data-night]').forEach((b) => b.addEventListener('click', () => { state.night = !state.night; apply(); }));
document.querySelectorAll('[data-finish]').forEach((b) => b.addEventListener('click', () => { state.finish = b.dataset.finish; apply(); }));
const finishOrder = Object.keys(FINISHES);
const nextFinish = () => { state.finish = finishOrder[(finishOrder.indexOf(state.finish) + 1) % finishOrder.length]; apply(); };
$('ar-finish').addEventListener('click', nextFinish);

// iPhone fallback: Apple's AR viewer gets the .glb that matches the chosen finish and roof.
const mv = $('mv');
let fallbackOn = false;
function syncFallback() { if (fallbackOn) mv.src = `./models/farmhouse-${state.finish}${state.roof ? '-open' : ''}.glb`; }

const xrSupported = navigator.xr ? navigator.xr.isSessionSupported('immersive-ar').catch(() => false) : Promise.resolve(false);
xrSupported.then((ok) => {
  if (ok) return;
  const mobile = matchMedia('(pointer: coarse)').matches;
  if (mobile) { fallbackOn = true; syncFallback(); $('hint').textContent = 'Pick the finish and roof first. They carry into the camera view.'; }
});

$('ar-start').addEventListener('click', async () => {
  if (await xrSupported) { startXR().catch(xrFailed); return; }
  if (!fallbackOn) { fallbackOn = true; syncFallback(); }
  await customElements.whenDefined('model-viewer');
  if (mv.canActivateAR) { mv.activateAR(); return; }
  $('qr').classList.add('show');
  $('hint').textContent = 'This device can’t open the camera view. Use the code below.';
});
function xrFailed(err) {
  console.warn(err);
  if (mv.canActivateAR) mv.activateAR();
  else $('hint').textContent = 'The camera view didn’t start. Check that this site can use your camera, then try again.';
}

// ---------- AR session ----------
const xr = { session: null, renderer: null, scene: null, camera: null, ref: null, refType: 'local', house: null, holder: null,
  viewerHit: null, ctrlHit: new Map(), lastHit: new Map(), following: true, target: null, reticle: null,
  panel: null, panelItems: [], panelPlaced: false, rays: [] };
if (location.search.includes('debug')) { window.__arDemo = xr; window.__state = state; }

function shadowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const r = g.createRadialGradient(64, 64, 10, 64, 64, 64);
  r.addColorStop(0, 'rgba(0,0,0,0.45)'); r.addColorStop(0.7, 'rgba(0,0,0,0.25)'); r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
function labelTexture(text, { w = 512, h = 128, bg = 'rgba(251,250,247,0.95)', fg = '#22252b', font = '600 50px "Manrope", system-ui, sans-serif' } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.beginPath(); g.roundRect(0, 0, w, h, h / 2); g.fill();
  g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function initThree() {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.xr.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.display = 'none';
  document.body.appendChild(renderer.domElement);
  const scene = makeScene(renderer);
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 200);

  const reticle = new THREE.Group();
  reticle.add(new THREE.Mesh(new THREE.RingGeometry(0.1, 0.122, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })));
  reticle.visible = false; scene.add(reticle);

  const holder = new THREE.Group(); holder.visible = false; scene.add(holder);
  const house = makeHouse(); holder.add(house.root);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(30, 30).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
  shadow.position.y = -0.17; house.root.add(shadow);

  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0x9fd18b, transparent: true, opacity: 0.8 }));
    line.scale.z = 1.5; line.visible = false; c.add(line); scene.add(c);
    c.addEventListener('connected', (e) => { line.visible = e.data.targetRayMode === 'tracked-pointer'; c.userData.source = e.data; });
    c.addEventListener('disconnected', () => { line.visible = false; c.userData.source = null; });
    xr.rays.push({ controller: c, line });
  }
  addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
  Object.assign(xr, { renderer, scene, camera, reticle, holder, house });
  lightsFor(scene, state.night);
}

async function startXR() {
  if (!xr.renderer) initThree();
  const session = await navigator.xr.requestSession('immersive-ar', {
    optionalFeatures: ['hit-test', 'local-floor', 'dom-overlay'],
    domOverlay: { root: $('ar-ui') },
  });
  try { await session.requestReferenceSpace('local-floor'); xr.refType = 'local-floor'; } catch { xr.refType = 'local'; }
  xr.renderer.xr.setReferenceSpaceType(xr.refType);
  await xr.renderer.xr.setSession(session);
  xr.session = session;
  xr.renderer.domElement.style.display = 'block';
  xr.overlay = !!session.domOverlayState;
  $('ar-ui').classList.add('on');
  $('ar-ui').addEventListener('beforexrselect', (e) => { if (e.target.closest('button')) e.preventDefault(); });

  if (session.requestHitTestSource) {
    session.requestReferenceSpace('viewer').then((v) => session.requestHitTestSource({ space: v })).then((h) => { xr.viewerHit = h; }).catch(() => {});
  }
  session.addEventListener('inputsourceschange', refreshControllerHits);
  refreshControllerHits();
  session.addEventListener('select', onSelect);
  session.addEventListener('squeeze', () => { xr.panelPlaced = false; });
  session.addEventListener('end', onEnd);
  xr.following = true; xr.holder.visible = false; setScale();
  setMsg('Move your phone slowly to find a table or the floor.');
  apply();
  xr.renderer.setAnimationLoop(onFrame);
}

function refreshControllerHits() {
  const s = xr.session; if (!s || !s.requestHitTestSource) return;
  for (const src of s.inputSources) {
    if (src.targetRayMode !== 'tracked-pointer' || xr.ctrlHit.has(src)) continue;
    xr.ctrlHit.set(src, null);
    s.requestHitTestSource({ space: src.targetRaySpace }).then((h) => xr.ctrlHit.set(src, h)).catch(() => {});
  }
  for (const src of [...xr.ctrlHit.keys()]) if (![...s.inputSources].includes(src)) { xr.ctrlHit.get(src)?.cancel?.(); xr.ctrlHit.delete(src); xr.lastHit.delete(src); }
}
const isHeadset = () => xr.session && [...xr.session.inputSources].some((s) => s.targetRayMode === 'tracked-pointer');
function setMsg(t) { const m = $('ar-msg'); m.textContent = t; m.style.display = t ? '' : 'none'; }
const scale = () => (state.full ? 1 : TABLE);
function setScale() { xr.house.root.scale.setScalar(scale()); }

const tmpM = new THREE.Matrix4(), up = new THREE.Vector3(), tmpQ = new THREE.Quaternion();
function poseOnSurface(frame, source) {
  const results = source ? frame.getHitTestResults(source) : [];
  for (const r of results) {
    const pose = r.getPose(xr.ref); if (!pose) continue;
    tmpM.fromArray(pose.transform.matrix);
    up.set(0, 1, 0).applyQuaternion(tmpQ.setFromRotationMatrix(tmpM));
    if (up.y > 0.75) return new THREE.Vector3().setFromMatrixPosition(tmpM);
  }
  return null;
}
function rayFloor(frame, src) {
  if (xr.refType !== 'local-floor') return null;
  const pose = frame.getPose(src.targetRaySpace, xr.ref); if (!pose) return null;
  const m = new THREE.Matrix4().fromArray(pose.transform.matrix);
  const o = new THREE.Vector3().setFromMatrixPosition(m);
  const d = new THREE.Vector3(0, 0, -1).transformDirection(m);
  if (d.y > -0.05) return null;
  const t = -o.y / d.y; return t > 0 && t < 30 ? o.addScaledVector(d, t) : null;
}
const raycaster = new THREE.Raycaster();
function panelHitFor(frame, src) {
  if (!xr.panel || !xr.panel.visible) return null;
  const pose = frame.getPose(src.targetRaySpace, xr.ref); if (!pose) return null;
  const m = new THREE.Matrix4().fromArray(pose.transform.matrix);
  raycaster.ray.origin.setFromMatrixPosition(m); raycaster.ray.direction.set(0, 0, -1).transformDirection(m);
  const hit = raycaster.intersectObjects(xr.panelItems, false)[0];
  return hit ? hit.object.userData.action : null;
}

// Puts the house at a spot, facing the viewer. Full size: the porch steps land on the spot.
const camPos = new THREE.Vector3();
function moveHouseTo(p) {
  const yaw = Math.atan2(camPos.x - p.x, camPos.z - p.z);
  xr.holder.position.copy(p);
  xr.holder.rotation.set(0, yaw, 0);
  const off = state.full ? 7.2 : 0;
  xr.house.root.position.set(0, state.full ? 0 : 0.18 * TABLE, -off);
  xr.holder.visible = true;
}

let lastT = 0;
function onFrame(t, frame) {
  const dt = Math.min((t - lastT) / 1000, 0.1) || 0; lastT = t;
  if (!frame) { xr.renderer.render(xr.scene, xr.camera); return; }
  xr.ref = xr.renderer.xr.getReferenceSpace();
  xr.renderer.xr.getCamera().getWorldPosition(camPos);
  let target = null;
  if (isHeadset()) {
    buildPanel(frame);
    let hover = null;
    for (const src of xr.session.inputSources) {
      if (src.targetRayMode !== 'tracked-pointer') continue;
      const a = panelHitFor(frame, src);
      if (a) { hover = a; xr.lastHit.set(src, null); continue; }
      const p = poseOnSurface(frame, xr.ctrlHit.get(src)) || rayFloor(frame, src);
      xr.lastHit.set(src, p); if (p && !target) target = p;
      const ax = src.gamepad?.axes; const x = ax && ax.length >= 4 ? ax[2] : 0;
      if (Math.abs(x) > 0.5 && xr.holder.visible) xr.holder.rotation.y -= x * dt * 1.8;
    }
    xr.panelItems.forEach((o) => o.scale.setScalar(o.userData.action === hover ? 1.1 : 1));
    xr.rays.forEach(({ controller, line }) => {
      const src = controller.userData.source; if (!src) return;
      const p = xr.lastHit.get(src); line.scale.z = p ? Math.max(0.05, controller.position.distanceTo(p)) : 1.5;
    });
    xr.reticle.visible = !!target;
  } else {
    if (xr.panel) xr.panel.visible = false;
    target = poseOnSurface(frame, xr.viewerHit);
    xr.reticle.visible = !!target && xr.following;
    if (xr.following) {
      if (target) { moveHouseTo(target); setMsg('Tap to set the house down here.'); }
      else if (!xr.holder.visible) setMsg('Move your phone slowly to find a table or the floor.');
    }
  }
  if (target) xr.reticle.position.copy(target);
  xr.target = target;
  stepRoof(xr.house, dt);
  xr.renderer.render(xr.scene, xr.camera);
}

function onSelect(e) {
  const src = e.inputSource;
  if (src.targetRayMode === 'tracked-pointer') {
    const a = panelHitFor(e.frame, src);
    if (a) { panelAction(a); return; }
    const p = xr.lastHit.get(src); if (p) { moveHouseTo(p.clone()); xr.following = false; }
    return;
  }
  if (xr.following && xr.holder.visible) {
    xr.following = false; xr.reticle.visible = false;
    setMsg(state.full ? 'Walk around the house. Tap Table size to shrink it back.' : 'Walk around it. Lift the roof to see the rooms.');
    setTimeout(() => { if (!xr.following) setMsg(''); }, 4000);
  }
}

function toggleSize() {
  state.full = !state.full; setScale(); apply();
  xr.house.root.position.set(0, state.full ? 0 : 0.18 * TABLE, state.full ? -7.2 : 0); // full size: porch steps stay on the spot
  setMsg(state.full ? 'Full size. Step back or walk in. It works best outside or in a big room.' : 'Back to table size.');
  setTimeout(() => setMsg(''), 3500);
}
$('ar-size').addEventListener('click', toggleSize);
$('ar-turn').addEventListener('click', () => { xr.holder.rotation.y += Math.PI / 4; });
$('ar-move').addEventListener('click', () => { xr.following = true; setMsg('Point at a new spot, then tap.'); });
$('ar-exit').addEventListener('click', () => xr.session?.end());

function onEnd() {
  xr.renderer.setAnimationLoop(null);
  if (xr.panel) { xr.scene.remove(xr.panel); xr.panel = null; xr.panelItems = []; }
  xr.ctrlHit.clear(); xr.lastHit.clear(); xr.viewerHit = null; xr.session = null; xr.panelPlaced = false;
  xr.holder.visible = false; state.full = false; setScale();
  $('ar-ui').classList.remove('on');
  xr.renderer.domElement.style.display = 'none';
  apply();
}

// ---------- Quest: a floating panel of buttons ----------
const PANEL = [['roof', 'Lift the roof'], ['finish', 'Finish'], ['night', 'Night'], ['size', 'Full size'], ['turn', 'Turn'], ['exit', 'Exit']];
function panelText(a) {
  if (a === 'roof') return state.roof ? 'Roof on' : 'Lift the roof';
  if (a === 'finish') return FINISHES[state.finish].label;
  if (a === 'night') return state.night ? 'Daytime' : 'Night';
  if (a === 'size') return state.full ? 'Table size' : 'Full size';
  if (a === 'turn') return 'Turn';
  return 'Exit';
}
function refreshPanel() {
  xr.panelItems.forEach((b) => {
    const a = b.userData.action;
    b.material.map?.dispose();
    b.material.map = labelTexture(panelText(a), a === 'exit' ? { bg: '#ffffff', fg: '#22252b', font: '700 54px "Manrope", system-ui, sans-serif' } : { bg: 'rgba(34,37,43,0.9)', fg: '#ffffff' });
    b.material.needsUpdate = true;
  });
}
function buildPanel(frame) {
  if (!xr.panel) {
    const panel = new THREE.Group(); xr.panel = panel; xr.panelItems = [];
    const title = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.06), new THREE.MeshBasicMaterial({ map: labelTexture('The Stone Ridge Farmhouse', { w: 900, font: '600 52px "Manrope", system-ui, sans-serif' }), transparent: true }));
    title.position.set(0, 0.13, 0); panel.add(title);
    PANEL.forEach(([a], i) => {
      const b = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.05), new THREE.MeshBasicMaterial({ transparent: true }));
      b.userData.action = a; b.position.set(-0.22 + (i % 3) * 0.22, 0.05 - Math.floor(i / 3) * 0.065, 0);
      panel.add(b); xr.panelItems.push(b);
    });
    const tip = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.035), new THREE.MeshBasicMaterial({ map: labelTexture('Point at a table or the floor and pull the trigger · Thumbstick turns · Grip moves this panel', { w: 1500, h: 84, font: '500 30px "Manrope", system-ui, sans-serif', bg: 'rgba(23,28,44,0.8)', fg: '#ffffff' }), transparent: true }));
    tip.position.set(0, -0.11, 0); panel.add(tip);
    xr.scene.add(panel); refreshPanel();
  }
  xr.panel.visible = true;
  if (!xr.panelPlaced) {
    const view = frame.getViewerPose(xr.ref); if (!view) return;
    const m = new THREE.Matrix4().fromArray(view.transform.matrix);
    const head = new THREE.Vector3().setFromMatrixPosition(m);
    const fwd = new THREE.Vector3(0, 0, -1).transformDirection(m); fwd.y = 0; fwd.normalize();
    const left = new THREE.Vector3(fwd.z, 0, -fwd.x);
    xr.panel.position.copy(head).addScaledVector(fwd, 0.55).addScaledVector(left, 0.28); xr.panel.position.y = head.y - 0.3;
    xr.panel.lookAt(head.x, xr.panel.position.y, head.z);
    xr.panel.rotateX(-0.35);
    xr.panelPlaced = true;
  }
}
function panelAction(a) {
  if (a === 'roof') state.roof = !state.roof;
  else if (a === 'finish') { nextFinish(); return; }
  else if (a === 'night') state.night = !state.night;
  else if (a === 'size') { toggleSize(); return; }
  else if (a === 'turn') { xr.holder.rotation.y += Math.PI / 4; return; }
  else if (a === 'exit') { xr.session?.end(); return; }
  apply();
}

apply();
