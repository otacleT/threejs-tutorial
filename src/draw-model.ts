import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { type GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
	25,
	window.innerWidth / window.innerHeight,
	1,
	1000,
);
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 光源を追加
// const light = new THREE.DirectionalLight("#ffffff", 2);
// const ambient = new THREE.AmbientLight("#85b2cd");
// light.position.set(10, 10, 0).normalize();
// scene.add(light);
// scene.add(ambient);

// 4. 3Dオブジェクトを定義、sceneに追加

// Controller
// const controls = new OrbitControls(camera, renderer.domElement);

// 5. Scene のレンダリング
function animate() {
	requestAnimationFrame(animate);

	// controls.update();

	renderer.render(scene, camera);
}
animate();
