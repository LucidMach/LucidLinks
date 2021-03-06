import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Canvas
const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#171717");

// Loaders
/* const textureLoader = new THREE.TextureLoader(); */
const fontLoader = new FontLoader();

// Textures
/* const matcapTexture = textureLoader.load("textures/matcaps/7.png"); */

// Fonts
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  // Text Mesh Geometery
  const textGeometry = new TextGeometry("LucidMach", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();

  const text = new THREE.Mesh(
    textGeometry,
    new THREE.MeshBasicMaterial({
      color: 0x00f1f1,
      wireframe: true,
    })
  );
  text.position.z = 1;
  scene.add(text);

  // Globe
  const geometry = new THREE.SphereGeometry(1);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: 0x00a1a1,
      wireframe: true,
    })
  );
  scene.add(mesh);

  // Donuts
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);

  // generate 100 donuts on the left and right side of the world
  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(
      donutGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x00c1c1,
        wireframe: true,
      })
    );
    i % 2 == 0
      ? (donut.position.x = (Math.random() - 1.4) * 10)
      : (donut.position.x = (Math.random() + 0.4) * 10);
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

//  * Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.y = 0.25;
camera.position.z = 0.015;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  if (camera.position.z < 7) camera.position.z += (7 - camera.position.z) / 100;
  if (camera.position.z > 7) camera.position.z -= (7 + camera.position.z) / 100;
  if (camera.position.y < 0)
    camera.position.y -= (0.25 + camera.position.y) / 100;
  if (camera.position.y > 0)
    camera.position.y += (0.25 - camera.position.y) / 100;
  if (camera.position.x < 0)
    camera.position.x -= (0.25 + camera.position.x) / 100;
  if (camera.position.x > 0)
    camera.position.x += (0.25 - camera.position.x) / 100;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// notifying user how to use this website
const btn = document.querySelector(".btn") as HTMLButtonElement;
const info = document.querySelector(".info") as HTMLDivElement;
const links = document.querySelector(".links") as HTMLDivElement;

btn.addEventListener("click", () => {
  info.classList.add("hide");
  links.classList.remove("hide");
  // Vibe
  var audio = new Audio("audio/the_grid.mp3");

  // plays music when user touches the screen
  document.addEventListener("touchstart", () => {
    if (audio.paused) {
      audio.play();
      audio.loop = true;
    }
  });

  // plays music when user clicks on the screen
  document.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      audio.loop = true;
    }
  });
  tick();
});
