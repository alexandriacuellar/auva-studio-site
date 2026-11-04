// Label demo preview: no camera. A virtual can of Hollow Night on a table,
// and the same Horseman show as the camera AR. Drag to turn, tap the buttons.
import * as THREE from 'three';
import { buildShow, LABEL_H } from './horseman.js';

export async function startLabelPreview(container, { label, onAction, labels }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 50);
  const look = new THREE.Vector3();
  const size = () => {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false); renderer.domElement.style.width = '100%'; renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    // Narrow phones step back so the circle he rides stays on screen
    const narrow = w / h < 0.7;
    // and sit higher, clear of the hint card at the bottom of the screen.
    camera.position.set(0, 0.35, narrow ? 5.0 : 3.9);
    look.set(0, narrow ? -0.6 : -0.3, 0.3);
    camera.lookAt(look);
    camera.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  // The can: label centred on the anchor, the can behind it, the table under it
  const CAN_R = 0.5, CAN_H = 1.9, BASE = -CAN_H / 2;
  const holder = new THREE.Group(); scene.add(holder);
  const labelTex = await new THREE.TextureLoader().loadAsync(label); labelTex.colorSpace = THREE.SRGBColorSpace; labelTex.anisotropy = 8;
  const arc = 1 / CAN_R;
  const can = new THREE.Group(); can.position.z = -CAN_R; holder.add(can);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(CAN_R - 0.003, CAN_R - 0.003, CAN_H - 0.08, 64, 1, true), new THREE.MeshStandardMaterial({ color: '#0b1030', roughness: 0.35, metalness: 0.5 }));
  const front = new THREE.Mesh(new THREE.CylinderGeometry(CAN_R, CAN_R, LABEL_H, 48, 1, true, -arc / 2, arc), new THREE.MeshStandardMaterial({ map: labelTex, roughness: 0.45, metalness: 0.15 }));
  const metal = new THREE.MeshStandardMaterial({ color: '#b9bec8', roughness: 0.3, metalness: 0.9 });
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(CAN_R * 0.88, CAN_R - 0.003, 0.08, 64), metal); lid.position.y = CAN_H / 2 - 0.02;
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(CAN_R - 0.003, CAN_R * 0.86, 0.06, 64), metal); foot.position.y = -CAN_H / 2 + 0.03;
  const tab = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.012, 0.12), metal); tab.position.set(0, CAN_H / 2 + 0.03, 0.16);
  can.add(body, front, lid, foot, tab);
  // A dark tabletop that fades out at the edges
  const tc = document.createElement('canvas'); tc.width = tc.height = 256; const tg = tc.getContext('2d');
  const gr = tg.createRadialGradient(128, 128, 10, 128, 128, 128); gr.addColorStop(0, 'rgba(58,40,30,1)'); gr.addColorStop(0.7, 'rgba(40,28,22,0.85)'); gr.addColorStop(1, 'rgba(20,16,14,0)');
  tg.fillStyle = gr; tg.fillRect(0, 0, 256, 256);
  const tt = new THREE.CanvasTexture(tc); tt.colorSpace = THREE.SRGBColorSpace;
  const table = new THREE.Mesh(new THREE.CircleGeometry(2.4, 64), new THREE.MeshBasicMaterial({ map: tt, transparent: true, depthWrite: false }));
  table.rotation.x = -Math.PI / 2; table.position.set(0, BASE, 0.1); holder.add(table);

  const show = await buildShow({ groundY: BASE, onAction, labels });
  holder.add(show.root);

  // Drag to turn the table; a tap (no drag) presses what's under the finger
  let yaw = 0, drag = null, moved = false;
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const el = renderer.domElement; el.style.touchAction = 'none';
  const down = (e) => { drag = { x: e.clientX, yaw }; moved = false; el.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 6) moved = true;
    yaw = Math.max(-1.1, Math.min(1.1, drag.yaw + dx * 0.006));
  };
  const up = (e) => {
    const wasDrag = moved; drag = null;
    if (wasDrag) return;
    const r = el.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    show.tap(ray);
  };
  el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up);

  renderer.setAnimationLoop(() => {
    holder.rotation.y += (yaw - holder.rotation.y) * 0.12;
    show.update();
    renderer.render(scene, camera);
  });

  return {
    replay: show.replay,
    stop() {
      renderer.setAnimationLoop(null);
      removeEventListener('resize', size);
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up);
      renderer.dispose();
    },
  };
}
