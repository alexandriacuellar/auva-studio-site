// The Stone Ridge Farmhouse: a one-story modern farmhouse built in three.js at real size (meters).
// Front faces +z. The roof is its own group so it can lift off to show the floor plan.
// Used live by app.js and, in the same form, to export the .glb files for iPhone Quick Look.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const FINISHES = {
  white: { label: 'White and black', siding: '#f1efe9', trim: '#f1efe9', roof: '#2a2c30', frame: '#1c1e22', door: '#1c1e22', map: 'batten' },
  red: { label: 'Barn red', siding: '#8b2e24', trim: '#f1ede4', roof: '#383b40', frame: '#f1ede4', door: '#2a2c30', map: 'batten' },
  cedar: { label: 'Cedar', siding: '#b07a4f', trim: '#2a2c30', roof: '#5d636b', frame: '#2a2c30', door: '#2c3f73', map: 'cedar' },
};

let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
function tex(size, paint) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  paint(c.getContext('2d'), size);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4;
  return t;
}
// Grayscale maps; the material color tints them.
const battenTex = () => tex(128, (g, s) => {
  g.fillStyle = '#f4f4f4'; g.fillRect(0, 0, s, s);
  g.fillStyle = '#ffffff'; g.fillRect(s * 0.42, 0, s * 0.14, s);
  g.fillStyle = '#c9c9c9'; g.fillRect(s * 0.56, 0, s * 0.05, s);
});
const cedarTex = () => tex(256, (g, s) => {
  g.fillStyle = '#e8e8e8'; g.fillRect(0, 0, s, s);
  for (let i = 0; i < 70; i++) {
    const x = rnd() * s; g.strokeStyle = `rgba(60,40,30,${0.08 + rnd() * 0.14})`; g.lineWidth = 1 + rnd() * 2;
    g.beginPath(); for (let y = 0; y <= s; y += 16) g.lineTo(x + Math.sin(y / 40 + i) * 3, y); g.stroke();
  }
  g.fillStyle = '#ffffff'; g.fillRect(s * 0.42, 0, s * 0.14, s);
  g.fillStyle = '#a8a8a8'; g.fillRect(s * 0.56, 0, s * 0.04, s);
});
const seamTex = () => tex(64, (g, s) => {
  g.fillStyle = '#efefef'; g.fillRect(0, 0, s, s);
  g.fillStyle = '#ffffff'; g.fillRect(s * 0.46, 0, s * 0.06, s);
  g.fillStyle = '#b8b8b8'; g.fillRect(s * 0.52, 0, s * 0.05, s);
});
const plankTex = () => tex(256, (g, s) => {
  g.fillStyle = '#c69a6a'; g.fillRect(0, 0, s, s);
  for (let r = 0; r < 8; r++) {
    g.fillStyle = `rgba(90,60,30,${0.05 + rnd() * 0.12})`; g.fillRect(0, r * s / 8, s, s / 8);
    g.fillStyle = 'rgba(70,45,25,0.35)'; g.fillRect(0, r * s / 8, s, 1.5);
    const cut = rnd() * s; g.fillRect(cut, r * s / 8, 1.5, s / 8);
  }
});
const tileTex = () => tex(128, (g, s) => {
  g.fillStyle = '#e9e6df'; g.fillRect(0, 0, s, s);
  g.fillStyle = '#c9c4ba'; for (let i = 0; i < 4; i++) { g.fillRect(i * s / 4, 0, 2, s); g.fillRect(0, i * s / 4, s, 2); }
});
const grassTex = () => tex(256, (g, s) => {
  g.fillStyle = '#7f9c5c'; g.fillRect(0, 0, s, s);
  for (let i = 0; i < 1400; i++) { g.fillStyle = rnd() > 0.5 ? 'rgba(60,90,40,0.25)' : 'rgba(170,190,110,0.22)'; g.fillRect(rnd() * s, rnd() * s, 2, 2 + rnd() * 3); }
});

// World-planar UVs so textures keep the same scale on every wall and roof piece.
function planarUV(geo, size) {
  const p = geo.attributes.position, n = geo.attributes.normal, uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    const nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i)), nz = Math.abs(n.getZ(i));
    let u, v;
    if (ny > 0.7) { u = p.getX(i); v = p.getZ(i); } else if (nx > nz) { u = p.getZ(i); v = p.getY(i); } else { u = p.getX(i); v = p.getY(i); }
    uv[i * 2] = u / size; uv[i * 2 + 1] = v / size;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geo;
}

export function buildHouse({ finish = 'white', labels = true, openDoor = false, lining = false, omit = [] } = {}) {
  const parts = {}; // material key -> geometries
  const add = (key, geo) => { (parts[key] ||= []).push(geo.index ? geo.toNonIndexed() : geo); };
  const box = (key, x0, x1, y0, y1, z0, z1) => {
    const g = new THREE.BoxGeometry(x1 - x0, y1 - y0, z1 - z0);
    g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2); add(key, g); return g;
  };
  const roofParts = {};
  const addRoof = (key, geo) => { (roofParts[key] ||= []).push(geo.index ? geo.toNonIndexed() : geo); };

  const F = 0.3;      // floor height (top of the foundation)
  const T = 0.2;      // exterior wall thickness
  const t = 0.12;     // interior wall thickness

  // A straight wall with window and door holes. along: 'x' or 'z'; at: the fixed coordinate.
  // openings: [center along the wall, width, bottom y, top y, kind]
  function wall(key, along, at, a0, a1, y0, y1, th, openings = []) {
    // lining: painted drywall on the inside face of the siding walls, for the walk-through
    const inside = key === 'siding' && lining ? -(Math.sign(at) || 1) : 0;
    const seg = (b0, b1, c0, c1) => {
      if (b1 - b0 < 0.001 || c1 - c0 < 0.001) return;
      if (along === 'x') box(key, b0, b1, c0, c1, at - th / 2, at + th / 2);
      else box(key, at - th / 2, at + th / 2, c0, c1, b0, b1);
      if (!inside) return;
      const d0 = at + inside * (th / 2 + 0.002), d1 = at + inside * (th / 2 + 0.012);
      if (along === 'x') box('inner', b0, b1, c0, c1, Math.min(d0, d1), Math.max(d0, d1));
      else box('inner', Math.min(d0, d1), Math.max(d0, d1), c0, c1, b0, b1);
    };
    const ops = [...openings].sort((p, q) => p[0] - q[0]);
    let cur = a0;
    for (const [c, w, b, top, kind] of ops) {
      const s = c - w / 2, e = c + w / 2;
      seg(cur, s, y0, y1); seg(s, e, y0, b); seg(s, e, top, y1); cur = e;
      if (kind) opening(along, at, c, w, b, top, th, kind);
    }
    seg(cur, a1, y0, y1);
  }
  // Window or door filling a hole in an exterior wall.
  function opening(along, at, c, w, b, top, th, kind) {
    const place = (key, u0, u1, v0, v1, d0, d1) => {
      if (along === 'x') box(key, u0, u1, v0, v1, at + d0, at + d1); else box(key, at + d0, at + d1, v0, v1, u0, u1);
    };
    const s = c - w / 2, e = c + w / 2, fw = 0.07;
    const z = 0.004; // frames and glass sit a hair off the wall's opening faces, so no two faces share a plane and flicker
    const out = Math.sign(at) || 1; // which side of the wall is outside
    const face = (d) => (out > 0 ? [d - 0.03, d + 0.03] : [-d - 0.03, -d + 0.03]);
    const [f0, f1] = face(th / 2);
    if (kind === 'door' && openDoor) {
      // Swung open into the house, so the walk-through can go in the front door
      const inn = -out * (th / 2 + 0.005);
      if (along === 'x') box('door', s + 0.005, s + 0.055, b, top, at + Math.min(inn, inn - out * 0.95), at + Math.max(inn, inn - out * 0.95));
      else box('door', at + Math.min(inn, inn - out * 0.95), at + Math.max(inn, inn - out * 0.95), b, top, s + 0.005, s + 0.055);
    } else if (kind === 'door') {
      place('door', s, e, b, top, -th / 2 + 0.04, th / 2 - 0.04);
      place('glass', s + 0.15, e - 0.15, b + 1.0, top - 0.15, ...face(th / 2 - 0.02));
    } else {
      place('glass', s + z, e - z, b + z, top - z, -0.02, 0.02);
      const mid = (s + e) / 2, vmid = b + (top - b) * 0.55;
      place('frame', mid - 0.025, mid + 0.025, b, top, f0, f1);
      place('frame', s, e, vmid - 0.025, vmid + 0.025, f0, f1);
    }
    place('frame', s - fw, s + z, b, top, f0, f1); place('frame', e - z, e + fw, b, top, f0, f1);
    place('frame', s - fw, e + fw, top - z, top + fw, f0, f1);
    place('trim', s - fw - 0.04, e + fw + 0.04, b - 0.06, b - 0.006, ...face(th / 2 + 0.025));
    if (kind !== 'door') {
      // Bottom rail outside and a sill on the inside (no inside frame, so it doesn't read as a second window)
      place('frame', s + z, e - z, b - z, b + fw, f0, f1);
      place('trim', s - fw - 0.04, e + fw + 0.04, b - 0.045, b - 0.006, ...face(-th / 2 - 0.035));
    }
  }

  // ---------- Site ----------
  box('lawn', -9, 13.5, -0.18, 0, -7.5, 10);
  box('gravel', -0.45, 1.05, 0, 0.02, 6.2, 10);           // front path
  box('gravel', 6.6, 9.9, 0, 0.02, 2.5, 10);              // driveway to the wing
  const trees = [[-7.6, -5.6, 1.15], [12.2, -5.8, 1], [-7.8, 7.8, 0.9], [12.4, 8.2, 0.8]];
  for (const [x, z, k] of trees) {
    const trunk = new THREE.CylinderGeometry(0.16 * k, 0.22 * k, 2.2 * k, 8); trunk.translate(x, 1.1 * k, z); add('trunk', trunk);
    const leaves = new THREE.IcosahedronGeometry(1.7 * k, 1); leaves.translate(x, 3.1 * k, z); add('leaves', leaves);
  }

  // ---------- Foundation and floors ----------
  box('foundation', -6, 6, 0, F, -4, 4);
  box('foundation', 6, 10.5, 0, F, -3.5, 2.5);
  box('wood', -5.9, 5.9, F - 0.01, F + 0.005, -3.9, 3.9);
  box('wood', 6, 10.4, F - 0.01, F + 0.005, -3.4, 2.4);
  box('tile', 3.06, 5.9, F + 0.005, F + 0.012, -3.9, -1.66);
  box('oak', 5.88, 6.08, F - 0.01, F + 0.008, -1.15, -0.25);      // threshold into the wing
  box('oak', -0.2, 0.8, F - 0.01, F + 0.008, 3.88, 4.12);         // front door threshold

  // ---------- Exterior walls ----------
  const W1 = F + 0.9, W2 = F + 2.6;   // window sill and head
  const H = F + 3.0;                  // main eave height
  const HW = F + 2.7;                 // wing eave height
  wall('siding', 'x', 4, -6 - T / 2, 6 + T / 2, F, H, T, [[-4.2, 1.2, W1, W2, 'win'], [-2.0, 1.2, W1, W2, 'win'], [0.3, 1.0, F, F + 2.25, 'door'], [2.0, 1.6, W1, W2, 'win'], [4.5, 1.2, W1, W2, 'win']]);
  wall('siding', 'x', -4, -6 - T / 2, 6 + T / 2, F, H, T, [[-3.5, 2.4, F + 0.5, W2, 'win'], [1.0, 1.6, F + 1.2, W2, 'win'], [4.6, 0.8, F + 1.6, W2, 'win']]);
  wall('siding', 'z', -6, -4 + T / 2, 4 - T / 2, F, H, T, [[-2.2, 1.0, W1, W2, 'win'], [2.2, 1.0, W1, W2, 'win']]);
  wall('siding', 'z', 6, 2.5, 4 - T / 2, F, H, T);          // the bit of the right wall the wing doesn't cover
  wall('siding', 'z', 6, -4 + T / 2, -3.5, F, H, T);
  wall('inner', 'z', 6, -3.5, 2.5, F, H, t, [[-0.7, 0.9, F, F + 2.1]]); // door from the hall to the wing
  wall('siding', 'x', 2.5, 6, 10.5 + T / 2, F, HW, T, [[8.25, 1.8, F + 0.5, W2, 'win']]);
  wall('siding', 'x', -3.5, 6, 10.5 + T / 2, F, HW, T, [[8.25, 1.2, W1, W2 - 0.2, 'win']]);
  wall('siding', 'z', 10.5, -3.5 + T / 2, 2.5 - T / 2, F, HW, T, [[-0.5, 1.2, W1, W2 - 0.2, 'win']]);
  // Corner boards
  for (const [x, z] of [[-6, 4], [6, 4], [-6, -4], [6, -4], [10.5, 2.5], [10.5, -3.5]]) box('trim', x - 0.17, x + 0.17, F - 0.02, (x > 7 ? HW : H) + 0.01, z - 0.17, z + 0.17);

  // Chimney (stone) on the left end
  box('stone', -6.95, -6.1, 0, 7.6, -0.5, 0.5);
  box('foundation', -7.05, -6.0, 7.6, 7.75, -0.6, 0.6);

  // ---------- Porch ----------
  box('deck', -6.1, 6.1, 0, F, 4, 6.2);
  box('deck', -0.3, 0.9, 0, F * 0.5, 6.2, 6.6);
  for (const x of [-5.95, -2.4, 1.6, 5.95]) box('trim', x - 0.09, x + 0.09, F, H - 0.15, 5.95, 6.13);
  box('trim', -6.1, 6.1, H - 0.35, H - 0.15, 5.95, 6.15);   // beam

  // ---------- Interior ----------
  wall('inner', 'z', 3, -4, 4, F, H, t, [[-0.7, 1.0, F, F + 2.1]]);
  wall('inner', 'x', -1.6, 3, 6, F, H, t, [[4.2, 0.8, F, F + 2.1]]);
  wall('inner', 'x', 0.2, 3, 6, F, H, t, [[4.2, 0.9, F, F + 2.1]]);
  // Living room: rug, sofa facing the fireplace, coffee table, fireplace
  box('rug', -5.2, -1.8, F + 0.005, F + 0.02, -1.4, 1.4);
  box('sofa', -2.6, -1.8, F, F + 0.45, -1.2, 1.2); box('sofa', -2.0, -1.75, F, F + 0.85, -1.2, 1.2);
  box('oak', -4.1, -3.3, F, F + 0.42, -0.6, 0.6);
  // Fireplace: stone jambs and lintel around a dark firebox, logs and a fire, oak mantel, stone hearth
  box('stone', -5.9, -5.4, F, F + 0.8, -0.9, -0.45); box('stone', -5.9, -5.4, F, F + 0.8, 0.45, 0.9);
  box('stone', -5.9, -5.4, F + 0.8, F + 1.05, -0.9, 0.9);
  box('stone', -5.9, -5.62, F + 1.12, F + 2.2, -0.7, 0.7);
  box('oak', -5.92, -5.3, F + 1.05, F + 1.12, -1.0, 1.0);
  box('stone', -5.4, -5.05, F, F + 0.06, -1.0, 1.0);
  box('dark', -5.9, -5.66, F, F + 0.8, -0.45, 0.45);
  box('dark', -5.66, -5.4, F, F + 0.02, -0.45, 0.45);
  for (const [z, a] of [[-0.05, 0.35], [0.05, -0.35]]) { const g = new THREE.CylinderGeometry(0.055, 0.06, 0.62, 7); g.rotateX(Math.PI / 2); g.rotateY(a); g.translate(-5.53, F + 0.08, z); add('trunk', g); }
  for (const [z, h, r, key] of [[-0.16, 0.34, 0.09, 'fire'], [0.02, 0.46, 0.11, 'fire'], [0.18, 0.3, 0.08, 'fire'], [0.02, 0.28, 0.06, 'flame'], [-0.12, 0.2, 0.05, 'flame'], [0.15, 0.18, 0.045, 'flame']]) {
    const g = new THREE.ConeGeometry(r, h, 7); g.translate(key === 'flame' ? -5.5 : -5.53, F + 0.12 + h / 2, z); add(key, g);
  }
  // Kitchen: back counter, island, and the dining table with six chairs
  if (!omit.includes('kitchen')) {
    box('cabinet', -0.6, 2.15, F, F + 0.86, -3.9, -3.3);              // base cabinets
    box('counter', -0.62, 2.17, F + 0.86, F + 0.92, -3.92, -3.25);      // stone top
    box('steel', 0.95, 1.55, F + 0.92, F + 0.93, -3.8, -3.42);          // sink
    box('dark', -0.45, 0.25, F + 0.92, F + 0.935, -3.82, -3.36);        // cooktop
    box('cabinet', -0.6, 0.1, F + 1.5, F + 2.25, -3.9, -3.55);          // upper cabinets
    box('steel', 2.2, 2.88, F, F + 1.95, -3.9, -3.2);                   // fridge
  }
  box('cabinet', 0.15, 2.05, F, F + 0.86, -2.3, -1.5);                // island
  box('counter', 0.05, 2.15, F + 0.86, F + 0.92, -2.35, -1.25);
  for (const x of [0.5, 1.1, 1.7]) box('oak', x - 0.17, x + 0.17, F, F + 0.68, -1.15, -0.85); // stools
  // Dining table on four legs, set toward the kitchen wall so the path from the front door to the kitchen stays open
  const tx0 = 0.9, tx1 = 2.7, tz0 = 1.45, tz1 = 2.35;
  box('oak', tx0, tx1, F + 0.71, F + 0.76, tz0, tz1);
  for (const x of [tx0 + 0.06, tx1 - 0.12]) for (const z of [tz0 + 0.06, tz1 - 0.12]) box('oak', x, x + 0.06, F, F + 0.71, z, z + 0.06);
  // Six chairs: seat, four legs, and a back away from the table
  for (const x of [1.2, 1.8, 2.4]) for (const [z, back] of [[1.05, -1], [2.75, 1]]) {
    box('oak', x - 0.2, x + 0.2, F + 0.42, F + 0.47, z - 0.2, z + 0.2);
    for (const lx of [x - 0.19, x + 0.15]) for (const lz of [z - 0.19, z + 0.15]) box('oak', lx, lx + 0.04, F, F + 0.42, lz, lz + 0.04);
    const bz = z + back * 0.18; box('oak', x - 0.2, x + 0.2, F + 0.47, F + 0.95, bz - 0.02, bz + 0.02);
  }
  // Bedroom 2, bath
  box('bedding', 3.9, 5.88, F, F + 0.5, 1.3, 2.9); box('throw', 3.88, 4.45, F + 0.02, F + 0.53, 1.28, 2.92); box('oak', 5.8, 5.88, F, F + 1.1, 1.25, 2.95);
  // omit: leave out fixtures that the walk-through replaces with real 3D models
  if (!omit.includes('tub')) {
    box('porcelain', 4.25, 5.9, F, F + 0.56, -3.9, -3.1);              // tub
    box('water', 4.38, 5.77, F + 0.56, F + 0.565, -3.8, -3.2);
  }
  if (!omit.includes('vanity')) {
    box('cabinet', 3.06, 3.62, F, F + 0.82, -2.95, -1.95);             // vanity
    box('vanitytop', 3.06, 3.65, F + 0.82, F + 0.86, -2.98, -1.92);
    box('porcelain', 3.22, 3.52, F + 0.86, F + 0.93, -2.66, -2.24);     // basin
    box('water', 3.26, 3.48, F + 0.93, F + 0.935, -2.62, -2.28);
    box('steel', 3.08, 3.2, F + 0.86, F + 1.02, -2.48, -2.42);          // faucet
  }
  if (!omit.includes('toilet')) {
    box('porcelain', 3.45, 3.95, F, F + 0.8, -3.9, -3.72);             // toilet tank
    box('porcelain', 3.5, 3.9, F, F + 0.42, -3.72, -3.3);              // toilet bowl
  }
  // Blue-gray tile up the bath walls, so the white tub, toilet and sink stand out.
  const wh = F + 1.25;
  box('walltile', 3.06, 5.9, F, wh, -3.9, -3.87);            // back wall
  box('walltile', 5.87, 5.9, F, wh, -3.9, -1.66);            // right wall
  box('walltile', 3.06, 3.09, F, wh, -3.9, -1.66);           // left wall
  box('walltile', 3.06, 3.8, F, wh, -1.69, -1.66);           // front wall, either side of the door
  box('walltile', 4.6, 5.9, F, wh, -1.69, -1.66);
  box('mat', 4.4, 5.4, F + 0.012, F + 0.024, -2.95, -2.45);          // bath mat
  // Primary suite in the wing
  box('rug', 7.4, 10.0, F + 0.005, F + 0.02, -2.0, 1.0);
  box('bedding', 8.3, 10.38, F, F + 0.55, -1.4, 0.4); box('throw', 8.28, 8.85, F + 0.02, F + 0.58, -1.42, 0.42); box('oak', 10.3, 10.38, F, F + 1.2, -1.45, 0.45);

  // ---------- Roof (lifts off) ----------
  const ov = 0.4;
  const slab = (len, along, angle, ridgeY, half, ovHere, key = 'roof', thick = 0.14, cx = 0, cz = 0) => {
    // A roof plane hinged at the ridge. along: the ridge direction.
    const L = (half + ovHere) / Math.cos(angle);
    const g = new THREE.BoxGeometry(along === 'x' ? len : L, thick, along === 'x' ? L : len);
    if (along === 'x') g.translate(0, thick / 2, L / 2); else g.translate(L / 2, thick / 2, 0);
    planarUV(g, 0.45);
    if (along === 'z') { const uv = g.attributes.uv; for (let i = 0; i < uv.count; i++) { const u = uv.getX(i); uv.setX(i, uv.getY(i)); uv.setY(i, u); } }
    return (dir) => {
      const c = g.clone();
      if (along === 'x') { c.rotateX(angle); if (dir < 0) c.rotateY(Math.PI); }
      else { c.rotateZ(-angle); if (dir < 0) c.rotateY(Math.PI); }
      c.translate(cx, ridgeY, cz); addRoof(key, c);
    };
  };
  const A = Math.atan2(3.2, 4), ridge = H + 4 * Math.tan(A) + 0.05;
  const main = slab(12 + ov * 2 + 0.3, 'x', A, ridge, 4, ov);
  main(1); main(-1);
  const cap = new THREE.BoxGeometry(12 + ov * 2 + 0.3, 0.16, 0.3); cap.translate(0, ridge + 0.1, 0); addRoof('roof', cap);
  const AW = Math.PI / 4, ridgeW = HW + 2.25 + 0.05;
  const wingR = slab(6 + ov * 2, 'z', AW, ridgeW, 2.25, ov, 'roof', 0.14, 8.25, -0.5);
  wingR(1);
  const wingL = slab(6 + ov * 2, 'z', AW, ridgeW, 2.25, 0, 'roof', 0.14, 8.25, -0.5);
  wingL(-1);
  const capW = new THREE.BoxGeometry(0.28, 0.16, 6 + ov * 2); capW.translate(8.25, ridgeW + 0.1, -0.5); addRoof('roof', capW);
  // Porch roof: a gentle shed roof from the wall out over the posts
  const pr = new THREE.BoxGeometry(12.6, 0.12, 2.6); pr.translate(0, 0.06, 1.3); planarUV(pr, 0.45);
  pr.rotateX(Math.atan2(0.45, 2.4)); pr.translate(0, H + 0.15, 3.95); addRoof('roof', pr);
  // Gable ends (siding) go with the roof so the rooms show from above.
  const gable = (half, rise, y0) => {
    const s = new THREE.Shape([new THREE.Vector2(-half, 0), new THREE.Vector2(half, 0), new THREE.Vector2(0, rise)]);
    const g = new THREE.ExtrudeGeometry(s, { depth: T, bevelEnabled: false }); g.translate(0, y0, -T / 2); return g;
  };
  for (const x of [-6, 6]) {
    const g = gable(4 + T / 2, 4 * Math.tan(A), H); g.rotateY(Math.PI / 2); g.translate(x, 0, 0); addRoof('siding', planarUV(g, 0.45));
    if (lining) { const l = gable(4, 4 * Math.tan(A) - 0.1, H); l.scale(1, 1, 0.05); l.rotateY(Math.PI / 2); l.translate(x - Math.sign(x) * (T / 2 + 0.006), 0, 0); addRoof('inner', l); }
  }
  for (const z of [2.5, -3.5]) {
    const g = gable(2.25 + T / 2, 2.25, HW); g.translate(8.25, 0, z); addRoof('siding', planarUV(g, 0.45));
    if (lining) { const l = gable(2.25, 2.15, HW); l.scale(1, 1, 0.05); l.translate(8.25, 0, z - Math.sign(z) * (T / 2 + 0.006)); addRoof('inner', l); }
  }

  // ---------- Materials ----------
  const std = (o) => new THREE.MeshStandardMaterial({ roughness: 0.8, ...o });
  const maps = { batten: battenTex(), cedar: cedarTex() };
  const mats = {
    siding: std({ map: maps.batten }), trim: std({}), roof: std({ map: seamTex(), roughness: 0.45, metalness: 0.35 }),
    frame: std({ roughness: 0.5 }), door: std({ roughness: 0.5 }),
    // See-through glass with a light blue tint, so it reads as a window from inside and out
    glass: std({ color: '#bcd6e6', roughness: 0.08, metalness: 0.1, emissive: '#000000', transparent: true, opacity: 0.32, depthWrite: false }),
    foundation: std({ color: '#7c7d7f' }), stone: std({ color: '#8f8a82', roughness: 0.95 }),
    deck: std({ map: plankTex(), color: '#b98f63' }), wood: std({ map: plankTex(), color: '#7a5840' }), tile: std({ map: tileTex(), color: '#5f6b72' }),
    inner: std({ color: '#f6f4ef' }), rug: std({ color: '#c4ae8c' }), mat: std({ color: '#b5653f' }), walltile: std({ map: tileTex(), color: '#7c97a6' }), vanitytop: std({ color: '#3d4045', roughness: 0.35 }), sofa: std({ color: '#3e5a7a' }),
    bedding: std({ color: '#f4f0e8' }), throw: std({ color: '#b5653f' }), oak: std({ color: '#b58a5d' }),
    counter: std({ color: '#3d4045', roughness: 0.35 }), cabinet: std({ color: '#5f7a69', roughness: 0.6 }),
    steel: std({ color: '#b9bec4', roughness: 0.35, metalness: 0.6 }), dark: std({ color: '#26282c', roughness: 0.4 }),
    porcelain: std({ color: '#ffffff', roughness: 0.25 }), water: std({ color: '#8fc3d6', roughness: 0.1 }),
    lawn: std({ map: grassTex() }), gravel: std({ color: '#cfc6b4', roughness: 1 }), trunk: std({ color: '#6b4f36' }),
    leaves: std({ color: '#5e7d48', flatShading: true }),
    fire: std({ color: '#ff7a1a', emissive: '#ff6a10', emissiveIntensity: 1.6, roughness: 1 }), flame: std({ color: '#ffd166', emissive: '#ffc23d', emissiveIntensity: 1.8, roughness: 1 }),
  };
  const roofMats = { roof: mats.roof.clone(), siding: mats.siding.clone(), ...(lining ? { inner: mats.inner.clone() } : {}) };
  const uvSize = { siding: 0.45, roof: 0.45, wood: 1.6, deck: 1.6, tile: 1.2, walltile: 0.6, lawn: 3 };

  const root = new THREE.Group(); root.name = 'farmhouse';
  const body = new THREE.Group(); body.name = 'house'; root.add(body);
  for (const [key, geos] of Object.entries(parts)) {
    const g = mergeGeometries(geos); if (uvSize[key]) planarUV(g, uvSize[key]);
    const m = new THREE.Mesh(g, mats[key]); m.name = key; body.add(m);
  }
  const roof = new THREE.Group(); roof.name = 'roof'; body.add(roof);
  for (const [key, geos] of Object.entries(roofParts)) {
    const m = new THREE.Mesh(mergeGeometries(geos), roofMats[key]); m.name = 'roof-' + key; roof.add(m);
  }
  // Center the site on the origin.
  body.position.set(-2.25, 0, -1.25);

  // Porch lights (glow at night)
  const bulbs = new THREE.Group(); body.add(bulbs);
  const bulbMat = std({ color: '#efe6cf', roughness: 0.2, emissive: '#000000' });
  // Two black wall lanterns beside the front door: backplate, arm, glass box, cap.
  let lamp;
  const part = (geo, mat, x, y, z) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); lamp.add(m); return m; };
  for (const lx of [-0.42, 1.0]) {
    lamp = new THREE.Group(); lamp.position.set(lx, F + 1.95, 4 + T / 2); lamp.scale.setScalar(1.25); bulbs.add(lamp);
    const x = 0, y = 0, wz = 0;
    part(new THREE.BoxGeometry(0.14, 0.32, 0.03), mats.dark, x, y + 0.02, wz + 0.015);
    part(new THREE.BoxGeometry(0.04, 0.04, 0.12), mats.dark, x, y + 0.1, wz + 0.09);
    part(new THREE.BoxGeometry(0.16, 0.24, 0.16), bulbMat, x, y, wz + 0.22);
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) part(new THREE.BoxGeometry(0.025, 0.26, 0.025), mats.dark, x + dx * 0.08, y, wz + 0.22 + dz * 0.08);
    part(new THREE.BoxGeometry(0.2, 0.03, 0.2), mats.dark, x, y - 0.135, wz + 0.22);
    part(new THREE.BoxGeometry(0.22, 0.03, 0.22), mats.dark, x, y + 0.135, wz + 0.22);
    part(new THREE.ConeGeometry(0.13, 0.1, 4).rotateY(Math.PI / 4), mats.dark, x, y + 0.2, wz + 0.22);
  }

  // Room names, shown when the roof is off.
  const labelGroup = new THREE.Group(); labelGroup.name = 'labels'; labelGroup.visible = false; body.add(labelGroup);
  if (labels) {
    const rooms = [['Living room', -3.6, 0.2], ['Kitchen', 1.1, -0.45], ['Dining', 1.8, 3.0], ['Bedroom', 4.5, 1.0], ['Bath', 4.6, -1.95],
      ['Primary suite', 8.25, 1.4], ['Front porch', -3.5, 5.1]];
    for (const [name, x, z] of rooms) {
      const c = document.createElement('canvas'); c.width = 512; c.height = 128;
      const g = c.getContext('2d'); g.font = '600 56px "Instrument Sans", system-ui, sans-serif';
      const w = Math.min(500, g.measureText(name).width + 70);
      g.fillStyle = 'rgba(23,28,44,0.86)'; g.beginPath(); g.roundRect((512 - w) / 2, 14, w, 100, 50); g.fill();
      g.fillStyle = '#ffffff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(name, 256, 66);
      const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace;
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true, depthTest: false }));
      sp.scale.set(3.6, 0.9, 1); sp.position.set(x, F + 2.3, z); sp.renderOrder = 10; labelGroup.add(sp);
    }
  }

  function setFinish(name) {
    const f = FINISHES[name] || FINISHES.white;
    for (const m of [mats.siding, roofMats.siding]) { m.color.set(f.siding); m.map = maps[f.map]; m.needsUpdate = true; }
    mats.trim.color.set(f.trim); mats.frame.color.set(f.frame); mats.door.color.set(f.door);
    mats.roof.color.set(f.roof); roofMats.roof.color.set(f.roof);
  }
  function setNight(on) {
    mats.glass.emissive.set(on ? '#ffc477' : '#000000'); mats.glass.emissiveIntensity = on ? 3.2 : 0;
    mats.glass.color.set(on ? '#5a4a33' : '#bcd6e6'); mats.glass.opacity = on ? 0.85 : 0.32;
    bulbMat.emissive.set(on ? '#ffe2a6' : '#000000'); bulbMat.emissiveIntensity = on ? 2 : 0;
    mats.fire.emissiveIntensity = on ? 3 : 1.6; mats.flame.emissiveIntensity = on ? 3.4 : 1.8;
  }
  setFinish(finish); setNight(false);
  return { root, body, roof, mats, roofMats: Object.values(roofMats), labels: labelGroup, setFinish, setNight };
}
