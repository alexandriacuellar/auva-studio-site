// See it in your room: a WebXR AR product demo for a fictional store.
// Phones with WebXR (Android Chrome) and Meta Quest 3 get a three.js AR session with hit testing,
// where people place several products at real size. iPhones and other phones fall back to
// model-viewer (Quick Look or Scene Viewer). Desktops get a QR code.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const PRODUCTS = [
  { id: 'dress-form', short: 'Dress form', name: "Tailor's dress form", dept: 'Tailoring', price: '$285', size: '61 in tall',
    blurb: 'Linen-covered and pinnable, on a walnut tripod with brass feet. See how it fits by your window before it leaves the shop.' },
  { id: 'step-stool', short: 'Step stool', name: 'Oak step stool', dept: 'Dry goods', price: '$165', size: '18 in tall',
    blurb: 'Two steps of solid oak, made in the Catskills. Check that it tucks beside your counter before you carry it home.' },
  { id: 'market-basket', short: 'Market basket', name: 'Willow market basket', dept: 'Dry goods', price: '$68', size: '16 in wide',
    blurb: 'Hand-woven willow with a bentwood handle and a linen liner. Big enough for a market run, small enough for a shelf.' },
  { id: 'honey-crock', short: 'Honey crock', name: 'Local honey crock', dept: 'Apothecary', price: '$14', size: '6 in tall',
    blurb: 'Raw Ulster County honey in a glazed stoneware crock, with a wooden dipper. Set it on your table to see the size.' },
  { id: 'table-lamp', short: 'Table lamp', name: 'Enamel table lamp', dept: 'Home', price: '$120', size: '20 in tall',
    blurb: 'Indigo enamel base, brass stem, and a linen shade. Try it on your nightstand or desk before you decide.' },
];

const $ = (id) => document.getElementById(id);
const viewer = $('viewer');
let current = 0;

// ---------- Page: product picker + model-viewer ----------
function chipsInto(el, onPick) {
  el.innerHTML = '';
  PRODUCTS.forEach((p, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.dataset.i = i;
    b.innerHTML = `<img src="./thumbs/${p.id}.webp" alt="" width="36" height="36">${p.short}`;
    b.addEventListener('click', () => onPick(i));
    el.appendChild(b);
  });
}
function markChips() {
  document.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === current)));
}
function choose(i) {
  current = i;
  const p = PRODUCTS[i];
  viewer.src = `./models/${p.id}.glb`;
  viewer.alt = `${p.name} in 3D`;
  viewer.setAttribute('ar-placement', 'floor');
  $('dept').textContent = p.dept; $('name').textContent = p.name; $('price').textContent = p.price;
  $('blurb').textContent = p.blurb; $('size-tag').textContent = p.size;
  markChips();
  if (xr.session) onProductChange();
}
chipsInto($('chips'), choose);
chipsInto($('ar-chips'), choose);
markChips();

const xrSupported = navigator.xr ? navigator.xr.isSessionSupported('immersive-ar').catch(() => false) : Promise.resolve(false);
xrSupported.then((ok) => { if (ok) $('hint').textContent = 'Full size, right in your space. No app needed.'; });

$('ar-start').addEventListener('click', async () => {
  if (await xrSupported) { startXR().catch(xrFailed); return; }
  if (viewer.canActivateAR) { viewer.activateAR(); return; }
  $('qr').classList.add('show');
  $('hint').textContent = 'This device can’t open the camera view. Use the code below.';
});

function xrFailed(err) {
  console.warn(err);
  if (viewer.canActivateAR) viewer.activateAR();
  else $('hint').textContent = 'The camera view didn’t start. Check that this site can use your camera, then try again.';
}

// ---------- AR session ----------
const xr = { session: null, renderer: null, scene: null, camera: null, ref: null, refType: 'local',
  viewerHit: null, ctrlHit: new Map(), lastHit: new Map(), placed: [], ghost: null, ghostFor: -1,
  reticle: null, shelf: null, shelfItems: [], shelfPlaced: false, rays: [], active: null, turnCooldown: 0 };
if (location.search.includes('debug')) window.__arDemo = xr;
const loader = new GLTFLoader();
const models = new Map();
const loadModel = (id) => {
  if (!models.has(id)) models.set(id, loader.loadAsync(`./models/${id}.glb`).then((g) => {
    const root = g.scene;
    const box = new THREE.Box3().setFromObject(root);
    root.userData.size = box.getSize(new THREE.Vector3());
    root.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.frustumCulled = false; } });
    return root;
  }));
  return models.get(id);
};

function shadowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'); const r = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  r.addColorStop(0, 'rgba(0,0,0,0.55)'); r.addColorStop(0.6, 'rgba(0,0,0,0.22)'); r.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function labelTexture(text, { w = 512, h = 128, bg = 'rgba(251,250,247,0.95)', fg = '#1f2330', font = '600 52px "Instrument Sans", system-ui, sans-serif' } = {}) {
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

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7a66, 0.6));
  const sun = new THREE.DirectionalLight(0xfff4e0, 1.2); sun.position.set(1, 3, 2); scene.add(sun);
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.01, 40);

  const reticle = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.135, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
  const dot = new THREE.Mesh(new THREE.CircleGeometry(0.018, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xe8c27a }));
  reticle.add(ring, dot); reticle.visible = false; scene.add(reticle);

  // Controller rays for Quest (also works with hand-tracking pinch).
  for (let i = 0; i < 2; i++) {
    const c = renderer.xr.getController(i);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0xe8c27a, transparent: true, opacity: 0.8 }));
    line.scale.z = 1.5; line.visible = false; c.add(line); scene.add(c);
    c.addEventListener('connected', (e) => { line.visible = e.data.targetRayMode === 'tracked-pointer'; c.userData.source = e.data; });
    c.addEventListener('disconnected', () => { line.visible = false; c.userData.source = null; });
    xr.rays.push({ controller: c, line });
  }
  addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
  Object.assign(xr, { renderer, scene, camera, reticle, shadowTex: shadowTexture() });
}

async function startXR() {
  if (!xr.renderer) initThree();
  const session = await navigator.xr.requestSession('immersive-ar', {
    optionalFeatures: ['hit-test', 'local-floor', 'dom-overlay'],
    domOverlay: { root: $('ar-ui') },
  });
  // Use the floor as height zero when the device knows where it is (Quest does).
  try { await session.requestReferenceSpace('local-floor'); xr.refType = 'local-floor'; } catch { xr.refType = 'local'; }
  xr.renderer.xr.setReferenceSpaceType(xr.refType);
  await xr.renderer.xr.setSession(session);
  xr.session = session;
  xr.renderer.domElement.style.display = 'block';
  xr.overlay = !!session.domOverlayState;
  $('ar-ui').classList.add('on');
  document.querySelectorAll('#ar-bar button').forEach((b) => b.addEventListener('beforexrselect', (e) => e.preventDefault()));
  $('ar-bar').addEventListener('beforexrselect', (e) => e.preventDefault());

  if (session.requestHitTestSource) {
    session.requestReferenceSpace('viewer').then((v) => session.requestHitTestSource({ space: v })).then((h) => { xr.viewerHit = h; }).catch(() => {});
  }
  session.addEventListener('inputsourceschange', refreshControllerHits);
  refreshControllerHits();
  session.addEventListener('select', onSelect);
  session.addEventListener('squeeze', () => { xr.shelfPlaced = false; });
  session.addEventListener('end', onEnd);

  PRODUCTS.forEach((p) => loadModel(p.id));
  onProductChange();
  setMsg(xr.overlay ? 'Move your phone slowly to find the floor.' : '');
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

async function onProductChange() {
  const i = current;
  const root = await loadModel(PRODUCTS[i].id);
  if (i !== current || !xr.session) return;
  if (xr.ghost) xr.scene.remove(xr.ghost);
  const ghost = root.clone(true);
  ghost.traverse((o) => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.55; o.material.depthWrite = false; } });
  ghost.visible = false; xr.scene.add(ghost); xr.ghost = ghost; xr.ghostFor = i;
  if (xr.overlay && xr.reticle.visible) setMsg(`Tap to place the ${PRODUCTS[i].short.toLowerCase()}.`);
  updateShelfHighlight();
}

// Where each pointer (phone screen center or Quest controller) meets a surface this frame.
const tmpM = new THREE.Matrix4(), up = new THREE.Vector3(), tmpQ = new THREE.Quaternion(), tmpS = new THREE.Vector3();
function poseOnSurface(frame, source) {
  const results = source ? frame.getHitTestResults(source) : [];
  for (const r of results) {
    const pose = r.getPose(xr.ref); if (!pose) continue;
    tmpM.fromArray(pose.transform.matrix);
    up.set(0, 1, 0).applyQuaternion(tmpQ.setFromRotationMatrix(tmpM));
    if (up.y > 0.75) return new THREE.Vector3().setFromMatrixPosition(tmpM); // floors and tabletops only
  }
  return null;
}
function rayFloor(frame, src) {
  // Quest 2 (or no room setup): fall back to the floor plane at height zero.
  if (xr.refType !== 'local-floor') return null;
  const pose = frame.getPose(src.targetRaySpace, xr.ref); if (!pose) return null;
  const m = new THREE.Matrix4().fromArray(pose.transform.matrix);
  const o = new THREE.Vector3().setFromMatrixPosition(m);
  const d = new THREE.Vector3(0, 0, -1).transformDirection(m);
  if (d.y > -0.05) return null;
  const t = -o.y / d.y; return t > 0 && t < 8 ? o.addScaledVector(d, t) : null;
}

const raycaster = new THREE.Raycaster();
function sourceRay(frame, src) {
  const pose = frame.getPose(src.targetRaySpace, xr.ref); if (!pose) return null;
  const m = new THREE.Matrix4().fromArray(pose.transform.matrix);
  raycaster.ray.origin.setFromMatrixPosition(m);
  raycaster.ray.direction.set(0, 0, -1).transformDirection(m);
  return raycaster;
}
function shelfHitFor(frame, src) {
  if (!xr.shelf || !xr.shelf.visible) return null;
  const rc = sourceRay(frame, src); if (!rc) return null;
  const hit = rc.intersectObjects(xr.shelfItems, true)[0];
  if (!hit) return null;
  let o = hit.object; while (o && o.userData.action === undefined) o = o.parent;
  return o ? { action: o.userData.action, distance: hit.distance } : null;
}

let lastT = 0;
function onFrame(t, frame) {
  const dt = Math.min((t - lastT) / 1000, 0.1) || 0; lastT = t;
  if (!frame) { xr.renderer.render(xr.scene, xr.camera); return; }
  xr.ref = xr.renderer.xr.getReferenceSpace();
  const headset = isHeadset();
  const camPos = new THREE.Vector3(); xr.renderer.xr.getCamera().getWorldPosition(camPos);

  let target = null;
  if (headset) {
    buildShelf(frame);
    let hover = null;
    for (const src of xr.session.inputSources) {
      if (src.targetRayMode !== 'tracked-pointer') continue;
      const sh = shelfHitFor(frame, src);
      if (sh) { hover = sh.action; xr.lastHit.set(src, null); continue; }
      const p = poseOnSurface(frame, xr.ctrlHit.get(src)) || rayFloor(frame, src);
      xr.lastHit.set(src, p);
      if (p && (!xr.active || xr.active === src || !target)) target = p;
      // Thumbstick left/right turns the last piece placed.
      const ax = src.gamepad?.axes; const x = ax && ax.length >= 4 ? ax[2] : 0;
      if (Math.abs(x) > 0.5 && xr.placed.length) xr.placed[xr.placed.length - 1].rotation.y -= x * dt * 2.2;
    }
    hoverShelf(hover);
    xr.rays.forEach(({ controller, line }) => {
      const src = controller.userData.source; if (!src) return;
      const p = xr.lastHit.get(src); line.scale.z = p ? Math.max(0.05, controller.position.distanceTo(p)) : 1.5;
    });
  } else {
    if (xr.shelf) xr.shelf.visible = false;
    target = poseOnSurface(frame, xr.viewerHit);
    if (xr.overlay) {
      if (target && !xr.reticle.visible) setMsg(`Tap to place the ${PRODUCTS[current].short.toLowerCase()}.`);
      if (!target && xr.reticle.visible) setMsg('Move your phone slowly to find the floor or a table.');
    }
  }

  xr.reticle.visible = !!target;
  if (target) {
    xr.reticle.position.copy(target);
    if (xr.ghost && xr.ghostFor === current) {
      xr.ghost.visible = true; xr.ghost.position.copy(target);
      xr.ghost.rotation.set(0, Math.atan2(camPos.x - target.x, camPos.z - target.z), 0);
    }
  } else if (xr.ghost) xr.ghost.visible = false;
  xr.target = target;

  for (const o of xr.placed) if (o.userData.drop < 1) {
    o.userData.drop = Math.min(1, o.userData.drop + dt * 4);
    const k = 1 - Math.pow(1 - o.userData.drop, 3);
    o.position.y = o.userData.y + (1 - k) * 0.12; o.scale.setScalar(0.92 + 0.08 * k);
  }
  xr.renderer.render(xr.scene, xr.camera);
}

async function place(at) {
  const p = PRODUCTS[current];
  const root = await loadModel(p.id);
  const obj = root.clone(true);
  obj.position.copy(at); obj.rotation.y = xr.ghost ? xr.ghost.rotation.y : 0;
  obj.userData.y = at.y; obj.userData.drop = 0;
  const s = root.userData.size; const r = Math.max(s.x, s.z) * 0.75 + 0.04;
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(r * 2, r * 2).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: xr.shadowTex, transparent: true, depthWrite: false }));
  shadow.position.y = 0.002; obj.add(shadow);
  xr.scene.add(obj); xr.placed.push(obj);
  if (xr.placed.length > 12) xr.scene.remove(xr.placed.shift());
  $('ar-turn').disabled = $('ar-undo').disabled = false;
  if (xr.overlay) setMsg(`${p.short} placed. Tap to add another, or pick something else below.`);
  updateShelfHighlight();
}

function onSelect(e) {
  const src = e.inputSource;
  if (src.targetRayMode === 'tracked-pointer') {
    xr.active = src;
    const sh = shelfHitFor(e.frame, src);
    if (sh) { shelfAction(sh.action); return; }
    const p = xr.lastHit.get(src); if (p) place(p.clone());
    return;
  }
  if (xr.target) place(xr.target.clone());
}

function undo() { const o = xr.placed.pop(); if (o) xr.scene.remove(o); if (!xr.placed.length) $('ar-turn').disabled = $('ar-undo').disabled = true; }
function turn() { const o = xr.placed[xr.placed.length - 1]; if (o) o.rotation.y += Math.PI / 4; }
$('ar-undo').addEventListener('click', undo);
$('ar-turn').addEventListener('click', turn);
$('ar-done').addEventListener('click', () => xr.session?.end());

function onEnd() {
  xr.renderer.setAnimationLoop(null);
  xr.placed.forEach((o) => xr.scene.remove(o)); xr.placed = [];
  if (xr.ghost) { xr.scene.remove(xr.ghost); xr.ghost = null; }
  if (xr.shelf) { xr.scene.remove(xr.shelf); xr.shelf = null; xr.shelfItems = []; }
  xr.ctrlHit.clear(); xr.lastHit.clear(); xr.viewerHit = null; xr.session = null; xr.shelfPlaced = false; xr.active = null;
  $('ar-ui').classList.remove('on');
  xr.renderer.domElement.style.display = 'none';
  $('ar-turn').disabled = $('ar-undo').disabled = true;
}

// ---------- Quest menu: a small floating shelf of products ----------
function buildShelf(frame) {
  if (!xr.shelf) {
    const shelf = new THREE.Group(); xr.shelf = shelf; xr.shelfItems = [];
    const board = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.012, 0.16), new THREE.MeshStandardMaterial({ color: 0xc79a63, roughness: 0.6 }));
    board.position.set(0, -0.005, 0); shelf.add(board);
    const title = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.06), new THREE.MeshBasicMaterial({ map: labelTexture('Rondout Mercantile', { font: 'italic 58px "Instrument Serif", Georgia, serif', w: 640 }), transparent: true }));
    title.position.set(0, 0.24, -0.04); shelf.add(title);
    PRODUCTS.forEach((p, i) => {
      const slot = new THREE.Group(); slot.userData.action = `pick:${i}`; slot.position.set(-0.34 + i * 0.17, 0, 0);
      const hitBox = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.15), new THREE.MeshBasicMaterial({ visible: false }));
      hitBox.position.y = 0.08; slot.add(hitBox);
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.008, 40), new THREE.MeshStandardMaterial({ color: 0xfbfaf7, roughness: 0.8 }));
      pad.position.y = 0.006; pad.name = 'pad'; slot.add(pad);
      loadModel(p.id).then((root) => {
        const m = root.clone(true); const s = root.userData.size;
        const k = 0.12 / Math.max(s.x, s.y, s.z); m.scale.setScalar(k); m.position.y = 0.01; m.name = 'mini'; slot.add(m);
      });
      const lab = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.0375), new THREE.MeshBasicMaterial({ map: labelTexture(p.short), transparent: true }));
      lab.position.set(0, -0.04, 0.085); lab.rotation.x = -0.5; slot.add(lab);
      shelf.add(slot); xr.shelfItems.push(slot);
    });
    [['Undo', 'undo', -0.22], ['Clear all', 'clear', 0], ['Done', 'done', 0.22]].forEach(([text, action, x]) => {
      const b = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.045), new THREE.MeshBasicMaterial({ map: labelTexture(text, action === 'done' ? { bg: '#2c3f73', fg: '#ffffff' } : {}), transparent: true }));
      b.userData.action = action; b.position.set(x, -0.11, 0.06); b.rotation.x = -0.5; shelf.add(b); xr.shelfItems.push(b);
    });
    const tip = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.04), new THREE.MeshBasicMaterial({ map: labelTexture('Point and pull the trigger to place · Thumbstick turns · Grip moves this shelf', { w: 1400, h: 92, font: '500 34px "Instrument Sans", system-ui, sans-serif', bg: 'rgba(23,28,44,0.8)', fg: '#ffffff' }), transparent: true }));
    tip.position.set(0, -0.17, 0.08); tip.rotation.x = -0.5; shelf.add(tip);
    xr.scene.add(shelf); updateShelfHighlight();
  }
  xr.shelf.visible = true;
  if (!xr.shelfPlaced) {
    const view = frame.getViewerPose(xr.ref); if (!view) return;
    const m = new THREE.Matrix4().fromArray(view.transform.matrix);
    const head = new THREE.Vector3().setFromMatrixPosition(m);
    const fwd = new THREE.Vector3(0, 0, -1).transformDirection(m); fwd.y = 0; fwd.normalize();
    xr.shelf.position.copy(head).addScaledVector(fwd, 0.5); xr.shelf.position.y = head.y - 0.45;
    xr.shelf.scale.setScalar(0.75);
    xr.shelf.rotation.set(0, Math.atan2(-fwd.x, -fwd.z), 0);
    xr.shelfPlaced = true;
  }
}
function updateShelfHighlight() {
  xr.shelfItems.forEach((o) => {
    const pad = o.getObjectByName('pad'); if (!pad) return;
    pad.material.color.set(o.userData.action === `pick:${current}` ? 0xe8c27a : 0xfbfaf7);
  });
}
function hoverShelf(action) {
  xr.shelfItems.forEach((o) => { const on = o.userData.action === action; o.scale.setScalar(on ? 1.12 : 1); });
}
function shelfAction(a) {
  if (a.startsWith('pick:')) choose(+a.slice(5));
  else if (a === 'undo') undo();
  else if (a === 'clear') { while (xr.placed.length) undo(); }
  else if (a === 'done') xr.session?.end();
}
