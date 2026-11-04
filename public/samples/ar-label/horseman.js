// Hollow Night Hard Cider: the Headless Horseman gallops off the label, rears up,
// throws his pumpkin at you, and the pumpkin bursts into the label's buttons.
// Shared by the camera AR (ar.js) and the on-phone preview (preview.js).
// Label space: the label is 1 unit wide and LABEL_H tall, centred on the origin, +y up, +z towards the viewer.
import * as THREE from 'three';

export const LABEL_H = 1.3;
const ORANGE = '#f08a2a', CREAM = '#f4e6c8', NIGHT = '#0b1030';

const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0, flatShading: false, ...extra });
const M = {
  horse: mat('#3f3a4c'), mane: mat('#1c1a24'), hoof: mat('#141318'),
  eye: new THREE.MeshBasicMaterial({ color: '#ffb347' }),
  coat: mat('#2f3346'), cloak: mat('#8a2140', { side: THREE.DoubleSide }), boot: mat('#18171d'),
  glove: mat('#24222b'), saddle: mat('#7a4526'), rein: mat('#5a3420'), collarIn: mat('#0c0b10', { side: THREE.BackSide }),
  stem: mat('#5b6b2e'),
};

const tex = (c) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t; };
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; };
const font = (w, px) => `${w} ${px}px "DM Sans", Arial, sans-serif`;
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const ease = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
const easeOutBack = (x) => { x = clamp01(x); return 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2); };

// A cylinder from a to b (2D in the horse's side plane, z kept)
function limb(r1, r2, len, material, seg = 18) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, seg), material);
  m.position.y = -len / 2; return m;
}
const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
function blob(r, sx, sy, sz, material, seg = 28) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), material);
  m.scale.set(sx, sy, sz); return m;
}

// The jack-o'-lantern: a ribbed pumpkin with a glowing carved face
function makePumpkin() {
  const g = new THREE.SphereGeometry(1, 28, 18);
  const p = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const az = Math.atan2(v.z, v.x);
    const k = 1 + 0.07 * Math.cos(az * 8);
    v.x *= k; v.z *= k; v.y *= 0.82;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  // Face texture: orange skin, the carved eyes and grin glow
  // On a three sphere, u = 0.25 faces +z, towards the viewer.
  const face = (ex, cx) => {
    ex.fillStyle = '#ffd36b';
    const tri = (pts) => { ex.beginPath(); pts.forEach(([a, b], i) => i ? ex.lineTo(a, b) : ex.moveTo(a, b)); ex.closePath(); ex.fill(); };
    tri([[cx - 50, 100], [cx - 20, 100], [cx - 35, 72]]);
    tri([[cx + 20, 100], [cx + 50, 100], [cx + 35, 72]]);
    tri([[cx - 8, 122], [cx + 8, 122], [cx, 108]]);
    ex.beginPath(); ex.moveTo(cx - 62, 138);
    [[cx - 44, 152], [cx - 34, 142], [cx - 18, 158], [cx, 146], [cx + 18, 158], [cx + 34, 142], [cx + 44, 152], [cx + 62, 138]].forEach(([a, b]) => ex.lineTo(a, b));
    ex.quadraticCurveTo(cx, 200, cx - 62, 138); ex.fill();
  };
  const [c, x] = canvas(512, 256);
  x.fillStyle = '#e8731c'; x.fillRect(0, 0, 512, 256);
  for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? 'rgba(150,60,10,0.25)' : 'rgba(255,170,80,0.18)'; x.fillRect(i * 32, 0, 6, 256); }
  face(x, 128);
  const [e, ex] = canvas(512, 256);
  ex.fillStyle = '#000'; ex.fillRect(0, 0, 512, 256); face(ex, 128);
  const pm = new THREE.MeshStandardMaterial({ map: tex(c), emissiveMap: tex(e), emissive: '#ffb347', emissiveIntensity: 1.6, roughness: 0.6, flatShading: false });
  const body = new THREE.Mesh(g, pm);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.13, 0.32, 10), M.stem);
  stem.position.y = 0.92; stem.rotation.z = 0.25;
  const pumpkin = new THREE.Group(); pumpkin.add(body, stem);
  const light = new THREE.PointLight('#ff9a3c', 1.4, 2.2, 1.6);
  pumpkin.add(light); pumpkin.userData.light = light;
  return pumpkin;
}

function makeHorse() {
  const horse = new THREE.Group();          // feet on y = 0, facing +x
  const pitch = new THREE.Group();          // rears up around the back hips
  pitch.position.set(-0.58, 1.18, 0); horse.add(pitch);
  const body = new THREE.Group(); body.position.set(0.58, 0, 0); pitch.add(body); // body coords: origin under the middle at hip height

  // One smooth barrel, with chest and rump blended in
  const barrel = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 1.0, 12, 32), M.horse);
  barrel.rotation.z = Math.PI / 2; barrel.scale.set(1, 1, 0.88); barrel.position.set(0, 0.27, 0); body.add(barrel);
  body.add(at(blob(0.4, 1, 1.02, 0.86, M.horse, 32), 0.5, 0.31, 0));
  body.add(at(blob(0.42, 1, 1, 0.9, M.horse, 32), -0.52, 0.32, 0));

  // Neck and head bob together
  const neck = new THREE.Group(); neck.position.set(0.7, 0.45, 0); body.add(neck);
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.3, 0.85, 20, 4), M.horse);
  neckMesh.rotation.z = -0.62; neckMesh.position.set(0.24, 0.34, 0); neck.add(neckMesh);
  const head = new THREE.Group(); head.position.set(0.5, 0.72, 0); neck.add(head);
  const skull = blob(0.19, 1.1, 0.95, 0.8, M.horse); head.add(skull);
  // The face runs forward and down from the poll to the nose
  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.1, 0.5, 20, 3), M.horse);
  muzzle.rotation.z = 0.69; muzzle.position.set(0.16, -0.19, 0); head.add(muzzle);
  head.add(at(blob(0.11, 1.1, 0.9, 1, M.horse), 0.3, -0.36, 0));
  for (const s of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 12), M.horse);
    ear.position.set(-0.08, 0.2, s * 0.08); ear.rotation.set(s * -0.2, 0, -0.3); head.add(ear);
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), M.eye);
    eye.position.set(0.05, 0.04, s * 0.14); head.add(eye);
  }
  // Mane: dark blades along the top of the neck
  const mane = [];
  for (let i = 0; i < 7; i++) {
    const b = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.26, 12), M.mane); b.scale.z = 0.45;
    const k = i / 6;
    b.position.set(0.02 + k * 0.42, 0.3 + k * 0.5, 0); b.rotation.z = 0.9;
    neck.add(b); mane.push(b);
  }

  // Tail: a chain of tapering segments that swings
  const tail = []; let parent = new THREE.Group(); parent.position.set(-1, 0.42, 0); parent.rotation.z = -2.3; body.add(parent);
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Group(); seg.add(limb(0.09 - i * 0.015, 0.07 - i * 0.012, 0.24, M.mane, 14)); seg.add(blob(0.09 - i * 0.015, 1, 1, 1, M.mane, 16));
    if (i) seg.position.y = -0.24; parent.add(seg); tail.push(seg); parent = seg;
  }

  // Legs: hip, knee, hoof. Front legs bend back at the knee, back legs fold forward.
  const legs = [];
  for (const [x, z, front] of [[0.55, 0.17, true], [0.55, -0.17, true], [-0.58, 0.17, false], [-0.58, -0.17, false]]) {
    const hip = new THREE.Group(); hip.position.set(x, 0.02, z); body.add(hip);
    hip.add(limb(front ? 0.13 : 0.17, 0.08, 0.56, M.horse));
    const knee = new THREE.Group(); knee.position.y = -0.56; hip.add(knee);
    knee.add(blob(front ? 0.085 : 0.095, 1, 1, 1, M.horse, 20));
    knee.add(limb(0.075, 0.06, 0.52, M.horse));
    knee.add(at(blob(0.07, 1, 1, 1, M.horse, 18), 0, -0.47, 0)); // fetlock
    const hoof = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.095, 0.1, 16), M.hoof); hoof.position.y = -0.56; knee.add(hoof);
    legs.push({ hip, knee, front, phase: 0 });
  }
  legs[0].phase = 0.48; legs[1].phase = 0.58; legs[2].phase = 0.0; legs[3].phase = 0.1;

  // The rider: coat, high empty collar, wine cloak, one arm up for the pumpkin
  const rider = new THREE.Group(); rider.position.set(-0.08, 0.62, 0); rider.scale.setScalar(1.25); body.add(rider);
  const saddle = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.08, 28), M.saddle); saddle.scale.set(1.05, 1, 0.95); saddle.position.y = 0.0; rider.add(saddle);
  const torso = new THREE.Group(); torso.position.y = 0.05; torso.rotation.z = -0.12; rider.add(torso);
  const chest = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.42, 8, 24), M.coat); chest.position.y = 0.36; chest.scale.z = 0.85; torso.add(chest);
  const coatSkirt = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.32, 0.3, 28, 2, true), M.coat);
  coatSkirt.material = M.coat.clone(); coatSkirt.material.side = THREE.DoubleSide; coatSkirt.position.y = 0.08; torso.add(coatSkirt);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.12, 0.2, 28, 2, true), M.coat.clone());
  collar.material.side = THREE.DoubleSide; collar.position.y = 0.74; torso.add(collar);
  const collarDark = new THREE.Mesh(new THREE.CircleGeometry(0.115, 24), M.collarIn); collarDark.rotation.x = Math.PI / 2; collarDark.position.y = 0.7; torso.add(collarDark);
  // Shoulders a touch wider than the chest
  torso.add(at(blob(0.12, 1, 0.8, 2.1, M.coat), 0, 0.62, 0));
  // Thighs and boots down each side of the horse
  for (const s of [-1, 1]) {
    const thigh = new THREE.Group(); thigh.position.set(0.0, 0.06, s * 0.2); thigh.rotation.set(-s * 0.3, 0, 0.8); rider.add(thigh);
    thigh.add(limb(0.08, 0.07, 0.36, M.coat));
    const shin = new THREE.Group(); shin.position.y = -0.36; shin.rotation.set(s * 0.2, 0, -0.95); thigh.add(shin); shin.add(blob(0.075, 1, 1, 1, M.coat, 18));
    shin.add(limb(0.07, 0.065, 0.38, M.boot));
  }
  // Left arm forward to the reins
  const armL = new THREE.Group(); armL.position.set(0.02, 0.6, -0.22); armL.rotation.set(0.15, 0, 0.9); torso.add(armL);
  armL.add(limb(0.06, 0.055, 0.32, M.coat));
  const foreL = new THREE.Group(); foreL.position.y = -0.32; foreL.rotation.z = 0.5; armL.add(foreL); foreL.add(blob(0.058, 1, 1, 1, M.coat, 18)); armL.add(blob(0.07, 1, 1, 1, M.coat, 18));
  foreL.add(limb(0.055, 0.05, 0.3, M.coat)); foreL.add(at(blob(0.06, 1, 1, 1, M.glove), 0, -0.32, 0));
  // Right arm: holds the pumpkin up high
  const armR = new THREE.Group(); armR.position.set(0, 0.62, 0.22); torso.add(armR);
  armR.add(limb(0.06, 0.055, 0.32, M.coat));
  const foreR = new THREE.Group(); foreR.position.y = -0.32; armR.add(foreR); foreR.add(blob(0.058, 1, 1, 1, M.coat, 18)); armR.add(blob(0.07, 1, 1, 1, M.coat, 18));
  foreR.add(limb(0.055, 0.05, 0.3, M.coat));
  const hand = new THREE.Group(); hand.position.y = -0.33; foreR.add(hand);
  hand.add(blob(0.06, 1, 1, 1, M.glove));
  // Reins from the left hand to the head
  const rein = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 8), M.rein); body.add(rein);

  // Cloak: hangs from the shoulders and streams back with speed
  const cloakGeo = new THREE.PlaneGeometry(0.6, 1.0, 12, 20);
  cloakGeo.translate(0, -0.5, 0);
  const cloak = new THREE.Mesh(cloakGeo, M.cloak);
  const cloakRoot = new THREE.Group(); cloakRoot.position.set(-0.13, 0.68, 0); cloakRoot.rotation.y = -Math.PI / 2; torso.add(cloakRoot); cloakRoot.add(cloak);
  const cloakBase = Float32Array.from(cloakGeo.attributes.position.array);

  // An invisible, generous box to tap the horse and rider
  const hit = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.9, 0.9), new THREE.MeshBasicMaterial({ visible: false }));
  hit.position.set(0, 1.45, 0); horse.add(hit);

  return { horse, pitch, body, neck, head, mane, tail, legs, rider, torso, armR, foreR, hand, armL, foreL, rein, cloak, cloakBase, hit };
}

// Pill buttons drawn on canvas, like the business-card demo
function pill(label, { fill, ink, w = 820 }) {
  const [c, g] = canvas(w, 168);
  g.shadowColor = 'rgba(0,0,0,0.4)'; g.shadowBlur = 20; g.shadowOffsetY = 6;
  g.fillStyle = fill; g.beginPath(); g.roundRect(12, 12, w - 24, 132, 66); g.fill();
  g.shadowColor = 'transparent'; g.fillStyle = ink; g.font = font(700, 52); g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(label, w / 2, 80, w - 80);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(c), transparent: true, depthWrite: false, depthTest: false }));
  s.renderOrder = 10;
  const sw = 0.82 * w / 820; s.scale.set(sw, sw * 168 / w, 1); s.userData.base = s.scale.clone();
  return s;
}

function softDot(color, inner = 0.6) {
  const [c, g] = canvas(128, 128);
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, color); gr.addColorStop(inner, color.replace(/[\d.]+\)$/, '0.25)')); gr.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return tex(c);
}

function batTexture() {
  const [c, g] = canvas(256, 128);
  g.fillStyle = '#07080f';
  g.beginPath(); g.moveTo(128, 50);
  g.quadraticCurveTo(90, 20, 10, 30); g.quadraticCurveTo(30, 50, 26, 70); g.quadraticCurveTo(50, 58, 62, 76); g.quadraticCurveTo(80, 62, 96, 84); g.quadraticCurveTo(112, 70, 128, 92);
  g.quadraticCurveTo(144, 70, 160, 84); g.quadraticCurveTo(176, 62, 194, 76); g.quadraticCurveTo(206, 58, 230, 70); g.quadraticCurveTo(226, 50, 246, 30); g.quadraticCurveTo(166, 20, 128, 50);
  g.fill();
  g.beginPath(); g.ellipse(128, 62, 13, 22, 0, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.moveTo(118, 44); g.lineTo(121, 30); g.lineTo(126, 42); g.moveTo(130, 42); g.lineTo(135, 30); g.lineTo(138, 44); g.fill();
  return tex(c);
}

// Build the whole show. groundY is where the hooves land, in label units.
export async function buildShow({ groundY = -0.5, onAction = () => {}, labels = {} } = {}) {
  await document.fonts?.ready;
  const T = { tasting: 'Tasting notes', store: 'Find a store', ask: 'Want this for your label?', ...labels };
  const root = new THREE.Group();
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Moonlight from behind and above, warm fill from the pumpkin, soft sky
  root.add(new THREE.HemisphereLight('#a9b8ff', '#2a1a10', 1.5));
  const moon = new THREE.DirectionalLight('#cfd8ff', 2.2); moon.position.set(-1, 2, -1.2); root.add(moon);
  const front = new THREE.DirectionalLight('#ffd9b0', 0.9); front.position.set(0.8, 1, 2); root.add(front);

  const H = makeHorse();
  const S = 0.27;               // horse size in label units: about half the label wide
  const rig = new THREE.Group(); rig.scale.setScalar(S); rig.add(H.horse); root.add(rig);
  const pumpkin = makePumpkin(); pumpkin.scale.setScalar(0.17); H.hand.add(pumpkin); pumpkin.position.y = -0.12;

  // Shadow and mist on the ground
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.3), new THREE.MeshBasicMaterial({ map: softDot('rgba(0,0,0,0.6)'), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2; root.add(shadow);
  const mistTex = softDot('rgba(200,212,255,0.35)', 0.3);
  const mist = Array.from({ length: 16 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: mistTex, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData = { a: (i / 16) * Math.PI * 2, r: 0.2 + (i % 4) * 0.08, sp: 0.08 + (i % 3) * 0.03, sz: 0.16 + (i % 5) * 0.035 };
    root.add(s); return s;
  });
  // Bats circling over the label
  const batTex = batTexture();
  const bats = Array.from({ length: 4 }, (_, i) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: batTex, transparent: true, depthWrite: false, opacity: 0 }));
    s.userData = { a: i * 1.7, r: 0.38 + i * 0.07, h: 0.32 + (i % 2) * 0.16, sp: 0.6 + i * 0.12, f: 9 + i };
    root.add(s); return s;
  });
  // Sparks when the pumpkin bursts
  const N = 70, sparkPos = new Float32Array(N * 3), sparkVel = [];
  const sparkGeo = new THREE.BufferGeometry(); sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
  const sparks = new THREE.Points(sparkGeo, new THREE.PointsMaterial({ map: softDot('rgba(255,190,90,1)', 0.25), size: 0.05, transparent: true, depthWrite: false, opacity: 0, blending: THREE.AdditiveBlending }));
  sparks.frustumCulled = false; root.add(sparks);
  for (let i = 0; i < N; i++) { const v = new THREE.Vector3().randomDirection(); sparkVel.push(v.multiplyScalar(0.25 + Math.random() * 0.45)); }

  // The buttons the pumpkin turns into
  const buttons = [
    pill(T.tasting, { fill: CREAM, ink: NIGHT }),
    pill(T.store, { fill: CREAM, ink: NIGHT }),
    pill(T.ask, { fill: ORANGE, ink: NIGHT, w: 900 }),
  ];
  ['tasting', 'store', 'ask'].forEach((id, i) => { buttons[i].userData.action = id; root.add(buttons[i]); });
  const burstAt = new THREE.Vector3(0, groundY + 0.98, 0.8);
  // In front of the label and close to the viewer, so they read big and are easy to tap
  const slots = [new THREE.Vector3(0, groundY + 1.2, 0.8), new THREE.Vector3(0, groundY + 1.0, 0.8), new THREE.Vector3(0, groundY + 0.8, 0.8)];

  // Timeline (seconds)
  const C = new THREE.Vector3(0, groundY, 0.42), R = 0.36;
  const EMERGE = 1.0, RIDE = 4.6, REAR = 1.3, FLY = 0.75;
  const tRide = EMERGE, tRear = tRide + RIDE, tToss = tRear + 0.75, tBurst = tToss + FLY;
  const moonSpot = new THREE.Vector3(0, 0.05, 0.02);
  let t0 = performance.now() / 1000, thrown = false, flyFrom = new THREE.Vector3();
  const replay = () => { t0 = performance.now() / 1000; thrown = false; H.hand.add(pumpkin); pumpkin.position.set(0, -0.12, 0); pumpkin.rotation.set(0, 0, 0); pumpkin.scale.setScalar(0.17); pumpkin.visible = true; };

  const pathAt = (k) => { // k 0..1 over 1.5 laps, ending front centre heading +x
    const a = Math.PI + k * Math.PI * 3;
    return new THREE.Vector3(C.x + R * Math.sin(a), C.y, C.z + R * Math.cos(a));
  };
  const tmp = new THREE.Vector3(), qa = new THREE.Quaternion(), qb = new THREE.Quaternion();

  function poseGallop(time, amt) {
    const f = 2.3;
    for (const L of H.legs) {
      const ph = (time * f + L.phase) * Math.PI * 2;
      L.hip.rotation.z = Math.sin(ph) * 0.62 * amt;
      L.knee.rotation.z = (L.front ? -1 : 0.7) * Math.max(0, Math.sin(ph + 1.3)) * 1.25 * amt;
    }
    H.body.position.y = Math.abs(Math.sin(time * f * Math.PI * 2)) * 0.08 * amt;
    H.body.rotation.z = Math.sin(time * f * Math.PI * 2 + 0.6) * 0.06 * amt;
    H.neck.rotation.z = Math.sin(time * f * Math.PI * 2 + 1.2) * 0.12 * amt;
    H.tail.forEach((s, i) => { s.rotation.z = 0.4 * amt + Math.sin(time * 9 - i) * 0.15; });
    H.mane.forEach((b, i) => { b.rotation.z = 0.9 + 0.4 * amt + Math.sin(time * 14 + i) * 0.12 * amt; });
  }
  function poseIdle(time) {
    for (const L of H.legs) { L.hip.rotation.z *= 0.85; L.knee.rotation.z *= 0.85; }
    // A paw at the ground every few seconds
    const paw = Math.max(0, Math.sin(time * 2.2)) * (Math.sin(time * 0.7) > 0.3 ? 1 : 0);
    H.legs[0].hip.rotation.z = paw * 0.5; H.legs[0].knee.rotation.z = -paw * 1.1;
    H.body.position.y = Math.sin(time * 1.6) * 0.01; H.body.rotation.z *= 0.9;
    H.neck.rotation.z = -0.08 + Math.sin(time * 1.3) * 0.08;
    H.tail.forEach((s, i) => { s.rotation.z = 0.1 + Math.sin(time * 2 - i * 0.7) * 0.12; });
    H.mane.forEach((b, i) => { b.rotation.z = 0.9 + Math.sin(time * 3 + i) * 0.05; });
  }
  function poseCloak(time, speed) {
    const p = H.cloak.geometry.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = H.cloakBase[i * 3], y = H.cloakBase[i * 3 + 1];
      const v = -y / 1.0; // 0 at the shoulders, 1 at the hem
      const flow = v * v * (0.15 + speed * 0.75);
      const wave = Math.sin(time * (6 + speed * 6) - v * 5 + x * 3) * 0.06 * v * (0.4 + speed);
      p.setXYZ(i, x * (1 + v * 0.3), y * (1 - flow * 0.35), flow * 0.9 + wave);
    }
    p.needsUpdate = true; H.cloak.geometry.computeVertexNormals();
  }
  // Arm up high holding the pumpkin, or wound back to throw
  function poseArm(up, wind) {
    H.armR.rotation.set(-0.35 * up, 0, Math.PI * (0.92 * up) - wind * 1.2);
    H.foreR.rotation.z = 0.25 * up + wind * 0.6;
  }

  // Pose a still frame for the label art (rearing, pumpkin raised)
  function freezeRearing() {
    rig.position.set(0, 0, 0); H.horse.rotation.y = 0; rig.scale.setScalar(1);
    H.pitch.rotation.z = 0.62;
    H.legs[0].hip.rotation.z = 0.9; H.legs[0].knee.rotation.z = -1.6; H.legs[1].hip.rotation.z = 0.4; H.legs[1].knee.rotation.z = -1.9;
    H.legs[2].hip.rotation.z = -0.45; H.legs[3].hip.rotation.z = -0.25;
    H.legs[2].knee.rotation.z = 0.2; H.legs[3].knee.rotation.z = 0.35;
    H.neck.rotation.z = 0.15; H.torso.rotation.z = -0.45;
    H.tail.forEach((s) => { s.rotation.z = 0.5; });
    poseArm(1, 0); poseCloak(0.4, 0.8);
    [shadow, sparks, ...buttons, ...mist, ...bats].forEach((o) => { o.visible = false; });
  }

  function update() {
    const now = performance.now() / 1000;
    const t = still ? 999 : (window.__labelT ?? now - t0); // __labelT freezes a moment for screenshots
    const time = now;

    // Where the horse is and how fast
    let speed = 0, scale = 1;
    if (t < tRide) { // galloping out of the moon on the label
      const k = ease(t / EMERGE);
      const start = pathAt(0);
      rig.position.lerpVectors(moonSpot, start, k);
      scale = Math.max(0.02, k);
      tmp.copy(pathAt(0.01)).sub(start); H.horse.rotation.y = Math.atan2(-tmp.z, tmp.x);
      speed = 1;
    } else if (t < tRear) {
      const k = (t - tRide) / RIDE;
      const kk = k < 0.85 ? k : 0.85 + (1 - Math.pow(1 - (k - 0.85) / 0.15, 2)) * 0.15; // ease into the stop
      const p = pathAt(kk); rig.position.copy(p);
      tmp.copy(pathAt(Math.min(1, kk + 0.01))).sub(p);
      if (tmp.lengthSq() > 1e-8) H.horse.rotation.y = Math.atan2(-tmp.z, tmp.x);
      speed = k < 0.85 ? 1 : 1 - (k - 0.85) / 0.15 * 0.7;
    } else {
      rig.position.copy(pathAt(1));
      // turn a little towards the viewer once he's stopped
      const turn = ease((t - tRear - REAR) / 0.8) * 0.45; // stays side-on while rearing
      H.horse.rotation.y = -turn * 0.35;
      speed = 0;
    }
    rig.scale.setScalar(S * scale);

    // Gallop, then rear up, then stand
    const rearK = t < tRear ? 0 : t < tRear + REAR ? Math.sin(Math.PI * clamp01((t - tRear) / REAR)) : 0;
    if (t < tRear) poseGallop(time, Math.max(0.35, speed)); else poseIdle(time);
    H.pitch.rotation.z = rearK * 0.8;
    if (rearK > 0.05) { // front hooves paw the air while up
      H.legs[0].hip.rotation.z = 0.7 * rearK + Math.sin(time * 12) * 0.3 * rearK; H.legs[0].knee.rotation.z = -1.5 * rearK;
      H.legs[1].hip.rotation.z = 0.4 * rearK + Math.sin(time * 12 + 1.5) * 0.3 * rearK; H.legs[1].knee.rotation.z = -1.8 * rearK;
      H.legs[2].hip.rotation.z = -0.4 * rearK; H.legs[3].hip.rotation.z = -0.25 * rearK;
    }
    H.torso.rotation.z = -0.12 - speed * 0.12 - rearK * 0.45;

    // The pumpkin: held high, wound back, thrown at you, burst
    if (!thrown) {
      const wind = t > tRear ? clamp01((t - tRear) / 0.6) : 0;
      poseArm(1, wind * (t < tToss ? 1 : 0));
      if (t >= tToss) {
        thrown = true; pumpkin.getWorldPosition(flyFrom); root.worldToLocal(flyFrom); root.add(pumpkin);
        pumpkin.position.copy(flyFrom); pumpkin.scale.setScalar(0.17 * S);
      }
    } else {
      poseArm(clamp01(1 - (t - tToss) / 0.5) * 0.4, -0.3 * clamp01(1 - (t - tToss) / 0.4));
    }
    if (thrown && t < tBurst) {
      const k = clamp01((t - tToss) / FLY);
      pumpkin.position.lerpVectors(flyFrom, burstAt, k); pumpkin.position.y += Math.sin(k * Math.PI) * 0.18;
      pumpkin.rotation.set(k * 5, k * 3, 0); pumpkin.scale.setScalar(0.17 * S * (1 + k * 1.6));
      pumpkin.visible = true;
    } else if (thrown) pumpkin.visible = false;
    // Sparks
    const ks = (t - tBurst) / 1.1;
    sparks.material.opacity = ks > 0 && ks < 1 ? 1 - ks : 0;
    if (ks > 0 && ks < 1) for (let i = 0; i < N; i++) {
      const v = sparkVel[i];
      sparkPos[i * 3] = burstAt.x + v.x * ks; sparkPos[i * 3 + 1] = burstAt.y + v.y * ks - ks * ks * 0.25; sparkPos[i * 3 + 2] = burstAt.z + v.z * ks;
    }
    sparkGeo.attributes.position.needsUpdate = true;

    // Buttons pop out of the burst and settle in a column above him
    buttons.forEach((b, i) => {
      const k = clamp01((t - tBurst - i * 0.12) / 0.55);
      b.visible = k > 0; b.position.lerpVectors(burstAt, slots[i], ease(k));
      b.scale.copy(b.userData.base).multiplyScalar(Math.max(0.001, easeOutBack(k)) * (b.userData.pressed > now ? 1.12 : 1));
    });

    poseCloak(time, Math.max(speed, rearK * 0.6));

    // Shadow follows the hooves; fades while he's tiny or rearing
    shadow.position.set(rig.position.x, groundY + 0.002, rig.position.z);
    shadow.material.opacity = 0.8 * scale * (1 - rearK * 0.3);
    shadow.rotation.z = H.horse.rotation.y;

    // Mist drifts around the ground, bats circle above
    const show = clamp01(t / 1.2);
    mist.forEach((s) => {
      const u = s.userData, a = u.a + time * u.sp;
      s.position.set(C.x + Math.sin(a) * (R + u.r - 0.2), groundY + 0.03 + Math.sin(time + u.a) * 0.01, C.z + Math.cos(a) * (R * 0.7 + u.r - 0.2));
      s.scale.set(u.sz * 1.6, u.sz * 0.7, 1); s.material.opacity = 0.35 * show;
    });
    bats.forEach((s) => {
      const u = s.userData, a = u.a + time * u.sp;
      s.position.set(Math.sin(a) * u.r, groundY + 0.85 + u.h + Math.sin(time * 1.3 + u.a) * 0.04, 0.2 + Math.cos(a) * u.r * 0.6);
      const flap = 0.55 + 0.45 * Math.abs(Math.sin(time * u.f));
      s.scale.set(0.12 * flap, 0.06, 1); s.material.opacity = show;
    });

    // Reins from the left hand to the muzzle
    const a1 = new THREE.Vector3(), a2 = new THREE.Vector3();
    H.foreL.localToWorld(a1.set(0, -0.32, 0)); H.head.localToWorld(a2.set(0.3, -0.3, 0));
    H.body.worldToLocal(a1); H.body.worldToLocal(a2);
    H.rein.position.copy(a1).add(a2).multiplyScalar(0.5);
    H.rein.scale.y = a1.distanceTo(a2);
    H.rein.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), a2.sub(a1).normalize());

    if (!thrown) { H.hand.getWorldQuaternion(qa); root.getWorldQuaternion(qb); pumpkin.quaternion.copy(qa.invert().multiply(qb)); }
    pumpkin.userData.light.intensity = 1.2 + Math.sin(time * 9) * 0.25 + Math.sin(time * 23) * 0.15;
  }

  // Taps: buttons first, then the horse (ride again)
  function tap(ray) {
    const vis = buttons.filter((b) => b.visible);
    const hit = ray.intersectObjects(vis, false)[0];
    if (hit) { hit.object.userData.pressed = performance.now() / 1000 + 0.2; const a = hit.object.userData.action; onAction(a); return true; }
    if (ray.intersectObject(H.hit, false)[0]) { replay(); return true; }
    return false;
  }

  return { root, update, replay, tap, freezeRearing, rig, horse: H.horse };
}
