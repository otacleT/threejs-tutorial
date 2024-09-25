import * as CANNON from "cannon-es";
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 1. Scene
const scene = new THREE.Scene();

// 2. Camera
const camera = new THREE.PerspectiveCamera(
	100,
	window.innerWidth / window.innerHeight,
	1,
	1000,
);
camera.position.set(0, 20, -30);
camera.lookAt(0, 0, 0);

// 3. Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 3Dオブジェクトを定義、sceneに追加

// 箱
const boxGeo = new THREE.BoxGeometry(2, 2, 2);
const boxMat = new THREE.MeshBasicMaterial({
	color: 0x00ff00,
	wireframe: true,
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
scene.add(boxMesh);

// 球
const sphereGeo = new THREE.SphereGeometry(2);
const sphereMat = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphereMesh);

// 地面
const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide,
	wireframe: true,
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
scene.add(groundMesh);

// 5. 物理的な世界の定義、3Dオブジェクトに追加
const world = new CANNON.World({
	gravity: new CANNON.Vec3(0, -9.81, 0),
});

const boxBody = new CANNON.Body({
	mass: 1,
	shape: new CANNON.Box(new CANNON.Vec3(2, 2, 2)),
	position: new CANNON.Vec3(5, 20, 0),
});
world.addBody(boxBody);

const sphereBody = new CANNON.Body({
	mass: 1,
	shape: new CANNON.Sphere(2),
	position: new CANNON.Vec3(0, 15, 0),
});
world.addBody(sphereBody);
sphereBody.linearDamping = 0.31;

const groundPhysMat = new CANNON.Material();
const groundBody = new CANNON.Body({
	shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
	type: CANNON.Body.STATIC,
	material: groundPhysMat,
});
world.addBody(groundBody);

// Controller
const controls = new OrbitControls(camera, renderer.domElement);

// 6. Scene, world のレンダリング
const animate = (): void => {
	requestAnimationFrame(animate);

	controls.update();

	world.fixedStep();

	// 3Dオブジェクトの位置を物理的な世界の位置に合わせる
	groundMesh.position.copy(groundBody.position);
	groundMesh.quaternion.copy(groundBody.quaternion);
	boxMesh.position.copy(boxBody.position);
	boxMesh.quaternion.copy(boxBody.quaternion);
	sphereMesh.position.copy(sphereBody.position);
	sphereMesh.quaternion.copy(sphereBody.quaternion);

	renderer.render(scene, camera);
};
animate();
