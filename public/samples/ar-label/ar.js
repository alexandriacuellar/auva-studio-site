// Label AR: track the Hollow Night label (printed, or on a computer screen) and let the
// Horseman ride out of it. Runs in the phone's browser with MindAR, no app.
import * as THREE from 'three';
import { MindARThree } from '/card/vendor/mindar/mindar-image-three.prod.js';
import { buildShow } from './horseman.js';

export async function startLabelAR(container, { found, lost, onAction, labels }) {
  const mindar = new MindARThree({
    container, imageTargetSrc: new URL('./label.mind', import.meta.url).href, maxTrack: 1,
    uiLoading: 'no', uiScanning: 'no', uiError: 'no',
    filterMinCF: 0.0001, filterBeta: 0.001, missTolerance: 8,
  });
  const { renderer, scene, camera } = mindar;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Anchor space: the label is 1 unit wide and 1.3 tall, centred, +z out of the label.
  // He rides on an invisible floor across the lower part of the label.
  const anchor = mindar.addAnchor(0);
  // A bit smaller than the preview, so he stays in frame with the phone close to the label.
  const show = await buildShow({ groundY: -0.5, onAction, labels });
  const fit = new THREE.Group(); fit.scale.setScalar(0.85); fit.position.y = -0.075; fit.add(show.root);
  anchor.group.add(fit);

  // Start the ride each time the label comes into view after a proper look away
  let lostAt = -Infinity;
  anchor.onTargetFound = () => { if (performance.now() - lostAt > 2500) show.replay(); found?.(); };
  anchor.onTargetLost = () => { lostAt = performance.now(); lost?.(); };

  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
  const onTap = (e) => {
    if (!anchor.group.visible) return;
    const r = container.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    show.tap(ray);
  };
  container.addEventListener('click', onTap);

  await mindar.start();
  renderer.setAnimationLoop(() => { show.update(); renderer.render(scene, camera); });

  return {
    stop() {
      container.removeEventListener('click', onTap);
      renderer.setAnimationLoop(null);
      mindar.stop();
      renderer.dispose();
    },
  };
}
