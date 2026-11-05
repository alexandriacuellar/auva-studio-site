// Walk through the Stone Ridge Farmhouse at full size.
// On screen: drag to look, tap the floor (or use WASD / arrow keys) to walk, or jump to a room.
// On Meta Quest: "Walk in VR" starts a WebXR session. Left stick walks, right stick turns,
// pull a trigger at the floor to jump there, and the menu on your left wrist changes the house.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildHouse, FINISHES } from '../house.js';

const $ = (id) => document.getElementById(id);
const state = { finish: 'white', night: false };
const EYE = 1.6;

// ---------- Renderer, scene, camera ----------
const stage = $('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local-floor');
renderer.xr.setFoveation?.(0.5);
stage.prepend(renderer.domElement);
const cv = renderer.domElement;
cv.setAttribute('role', 'img');
cv.setAttribute('aria-label', 'A walk-through of the Stone Ridge Farmhouse. Drag to look around, tap the floor to walk.');

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
const envMap = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
scene.environment = envMap;
const hemi = new THREE.HemisphereLight(0xffffff, 0x7a6f5c, 0.9);
const sun = new THREE.DirectionalLight(0xfff1dc, 1.6); sun.position.set(-30, 60, 40);
scene.add(hemi, sun);
scene.fog = new THREE.Fog('#dfe7ea', 45, 420);

// The rig is where your feet are; the camera is your head.
const rig = new THREE.Group(); scene.add(rig);
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 1200);
camera.position.set(0, EYE, 0); rig.add(camera);
let pitch = 0;

// ---------- The world around the house ----------
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
  uniforms: { top: { value: new THREE.Color('#6f9fd6') }, bottom: { value: new THREE.Color('#e6eef0') } },
  vertexShader: 'varying vec3 vP; void main() { vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: 'uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main() { float h = clamp(vP.y * 1.5 + 0.02, 0.0, 1.0); gl_FragColor = vec4(mix(bottom, top, pow(h, 0.6)), 1.0); \n#include <colorspace_fragment>\n }',
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(900, 32, 16), skyMat); sky.renderOrder = -1; scene.add(sky);

const starGeo = new THREE.BufferGeometry(); const sp = [];
for (let i = 0; i < 900; i++) {
  const a = Math.random() * Math.PI * 2, y = 0.12 + Math.random() * 0.88, r = Math.sqrt(1 - y * y);
  sp.push(Math.cos(a) * r * 850, y * 850, Math.sin(a) * r * 850);
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: '#ffffff', size: 2, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.85 }));
stars.visible = false; scene.add(stars);

const groundMat = new THREE.MeshStandardMaterial({ color: '#7a9558', roughness: 1 });
const ground = new THREE.Mesh(new THREE.CircleGeometry(700, 48).rotateX(-Math.PI / 2), groundMat);
ground.position.y = -0.03; ground.name = 'ground'; scene.add(ground);

// Distant ridge (the Shawangunks are just east of Stone Ridge) and a tree line around the lot
const hillMat = new THREE.MeshStandardMaterial({ color: '#5c7253', roughness: 1, flatShading: true });
for (const [a, d, sx, sy] of [[-0.5, 330, 260, 46], [0.35, 360, 220, 62], [1.4, 300, 200, 34], [2.6, 340, 240, 40], [3.7, 320, 260, 52], [4.9, 350, 200, 38]]) {
  const h = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 10), hillMat);
  h.scale.set(sx, sy, sx * 0.45); h.position.set(Math.sin(a) * d, -sy * 0.15, -Math.cos(a) * d); h.lookAt(0, h.position.y, 0); scene.add(h);
}
{
  const leaf = new THREE.IcosahedronGeometry(1, 1); leaf.translate(0, 1.6, 0);
  const trees = new THREE.InstancedMesh(leaf, new THREE.MeshStandardMaterial({ color: '#4f6d3f', flatShading: true, roughness: 1 }), 220);
  const trunkGeo = new THREE.CylinderGeometry(0.1, 0.14, 1.0, 7); trunkGeo.translate(0, 0.5, 0);
  const trunks = new THREE.InstancedMesh(trunkGeo, new THREE.MeshStandardMaterial({ color: '#5e4632', roughness: 1 }), 220);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 220; i++) {
    const a = rnd() * Math.PI * 2, d = 32 + rnd() * 70, k = 2.2 + rnd() * 2.8;
    p.set(Math.sin(a) * d, 0, Math.cos(a) * d * 0.9);
    if (p.z > 10 && Math.abs(p.x) < 14) p.x += 28 * Math.sign(p.x || 1); // keep the view from the road open
    s.set(k, k * (1.1 + rnd() * 0.6), k); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6);
    trees.setMatrixAt(i, m.compose(p, q, s)); trunks.setMatrixAt(i, m);
  }
  scene.add(trees, trunks);
}

// ---------- The house ----------
const house = buildHouse({ finish: state.finish, labels: false, openDoor: true, lining: true, omit: ['vanity', 'toilet', 'tub', 'kitchen', 'beds', 'tables', 'sofa', 'chairs', 'island'] });
scene.add(house.root);
house.root.updateMatrixWorld(true);
const OFF = house.body.position.clone(); // house plan coordinates -> world
const F = 0.3;
const at = (x, y, z) => new THREE.Vector3(x, y, z).add(OFF);

// Warm lamps inside, on at night
const lamps = new THREE.Group(); scene.add(lamps);
for (const [x, z] of [[-3.4, 0.2], [1.1, -1.8], [1.1, 2.0], [4.6, 2.0], [4.6, -2.6], [8.6, -0.5], [0.3, 5.2]]) {
  const l = new THREE.PointLight('#ffcf8a', 8, 8, 1.5); l.position.copy(at(x, F + 2.4, z)); lamps.add(l);
}
lamps.visible = false;

// Walkable floors and solid things, by mesh name
const FLOORS = ['lawn', 'gravel', 'deck', 'wood', 'tile', 'rug', 'mat', 'ground', 'foundation'];
const SOLID = ['siding', 'inner', 'frame', 'glass', 'door', 'trim', 'stone', 'sofa', 'cabinet', 'counter', 'steel', 'oak', 'bedding', 'throw', 'porcelain', 'walltile', 'trunk'];
const floors = [ground], solids = [];
house.root.traverse((o) => { if (!o.isMesh) return; if (FLOORS.includes(o.name)) floors.push(o); if (SOLID.includes(o.name)) solids.push(o); });

// Real bathroom fixtures (a 3D model set), placed into the bath in house plan coordinates.
// Each piece: model node, turn (radians), and the floor area it must fit in [x0, x1, z0, z1]; snap: which wall it backs onto.
const BATH = [
  { name: 'BathroomVanity05', turn: Math.PI / 2, area: [3.1, 3.66, -3.0, -1.88], snap: 'x0' },
  { name: 'Toilet01', turn: Math.PI, area: [3.4, 4.1, -3.86, -2.9], snap: 'z0' },
  { name: 'Bathtub01', turn: 0, area: [4.28, 5.86, -3.86, -3.0], snap: 'z0' },
];
const SINK = { name: 'WashBasin03', turn: -Math.PI / 2, maxDepth: 0.44 };
new GLTFLoader().load(new URL('./bath-set.glb', import.meta.url).href, (g) => {
  const fit = (o, turn) => { o.rotation.set(0, turn, 0); o.scale.setScalar(1); o.position.set(0, 0, 0); o.updateMatrixWorld(true); return new THREE.Box3().setFromObject(o); };
  let top = null;
  for (const p of BATH) {
    const o = g.scene.getObjectByName(p.name); if (!o) continue;
    // Measured before it joins the house, so the numbers are plan coordinates
    let b = fit(o, p.turn); const [x0, x1, z0, z1] = p.area;
    const k = Math.min(1, (x1 - x0) / (b.max.x - b.min.x), (z1 - z0) / (b.max.z - b.min.z)); o.scale.setScalar(k);
    o.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(o);
    const dx = p.snap === 'x0' ? x0 - b.min.x : (x0 + x1) / 2 - (b.min.x + b.max.x) / 2;
    const dz = p.snap === 'z0' ? z0 - b.min.z : (z0 + z1) / 2 - (b.min.z + b.max.z) / 2;
    o.position.set(dx, F - b.min.y, dz);
    house.body.add(o); o.updateMatrixWorld(true);
    o.traverse((m) => { if (m.isMesh) solids.push(m); });
    if (p.name.startsWith('BathroomVanity')) top = new THREE.Box3().setFromObject(o);
  }
  const s = g.scene.getObjectByName(SINK.name);
  if (s && top) {
    // The sink sits on the vanity top, its faucet toward the wall
    // The model's faucet sits off to one side; move it to the middle, behind the bowl
    const tap = s.getObjectByName('Faucet03'); if (tap) { const tb = new THREE.Box3().setFromObject(tap); tap.position.x -= (tb.min.x + tb.max.x) / 2; }
    let b = fit(s, SINK.turn);
    const k = Math.min(1, SINK.maxDepth / (b.max.x - b.min.x)); s.scale.setScalar(k); s.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(s);
    // world -> house plan coordinates (body is offset by OFF)
    const cx = (top.min.x + top.max.x) / 2 - OFF.x, cz = (top.min.z + top.max.z) / 2 - OFF.z;
    s.position.set(cx - (b.min.x + b.max.x) / 2, top.max.y - OFF.y - b.min.y, cz - (b.min.z + b.max.z) / 2);
    house.body.add(s); s.updateMatrixWorld(true);
  }
});

// Kitchen: real models from alexandria's kitchen set, along the back wall (plan x -0.6 to 2.88, wall at z -3.9).
// The window over the sink leaves no room for wall cabinets. Each piece: model node, left edge x (or center cx), height of its base above the floor.
const WALL = -3.9;
const KITCHEN = [
  { name: 'CabinetD03', x: -0.6 }, { name: 'CabinetD04', x: -0.18 }, { name: 'CabinetD02', x: 0.24 },
  { name: 'CabinetD_Sink', x: 0.66 }, { name: 'CabinetD01', x: 1.5 },
  { name: 'Refrigerator06', x: 1.96, fitW: 0.92 },
  { name: 'GasStove07', cx: -0.18, y: 0.92, z: 0.3 }, { name: 'Sink06', cx: 1.08, y: 0.92, z: 0.3, byOrigin: true },
  { name: 'KitchenExhaust01', cx: -0.18, y: 1.62 },
];
new GLTFLoader().load(new URL('./kitchen-set.glb', import.meta.url).href, (g) => {
  for (const p of KITCHEN) {
    const o = g.scene.getObjectByName(p.name); if (!o) continue;
    o.position.set(0, 0, 0); o.rotation.set(0, 0, 0); o.scale.set(1, 1, p.sz || 1); o.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(o);
    if (p.fitW) { const k = Math.min(1, p.fitW / (b.max.x - b.min.x)); o.scale.setScalar(k); o.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(o); }
    const dx = p.cx !== undefined ? p.cx - (b.min.x + b.max.x) / 2 : p.x - b.min.x;
    const dz = p.z !== undefined ? WALL + p.z - (b.min.z + b.max.z) / 2 : WALL - b.min.z;
    // The sink hangs below the counter, so it's placed by its own origin (the counter line)
    const dy = p.byOrigin ? F + p.y : F + (p.y || 0) - b.min.y;
    o.position.set(dx, dy, dz);
    house.body.add(o); o.updateMatrixWorld(true);
    o.traverse((m) => { if (m.isMesh) solids.push(m); });
    if (p.name.startsWith('KitchenExhaust')) {
      // A steel duct from the hood up to the ceiling
      b = new THREE.Box3().setFromObject(o); const cx = (b.min.x + b.max.x) / 2 - OFF.x, top = b.max.y - OFF.y, H = F + 3.0; // world -> plan
      const duct = new THREE.Mesh(new THREE.BoxGeometry(0.26, H - top, 0.24), house.mats.steel);
      duct.position.set(cx, (top + H) / 2, WALL + 0.13); house.body.add(duct);
    }
  }
});
// Walnut plank floor from alexandria's texture (6 boards per image, about 20 cm each). The house floor UVs are
// 1 unit per 1.6 m, so the image repeats 1.6 / 1.2 times per unit.
{
  const t = new THREE.TextureLoader().load(new URL('./floor-walnut.jpg', import.meta.url).href);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping; t.anisotropy = 8; t.repeat.set(1.6 / 1.2, 1.6 / 1.2); // mirrored, so no seams where the image repeats
  house.mats.wood.map = t; house.mats.wood.color.set('#9a9a9a'); house.mats.wood.needsUpdate = true;
}
// Bath wall tile from alexandria's blue terrazzo-look tile: cropped to exactly 2 x 2 tiles so it repeats cleanly.
// Wall-tile UVs are 1 unit per 0.6 m, so 2 repeats give 15 cm tiles.
{
  const t = new THREE.TextureLoader().load(new URL('./bath-walltile.jpg', import.meta.url).href);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; t.repeat.set(2, 2);
  house.mats.walltile.map = t; house.mats.walltile.color.set('#d6d6d6'); house.mats.walltile.needsUpdate = true;
}
// Bath floor: alexandria's dark slate mosaic (about 20 tiles across the image, so about 5 cm tiles at 1 m per image;
// floor-tile UVs are 1 unit per 1.2 m). Ceiling: her white-washed shiplap, 10 boards per image at 1.2 m (12 cm boards).
// Fireplace and chimney: her light gray stacked stone, 1.1 m per image. All mirrored so the image edges never show a seam.
for (const [mat, file, rep, tint] of [[house.mats.tile, 'bath-floor.jpg', 1.2, '#bdbdbd'], [house.roof.getObjectByName('roof-ceiling')?.material, 'ceiling.jpg', 1, '#ffffff'], [house.mats.stone, 'stone.jpg', 1, '#e6e6e6']]) {
  if (!mat) continue;
  const t = new THREE.TextureLoader().load(new URL(`./${file}`, import.meta.url).href);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.MirroredRepeatWrapping; t.anisotropy = 8; t.repeat.set(rep, rep);
  mat.map = t; mat.color.set(tint); mat.needsUpdate = true;
}
// Kitchen backsplash: her white subway tile (image = 0.75 m square, 7.5 x 15 cm tiles). A strip along the counter
// under the window, and a taller panel behind the stove up to the hood. Plan [x0, x1, y0, y1] on the back wall.
for (const [x0, x1, y0, y1] of [[0.2, 1.96, F + 0.92, F + 1.17], [-0.6, 0.2, F + 0.92, F + 1.62]]) {
  const t = new THREE.TextureLoader().load(new URL('./backsplash.jpg', import.meta.url).href);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8;
  t.repeat.set((x1 - x0) / 0.75, (y1 - y0) / 0.75); t.offset.set(x0 / 0.75, (y0 - F) / 0.75); // lines up across both pieces
  const b = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, y1 - y0, 0.01), new THREE.MeshStandardMaterial({ map: t, color: '#ececec', roughness: 0.35 }));
  b.position.set((x0 + x1) / 2, (y0 + y1) / 2, WALL + 0.012); house.body.add(b);
}
// Rugs from alexandria's carpet images. Bedrooms: blue and oatmeal pattern, repeating about every 1.3 m (suite rug and
// a new rug under the bed in bedroom 2). Living room: cream medallion rug, and the white bath mat, each shown once.
// Plan [x0, x1, z0, z1]; tile: pattern size in meters, or 0 to stretch the image over the rug.
{
  const RUGS = [
    { file: 'carpet.jpg', area: [7.39, 10.01, -2.01, 1.01], tile: 1.3 },
    { file: 'carpet.jpg', area: [3.4, 5.75, 0.8, 3.5], tile: 1.3 },
    { file: 'rug-living.jpg', area: [-5.21, -1.79, -1.41, 1.41], tile: 0 },
    { file: 'bathmat.jpg', area: [4.39, 5.41, -2.96, -2.44], tile: 0 },     // white plush bath mat
  ];
  for (const { file, area: [x0, x1, z0, z1], tile } of RUGS) {
    const t = new THREE.TextureLoader().load(new URL(`./${file}`, import.meta.url).href); // own texture per rug for its own repeat
    t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
    if (tile) t.repeat.set((x1 - x0) / tile, (z1 - z0) / tile);
    const rug = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.016, z1 - z0), new THREE.MeshStandardMaterial({ map: t, roughness: 1, color: 0xcfcfcf }));
    rug.position.set((x0 + x1) / 2, F + 0.026, (z0 + z1) / 2); house.body.add(rug);
  }
}
// Island from the same cabinets, turned to face the cook (back to back with the stools), under one white top
// that overhangs on the stool side. Plan x 0.15 to 2.05, cabinet fronts at z -2.3.
const ISLAND = ['CabinetD02', 'CabinetD04', 'CabinetD02', 'CabinetD04'];
new GLTFLoader().load(new URL('./kitchen-set.glb', import.meta.url).href, (g) => {
  const parts = ISLAND.map((n) => g.scene.getObjectByName(n)).filter(Boolean).map((src) => {
    const o = src.clone(); o.position.set(0, 0, 0); o.rotation.set(0, Math.PI, 0); o.updateMatrixWorld(true);
    return { o, b: new THREE.Box3().setFromObject(o) };
  });
  const total = parts.reduce((s, p) => s + p.b.max.x - p.b.min.x, 0);
  let x = 1.1 - total / 2, top = 0, back = -2.3;
  for (const { o, b } of parts) {
    o.position.set(x - b.min.x, F - b.min.y, -2.3 - b.min.z); x += b.max.x - b.min.x;
    top = Math.max(top, b.max.y - b.min.y); back = Math.max(back, -2.3 + b.max.z - b.min.z);
    house.body.add(o); o.updateMatrixWorld(true); o.traverse((m) => { if (m.isMesh) solids.push(m); });
  }
  // Back panel on the stool side, then the top
  const panel = new THREE.Mesh(new THREE.BoxGeometry(total, top - 0.04, 0.02), house.mats.cabinet);
  panel.position.set(1.1, F + (top - 0.04) / 2, back + 0.01); house.body.add(panel);
  const slab = new THREE.Mesh(new THREE.BoxGeometry(total + 0.1, 0.04, back - (-2.3) + 0.35), house.mats.counter);
  slab.position.set(1.1, F + top + 0.02, (-2.32 + back + 0.3) / 2); house.body.add(slab);
  solids.push(panel, slab);
});
// Island to match: black base, white top like the cabinets
house.mats.cabinet.color.set('#232427');
house.mats.counter.color.set('#e8e8e6');

// Beds from alexandria's bed set: headboard against the wall (the models' headboard is at -z, so a -90° turn puts it at +x).
// area: [x0, x1, z0, z1] floor space; the bed is scaled down to fit if needed and pushed against x1.
const BEDS = [
  { name: 'BedFrame12', area: [8.06, 10.28, -1.6, 0.6] },  // primary suite, clear of the window sill (sill reaches x 10.335)
  { name: 'BedFrame11', area: [3.75, 5.92, 1.1, 3.1] },    // bedroom 2
];
new GLTFLoader().load(new URL('./bed-set.glb', import.meta.url).href, (g) => {
  const pillow = g.scene.getObjectByName('Pillow');
  for (const p of BEDS) {
    const o = g.scene.getObjectByName(p.name); if (!o) continue;
    o.position.set(0, 0, 0); o.rotation.set(0, -Math.PI / 2, 0); o.scale.setScalar(1); o.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(o); const [x0, x1, z0, z1] = p.area;
    const k = Math.min(1, (x1 - x0) / (b.max.x - b.min.x), (z1 - z0) / (b.max.z - b.min.z)); o.scale.setScalar(k);
    o.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(o);
    o.position.set(x1 - b.max.x, F - b.min.y, (z0 + z1) / 2 - (b.min.z + b.max.z) / 2);
    o.updateMatrixWorld(true);
    // Two pillows on the mattress, at the headboard end
    const mat = o.getObjectByName(p.name.replace('BedFrame', 'Mattress'));
    if (pillow && mat) {
      const mb = new THREE.Box3().setFromObject(mat);
      const bl = o.getObjectByName(p.name.replace('BedFrame', 'Blanket')); if (bl) mb.max.y = Math.max(mb.max.y, new THREE.Box3().setFromObject(bl).max.y); // sit on top of the blanket
      for (const side of [-1, 1]) {
        const q = pillow.clone(); q.rotation.set(0, -Math.PI / 2, 0); q.scale.setScalar(k); q.position.set(0, 0, 0); q.updateMatrixWorld(true);
        const qb = new THREE.Box3().setFromObject(q), w = mb.max.z - mb.min.z;
        q.position.set(mb.max.x - 0.06 - qb.max.x, mb.max.y - 0.02 - qb.min.y, (mb.min.z + mb.max.z) / 2 + side * w / 4 - (qb.min.z + qb.max.z) / 2);
        o.attach(q);
      }
    }
    house.body.add(o); o.updateMatrixWorld(true);
    o.traverse((m) => { if (m.isMesh) solids.push(m); });
  }
});

// Tables from alexandria's table set (marble tops to go with the kitchen). Each fills its floor area [x0, x1, z0, z1];
// stretch: true scales length and width separately, so the dining table seats the six chairs.
const TABLES = [
  { name: 'Table10', turn: 0, area: [0.9, 2.7, 1.45, 2.35], stretch: true },   // dining
  { name: 'Table39', turn: Math.PI / 2, area: [-4.1, -3.3, -0.65, 0.65] },     // coffee table
];
// Black leather sofa and armchair from alexandria's sofa set (fronts face -z in the model)
const SOFAS = [
  { name: 'Sofa01', turn: Math.PI / 2, area: [-2.65, -1.75, -1.2, 1.2] },        // sofa facing the fireplace
  { name: 'Sofa02', turn: 0.35, area: [-4.25, -3.25, 1.35, 2.35] },             // armchair by the coffee table
];
const placeFurniture = (list) => (g) => {
  for (const p of list) {
    const o = g.scene.getObjectByName(p.name); if (!o) continue;
    o.position.set(0, 0, 0); o.rotation.set(0, p.turn, 0); o.scale.setScalar(1); o.updateMatrixWorld(true);
    let b = new THREE.Box3().setFromObject(o); const [x0, x1, z0, z1] = p.area;
    const sx = (x1 - x0) / (b.max.x - b.min.x), sz = (z1 - z0) / (b.max.z - b.min.z);
    if (p.stretch) {
      // World x/z map to the model's own axes; a quarter turn swaps them
      const q = Math.abs(Math.sin(p.turn)) > 0.5; o.scale.set(q ? sz : sx, 1, q ? sx : sz);
    } else o.scale.setScalar(Math.min(1, sx, sz));
    o.updateMatrixWorld(true); b = new THREE.Box3().setFromObject(o);
    o.position.set((x0 + x1) / 2 - (b.min.x + b.max.x) / 2, F - b.min.y, (z0 + z1) / 2 - (b.min.z + b.max.z) / 2);
    house.body.add(o); o.updateMatrixWorld(true);
    o.traverse((m) => { if (m.isMesh) solids.push(m); });
  }
};
new GLTFLoader().load(new URL('./table-set.glb', import.meta.url).href, placeFurniture(TABLES));
new GLTFLoader().load(new URL('./sofa-set.glb', import.meta.url).href, placeFurniture(SOFAS));

// Chairs from alexandria's chair set, each placed at [x, z] and turned to face [fx, fz] (the models face -z)
const CHAIRS = [
  ...[1.2, 1.8, 2.4].flatMap((x) => [{ name: 'Chair04', at: [x, 1.1], face: [0, 1] }, { name: 'Chair04', at: [x, 2.7], face: [0, -1] }]), // dining
  ...[0.5, 1.1, 1.7].map((x) => ({ name: 'Chair25', at: [x, -1.0], face: [0, -1] })),   // island stools
  { name: 'Chair46', at: [-2.7, 4.75], face: [0.25, 1] }, { name: 'Chair46', at: [-1.7, 4.75], face: [-0.25, 1] }, // porch rockers
];
// Light-oak dresser and nightstand to match the oak beds (these models face +z); [x, z] is the center, face is the direction
const DRESSERS = [
  { name: 'Drawer35_Body', at: [6.38, 1.3], face: [1, 0], flip: true },     // suite, against the hall wall
  { name: 'Drawer_Body01', at: [5.54, 1.0], face: [-1, 0], flip: true },    // bedroom 2, beside the bed
];
// Place each piece by its center and facing; models in the chair set face -z, drawer models face +z (flip)
const placeChairs = (g, list) => {
  for (const p of list) {
    const src = g.scene.getObjectByName(p.name); if (!src) continue;
    const o = src.clone(); o.position.set(0, 0, 0);
    o.rotation.set(0, p.flip ? Math.atan2(p.face[0], p.face[1]) : Math.atan2(-p.face[0], -p.face[1]), 0); o.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(o);
    o.position.set(p.at[0] - (b.min.x + b.max.x) / 2, F - b.min.y, p.at[1] - (b.min.z + b.max.z) / 2);
    house.body.add(o); o.updateMatrixWorld(true);
    o.traverse((m) => { if (m.isMesh) solids.push(m); });
  }
};
new GLTFLoader().load(new URL('./chair-set.glb', import.meta.url).href, (g) => placeChairs(g, CHAIRS));
new GLTFLoader().load(new URL('./drawer-set.glb', import.meta.url).href, (g) => placeChairs(g, DRESSERS));

const ray = new THREE.Raycaster();
const DOWN = new THREE.Vector3(0, -1, 0);
function floorAt(x, z, fromY) {
  ray.set(new THREE.Vector3(x, fromY + 1.2, z), DOWN); ray.far = 4;
  const h = ray.intersectObjects(floors, false)[0];
  return h ? h.point.y : null;
}
// Can feet at p move by d without walking into a wall or furniture?
function clear(p, d) {
  const len = d.length(); if (len < 1e-5) return true;
  const dir = d.clone().divideScalar(len);
  for (const h of [0.45, 1.2]) {
    ray.set(new THREE.Vector3(p.x, p.y + h, p.z), dir); ray.far = len + 0.28;
    if (ray.intersectObjects(solids, false).length) return false;
  }
  return true;
}
// Move feet p by d, sliding along walls. Returns true if it moved.
function tryMove(p, d) {
  for (const step of [d, new THREE.Vector3(d.x, 0, 0), new THREE.Vector3(0, 0, d.z)]) {
    if (step.lengthSq() < 1e-8 || !clear(p, step)) continue;
    const y = floorAt(p.x + step.x, p.z + step.z, p.y);
    if (y === null || y - p.y > 0.35) continue; // no floor, or too high a step
    p.x += step.x; p.z += step.z; p.y = y; return true;
  }
  return false;
}

// ---------- Rooms ----------
const ROOMS = {
  yard: { label: 'Front yard', at: [0.3, 0, 14.5], look: [0.3, 2.6, 4] },
  porch: { label: 'Porch', at: [-4.6, F, 5.1], look: [2, 1.6, 4.6] },
  living: { label: 'Living room', at: [-0.4, F, 1.9], look: [-5.6, 1.1, -0.2] },
  kitchen: { label: 'Kitchen', at: [2.45, F, -0.2], look: [0.6, 1.0, -3.6] },
  bedroom: { label: 'Bedroom', at: [4.0, F, 0.75], look: [5.2, 0.9, 2.6] },
  bath: { label: 'Bath', at: [4.2, F, -2.0], look: [5.2, 0.8, -3.6] },
  suite: { label: 'Primary suite', at: [6.9, F, 1.7], look: [9.6, 0.9, -0.6] },
};
const ROOM_ORDER = Object.keys(ROOMS);
let roomIdx = 0;
function placeAt(key, { vr = false } = {}) {
  const r = ROOMS[key]; roomIdx = ROOM_ORDER.indexOf(key);
  const p = at(...r.at), l = at(...r.look);
  const yaw = Math.atan2(-(l.x - p.x), -(l.z - p.z));
  if (vr && xr.head) {
    // Turn the rig so the way you face looks at the target, then put your head over the spot
    const headYaw = xr.headYawLocal;
    rig.rotation.y = yaw - headYaw;
    rig.updateMatrixWorld();
    const h = xr.head.clone().applyMatrix4(rig.matrixWorld);
    rig.position.x += p.x - h.x; rig.position.z += p.z - h.z; rig.position.y = p.y;
  } else {
    rig.position.copy(p); rig.rotation.y = yaw;
    pitch = Math.atan2(l.y - (p.y + EYE), Math.hypot(l.x - p.x, l.z - p.z)); camera.rotation.set(pitch, 0, 0);
  }
  walkTo = null;
  document.querySelectorAll('[data-room]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.room === key)));
}
const fade = $('fade');
function jump(key) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { placeAt(key); return; }
  fade.classList.add('on');
  setTimeout(() => { placeAt(key); fade.classList.remove('on'); }, 220);
}
document.querySelectorAll('[data-room]').forEach((b) => b.addEventListener('click', () => jump(b.dataset.room)));

// ---------- Day, night, finish ----------
function apply() {
  house.setFinish(state.finish); house.setNight(state.night);
  // Inside, the windows stay clear glass at night (the lamps light the rooms instead)
  const g = house.mats.glass;
  if (state.night) { g.emissiveIntensity = 0.35; g.emissive.set('#ffcf8a'); g.color.set('#26304a'); g.opacity = 0.3; }
  lamps.visible = state.night; stars.visible = state.night;
  hemi.intensity = state.night ? 0.7 : 0.9; hemi.color.set(state.night ? '#7d8fc4' : '#ffffff'); hemi.groundColor.set(state.night ? '#1e2236' : '#7a6f5c');
  sun.intensity = state.night ? 0.25 : 1.6; sun.color.set(state.night ? '#9fb2e8' : '#fff1dc');
  skyMat.uniforms.top.value.set(state.night ? '#060a1c' : '#6f9fd6');
  skyMat.uniforms.bottom.value.set(state.night ? '#1d2645' : '#e6eef0');
  scene.fog.color.set(state.night ? '#1d2645' : '#dfe7ea');
  groundMat.color.set(state.night ? '#3b4a33' : '#7a9558'); hillMat.color.set(state.night ? '#2a3530' : '#5c7253');
  scene.environment = state.night ? null : envMap;
  document.querySelectorAll('[data-night]').forEach((b) => { b.setAttribute('aria-pressed', String(state.night)); b.querySelector('span').textContent = state.night ? 'Back to daytime' : 'See it at night'; });
  document.querySelectorAll('[data-finish]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.finish === state.finish)));
  $('finish-name').textContent = FINISHES[state.finish].label;
  if (xr.session) refreshPanel();
}
document.querySelectorAll('[data-night]').forEach((b) => b.addEventListener('click', () => { state.night = !state.night; apply(); }));
document.querySelectorAll('[data-finish]').forEach((b) => b.addEventListener('click', () => { state.finish = b.dataset.finish; apply(); }));
const finishOrder = Object.keys(FINISHES);
const nextFinish = () => { state.finish = finishOrder[(finishOrder.indexOf(state.finish) + 1) % finishOrder.length]; apply(); };

// ---------- On screen: look, tap to walk, keys ----------
function size() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
new ResizeObserver(() => { if (!xr.session) size(); }).observe(stage); size();

cv.style.touchAction = 'none';
let drag = null, walkTo = null;
const marker = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.22, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.85, depthWrite: false, fog: false }));
marker.visible = false; scene.add(marker);
cv.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, moved: false }; cv.setPointerCapture(e.pointerId); });
cv.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY;
  if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 6) drag.moved = true;
  rig.rotation.y += dx * 0.0045;
  pitch = THREE.MathUtils.clamp(pitch + dy * 0.0035, -1.2, 1.2); camera.rotation.set(pitch, 0, 0);
});
cv.addEventListener('pointerup', (e) => {
  const wasDrag = drag?.moved; drag = null; if (wasDrag) return;
  // A tap: walk to the floor spot under the finger
  const r = cv.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera); ray.far = 40;
  const hit = ray.intersectObjects([...floors, ...solids], false)[0];
  if (hit && floors.includes(hit.object) && hit.face && hit.face.normal.y > 0.5) { walkTo = hit.point.clone(); marker.position.copy(hit.point).add(new THREE.Vector3(0, 0.02, 0)); marker.visible = true; }
});
cv.addEventListener('pointercancel', () => { drag = null; });
const keys = new Set();
addEventListener('keydown', (e) => {
  if (e.target.closest?.('input, textarea')) return;
  const k = e.key.toLowerCase();
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k) && stageVisible) { keys.add(k); if (k.startsWith('arrow')) e.preventDefault(); }
});
addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));
addEventListener('blur', () => keys.clear());
let stageVisible = true;
new IntersectionObserver(([en]) => { stageVisible = en.isIntersecting; }).observe(stage);

const fwd = new THREE.Vector3(), side = new THREE.Vector3(), mv = new THREE.Vector3();
function screenStep(dt) {
  const yaw = rig.rotation.y;
  fwd.set(-Math.sin(yaw), 0, -Math.cos(yaw)); side.set(-fwd.z, 0, fwd.x);
  mv.set(0, 0, 0);
  if (keys.has('w') || keys.has('arrowup')) mv.add(fwd);
  if (keys.has('s') || keys.has('arrowdown')) mv.sub(fwd);
  if (keys.has('d')) mv.add(side);
  if (keys.has('a')) mv.sub(side);
  if (keys.has('arrowleft')) rig.rotation.y += dt * 1.6;
  if (keys.has('arrowright')) rig.rotation.y -= dt * 1.6;
  if (mv.lengthSq()) { walkTo = null; marker.visible = false; tryMove(rig.position, mv.normalize().multiplyScalar(dt * 1.8)); }
  if (walkTo) {
    const d = new THREE.Vector3(walkTo.x - rig.position.x, 0, walkTo.z - rig.position.z), dist = d.length();
    if (dist < 0.08) { walkTo = null; marker.visible = false; }
    else if (!tryMove(rig.position, d.normalize().multiplyScalar(Math.min(dist, dt * 2.2)))) { walkTo = null; marker.visible = false; }
  }
}

// ---------- Meta Quest: VR ----------
const xr = { session: null, ref: null, head: null, headYawLocal: 0, ctrls: [], panel: null, items: [], reticle: null, turnReady: { left: true, right: true }, target: null };
if (location.search.includes('debug')) Object.assign(window, { __walk: { xr, rig, camera, state, placeAt, scene, renderer, tryMove, at } });

const reticle = new THREE.Mesh(new THREE.RingGeometry(0.2, 0.27, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#9fd18b', transparent: true, opacity: 0.9, depthWrite: false, fog: false }));
reticle.visible = false; scene.add(reticle); xr.reticle = reticle;
for (let i = 0; i < 2; i++) {
  const c = renderer.xr.getController(i);
  const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(0, 0, -1)]), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }));
  line.scale.z = 3; c.add(line);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 8), new THREE.MeshBasicMaterial({ color: '#ffffff' })); c.add(tip);
  c.addEventListener('connected', (e) => { c.userData.source = e.data; c.visible = e.data.targetRayMode === 'tracked-pointer'; });
  c.addEventListener('disconnected', () => { c.userData.source = null; c.visible = false; });
  rig.add(c); xr.ctrls.push({ c, line });
}

function labelTexture(text, { w = 512, h = 128, bg = 'rgba(34,37,43,0.92)', fg = '#ffffff', font = '600 48px "Manrope", system-ui, sans-serif' } = {}) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.beginPath(); g.roundRect(0, 0, w, h, h / 2); g.fill();
  g.fillStyle = fg; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const PANEL = ['room', 'finish', 'night', 'exit'];
function panelText(a) {
  if (a === 'room') return 'Next: ' + ROOMS[ROOM_ORDER[(roomIdx + 1) % ROOM_ORDER.length]].label;
  if (a === 'finish') return FINISHES[state.finish].label;
  if (a === 'night') return state.night ? 'Daytime' : 'Night';
  return 'Exit VR';
}
function refreshPanel() {
  xr.items.forEach((b) => {
    const a = b.userData.action; b.material.map?.dispose();
    b.material.map = labelTexture(panelText(a), a === 'exit' ? { bg: '#ffffff', fg: '#22252b', font: '700 50px "Manrope", system-ui, sans-serif' } : {});
    b.material.needsUpdate = true;
  });
}
// The menu sits on your left wrist when you hold both controllers (point the right one at it).
// With one controller, or after pressing Y or B, it floats in front of you instead, so one hand can use it.
function buildPanel() {
  if (xr.panel) return;
  const panel = new THREE.Group();
  const title = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.026), new THREE.MeshBasicMaterial({ map: labelTexture('Stone Ridge Farmhouse', { w: 800, font: '600 50px "Manrope", system-ui, sans-serif', bg: 'rgba(251,250,247,0.95)', fg: '#22252b' }), transparent: true }));
  title.position.set(0, 0.075, 0); panel.add(title);
  PANEL.forEach((a, i) => {
    const b = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.034), new THREE.MeshBasicMaterial({ transparent: true }));
    b.userData.action = a; b.position.set(0, 0.035 - i * 0.042, 0); panel.add(b); xr.items.push(b);
  });
  // Always drawn on top, so a wall or the sofa never hides the menu
  panel.children.forEach((m) => { m.material.depthTest = false; m.renderOrder = 20; });
  xr.panel = panel; xr.panelMode = null; refreshPanel();
}
function placePanel(mode, left) {
  const panel = xr.panel; if (!panel) return;
  if (mode === 'wrist') {
    left.add(panel); panel.position.set(0, 0.05, 0.02); panel.rotation.set(-Math.PI / 2.6, 0, 0); panel.scale.setScalar(1);
  } else {
    if (!xr.head) return;
    // In front of you at chest height, facing you (in rig space, so it walks and turns with you)
    const yaw = xr.headYawLocal, f = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    rig.add(panel); panel.position.set(xr.head.x + f.x * 0.65, xr.headY - 0.3, xr.head.z + f.z * 0.65);
    panel.rotation.set(-0.35, yaw, 0, 'YXZ'); panel.scale.setScalar(2.2);
  }
  xr.panelMode = mode;
}
function panelHit(c) {
  if (!xr.panel) return null;
  const m = c.matrixWorld;
  ray.ray.origin.setFromMatrixPosition(m); ray.ray.direction.set(0, 0, -1).transformDirection(m); ray.far = 1.5;
  const h = ray.intersectObjects(xr.items, false)[0];
  return h ? h.object.userData.action : null;
}
function floorHit(c) {
  const m = c.matrixWorld;
  ray.ray.origin.setFromMatrixPosition(m); ray.ray.direction.set(0, 0, -1).transformDirection(m); ray.far = 25;
  const h = ray.intersectObjects([...floors, ...solids], false)[0];
  return h && floors.includes(h.object) && h.face && h.face.normal.y > 0.5 ? h : null;
}
function panelAction(a) {
  if (a === 'room') { const k = ROOM_ORDER[(roomIdx + 1) % ROOM_ORDER.length]; placeAt(k, { vr: true }); refreshPanel(); }
  else if (a === 'finish') nextFinish();
  else if (a === 'night') { state.night = !state.night; apply(); }
  else if (a === 'exit') xr.session?.end();
}

const vrBtn = $('vr-start');
const vrOK = navigator.xr ? navigator.xr.isSessionSupported('immersive-vr').catch(() => false) : Promise.resolve(false);
// Headsets (and PC VR) only: phones that report VR support would get a split-screen view
const headsetBrowser = /OculusBrowser|Quest|Pico|Wolvic/i.test(navigator.userAgent) || !matchMedia('(pointer: coarse)').matches;
vrOK.then((ok) => { if (ok && headsetBrowser) { vrBtn.hidden = false; $('vr-note').hidden = true; } });
vrBtn.addEventListener('click', async () => {
  try {
    const session = await navigator.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor'] });
    // Keep standing where you were on screen, facing the same way
    camera.position.set(0, 0, 0); camera.rotation.set(0, 0, 0);
    await renderer.xr.setSession(session);
    xr.session = session; marker.visible = false; walkTo = null;
    session.addEventListener('select', onSelect);
    session.addEventListener('end', onEnd);
    session.addEventListener('squeeze', () => { if (xr.panelMode === 'front') xr.panelMode = null; }); // grip: bring the floating menu back in front
    buildPanel(); xr.forceFront = false;
  } catch (err) { console.warn(err); $('vr-note').hidden = false; $('vr-note').textContent = 'VR didn’t start. Check that this browser can use VR, then try again.'; }
});
function onEnd() {
  const s = xr.session; xr.session = null; reticle.visible = false; xr.panel?.removeFromParent(); xr.panelMode = null;
  s?.removeEventListener('select', onSelect);
  // Back on screen where you were standing
  const h = xr.head ? xr.head.clone().applyMatrix4(rig.matrixWorld) : rig.position.clone();
  rig.rotation.y += xr.headYawLocal; rig.position.set(h.x, rig.position.y, h.z);
  camera.position.set(0, EYE, 0); pitch = 0; camera.rotation.set(0, 0, 0); camera.fov = 70; size();
}
function onSelect(e) {
  const src = e.inputSource;
  const ctrl = xr.ctrls.find((k) => k.c.userData.source === src); if (!ctrl) return;
  const a = panelHit(ctrl.c); if (a) { panelAction(a); return; }
  const h = floorHit(ctrl.c); if (!h || !xr.head) return;
  // Jump: put your head over the spot you pointed at
  rig.updateMatrixWorld();
  const head = xr.head.clone().applyMatrix4(rig.matrixWorld);
  rig.position.x += h.point.x - head.x; rig.position.z += h.point.z - head.z; rig.position.y = h.point.y;
}

const q = new THREE.Quaternion(), e3 = new THREE.Euler();
function vrStep(dt, frame) {
  xr.ref = renderer.xr.getReferenceSpace();
  const pose = frame.getViewerPose(xr.ref);
  if (pose) {
    const p = pose.transform.position, o = pose.transform.orientation;
    xr.head = new THREE.Vector3(p.x, 0, p.z); xr.headY = p.y;
    e3.setFromQuaternion(q.set(o.x, o.y, o.z, o.w), 'YXZ'); xr.headYawLocal = e3.y;
  }
  rig.updateMatrixWorld();
  const head = xr.head ? xr.head.clone().applyMatrix4(rig.matrixWorld) : rig.position.clone();
  let target = null;
  xr.items.forEach((b) => b.scale.setScalar(1));
  const live = xr.ctrls.filter(({ c }) => c.userData.source?.targetRayMode === 'tracked-pointer');
  const leftCtrl = live.find(({ c }) => c.userData.source.handedness === 'left');
  const one = live.length === 1;
  const want = live.length >= 2 && leftCtrl && !xr.forceFront ? 'wrist' : 'front';
  if (xr.panel && xr.panelMode !== want) placePanel(want, leftCtrl?.c);
  for (const { c, line } of live) {
    const src = c.userData.source;
    // A or X: next room. B or Y: menu in front of you (press again to put it back on your wrist).
    const btn = src.gamepad?.buttons || [];
    for (const [i, act] of [[4, 'room'], [5, 'menu']]) {
      const down = !!btn[i]?.pressed, key = src.handedness + i;
      if (down && !xr.pressed?.[key]) { if (act === 'room') panelAction('room'); else { xr.forceFront = !xr.forceFront; xr.panelMode = null; } }
      (xr.pressed ||= {})[key] = down;
    }
    const onPanel = panelHit(c);
    const hit = onPanel ? null : floorHit(c);
    line.scale.z = onPanel ? 0.3 : hit ? hit.distance : 3;
    if (hit && !target) target = hit.point;
    xr.items.forEach((b) => { if (b.userData.action === onPanel) b.scale.setScalar(1.08); });
    const ax = src.gamepad?.axes || []; const x = ax.length >= 4 ? ax[2] : ax[0] || 0, y = ax.length >= 4 ? ax[3] : ax[1] || 0;
    // Left stick walks and right stick turns; with only one controller, its stick does both (up/down walks, left/right turns)
    if (src.handedness === 'left' || one) {
      const wy = y, wx = one ? 0 : x;
      if (Math.hypot(wx, wy) > 0.15) {
        const yaw = rig.rotation.y + xr.headYawLocal;
        const f = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)), r = new THREE.Vector3(-f.z, 0, f.x);
        const d = f.multiplyScalar(-wy).add(r.multiplyScalar(wx)).multiplyScalar(dt * 1.6);
        const feet = new THREE.Vector3(head.x, rig.position.y, head.z);
        if (tryMove(feet, d)) { rig.position.x += feet.x - head.x; rig.position.z += feet.z - head.z; rig.position.y = feet.y; }
      }
    }
    if (src.handedness !== 'left' || one) {
      // Snap turn 30° around your head
      const side = src.handedness === 'right' ? 'right' : 'left';
      if (Math.abs(x) > 0.7 && xr.turnReady[side]) {
        xr.turnReady[side] = false;
        const ang = -Math.sign(x) * Math.PI / 6;
        const off = rig.position.clone().sub(head).applyAxisAngle(new THREE.Vector3(0, 1, 0), ang);
        rig.position.copy(head).add(off); rig.rotation.y += ang;
      } else if (Math.abs(x) < 0.3) xr.turnReady[side] = true;
    }
  }
  reticle.visible = !!target; if (target) reticle.position.copy(target).add(new THREE.Vector3(0, 0.02, 0));
  // Follow the floor under your head (porch step, front step)
  const y = floorAt(head.x, head.z, rig.position.y);
  if (y !== null && Math.abs(y - rig.position.y) < 0.4) rig.position.y += (y - rig.position.y) * Math.min(1, dt * 10);
}

// ---------- Loop ----------
let last = 0;
renderer.setAnimationLoop((t, frame) => {
  const dt = Math.min((t - last) / 1000, 0.1) || 0; last = t;
  if (xr.session && frame) vrStep(dt, frame);
  else if (!stageVisible) return;
  else screenStep(dt);
  if (marker.visible) marker.material.opacity = 0.55 + Math.sin(t / 180) * 0.3;
  renderer.render(scene, camera);
});

placeAt('yard');
apply();
