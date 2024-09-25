import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000,
);
camera.position.z = 5;

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 3Dオブジェクトを定義、sceneに追加
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controller
// const controls = new OrbitControls(camera, renderer.domElement);

// 5. Scene のレンダリング
function animate() {
	requestAnimationFrame(animate);

	// controls.update();

	// キューブの回転アニメーションを追加 ( 60fps )
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}
animate();
