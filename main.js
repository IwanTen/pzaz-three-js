import * as THREE from "three";
const canvas = document.getElementById("three-canvas");

const scene = new THREE.Scene(0xaaaaaa);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshToonMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
scene.add(camera);

const renderer = new THREE.WebGL1Renderer({ canvas: canvas });
renderer.setClearColor(0xffffff, 1);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);

window.addEventListener("resize", () => {
  console.log("window resized!");
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const run = () => {
  const elapsedTime = clock.getElapsedTime();
  console.log("animate");
  // mesh.rotation.y += 0.01 * elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(run);
};

run();
