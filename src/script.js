import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols";
import gsap from "gsap";

const disp = document.querySelector("button#disp");
const caos = document.querySelector("button#caos");
const rotate = document.querySelector("button#rotate");

let flagCaos = false;
let flagRotate = false;

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeffcc);
const geometry = new THREE.BoxGeometry();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const group = new THREE.Group();

let wireFrameflag = true;
for (let i = 0; i < 100; i++) {
  const material2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, Math.random(), 1),
  });
  material2.wireframe = wireFrameflag;
  let mesh = new THREE.Mesh(geometry, material2);

  mesh.scale.x = (Math.random() - 0.5) * 5;
  mesh.scale.y = (Math.random() - 0.5) * 5;
  mesh.scale.z = (Math.random() - 0.5) * 5;

  mesh.position.x = (Math.random() - 0.5) * 20;
  mesh.position.y = (Math.random() - 0.5) * 20;
  mesh.position.z = (Math.random() - 0.5) * 20;
  group.add(mesh);
  scene.add(group);
  wireFrameflag = !wireFrameflag;
}
console.log(group);
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.z = 15;
camera.lookAt(0, 0, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(size.width, size.height);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const clock = new THREE.Clock();

const displacement = () => {
  group.children.forEach((element) => {
    gsap.to(element.position, {
      duration: 1,
      delay: 0,
      x: (Math.random() - 0.5) * 20,
      ease: "elastic",
    });
    gsap.to(element.position, {
      duration: 1,
      delay: 1,
      y: (Math.random() - 0.5) * 20,
      ease: "elastic",
    });
    gsap.to(element.position, {
      duration: 1,
      delay: 2,
      z: (Math.random() - 0.5) * 20,
      ease: "elastic",
    });
  });
};

const caotich = () => {
  group.children.forEach((element) => {
    element.position.x = (Math.random() - 0.5) * 20;
    element.position.y = (Math.random() - 0.5) * 20;
    element.position.z = (Math.random() - 0.5) * 20;
  });
};

const rotation = () => {
  let elapsedTime = clock.getElapsedTime();
  group.children.forEach((element) => {
    element.rotation.y = elapsedTime * 0.1;
    element.rotation.x = elapsedTime * 0.1;
    element.rotation.z = elapsedTime * 0.1;
  });
};

const tick = () => {
  let elapsedTime = clock.getElapsedTime();
  
  if (flagCaos) {
    caotich();
  }
  if (flagRotate) {
    rotation();
  }
  
  group.rotation.y = elapsedTime * 0.09;
  

  controls.update();
  window.requestAnimationFrame(tick);
  renderer.render(scene, camera);
};


window.addEventListener('resize', () =>
{
    //Update sizes
    size.width = window.innerWidth
    size.height = window.innerHeight
    //Update camera
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    //Update renderer
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

disp.addEventListener("click", displacement);

caos.addEventListener("click", () => {
  flagCaos = true;
  flagRotate = false;
});

rotate.addEventListener("click", () => {
  flagCaos = false;
  flagRotate = true;
});

tick();