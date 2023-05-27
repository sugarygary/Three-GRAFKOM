import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.gammaFactor = 2;

const cubeloader = new THREE.CubeTextureLoader();
cubeloader.setPath("night-skyboxes/HornstullsStrand/");
const backgroundTexture = cubeloader.load([
  "posx.jpg",
  "negx.jpg",
  "posy.jpg",
  "negy.jpg",
  "posz.jpg",
  "negz.jpg",
]);
scene.background = backgroundTexture;
cam.position.x = 0;
cam.position.z = 90;
cam.position.y = 5;
document.body.appendChild(renderer.domElement);

//#region dummylight
const pointLightb = new THREE.PointLight(0xf4d4ab, 20, 200, 2);
pointLightb.castShadow = true;
pointLightb.position.set(0, 93, 0);
scene.add(pointLightb);
let pointLightbHelper = new THREE.PointLightHelper(pointLightb, 5);
scene.add(pointLightbHelper);
//#endregion

//#region lampu 1

// lampu 2
const pointLightLamp2 = new THREE.PointLight(0xf4d4ab, 20, 150, 3);
pointLightLamp2.position.set(-316, 77, 0);
pointLightLamp2.castShadow = true;
scene.add(pointLightLamp2);
let pointLightHelperLamp2 = new THREE.PointLightHelper(pointLightLamp2, 5);
scene.add(pointLightHelperLamp2);

// Lampu 2

// Lampu 4

//#endregion

const upColour = 0x717e8e;
const downColour = 0x4040ff;
let hemlight = new THREE.HemisphereLight(upColour, downColour, 0.5);
// helper = new THREE.HemisphereLightHelper(hemlight, 2);
// hemlight.add(helper);
scene.add(hemlight);

const loader = new GLTFLoader();
const geometrySphere = new THREE.SphereGeometry(15, 32, 16);
var materialSphere = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.5,
  opacity: 0,
  transparent: true,
});
const sphere = new THREE.Mesh(geometrySphere, materialSphere);
sphere.position.set(0, 5, 0);

scene.add(sphere);
let mobil;
loader.load("./new_assets/scene (1).glb", function (gltf) {
  mobil = gltf.scene;
  mobil.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  mobil.position.x = 178;
  mobil.position.y = -4;
  mobil.position.z = 0;
  mobil.scale.x = 0.2;
  mobil.scale.y = 0.2;
  mobil.scale.z = 0.2;
  sphere.add(mobil);
});
const spotLight = new THREE.SpotLight(
  0xffece0,
  20,
  2000,
  (Math.PI * 15) / 180,
  0.2,
  0.1
);
// spotLight.castShadow = true;
spotLight.position.set(173, 2, 13);
spotLight.target.position.set(171, 1, 31);
sphere.add(spotLight.target);
sphere.add(spotLight);
const spotLight2 = new THREE.SpotLight(
  0xffece0,
  20,
  2000,
  (Math.PI * 15) / 180,
  0.2,
  0.1
);
// spotLight2.castShadow = true;
spotLight2.position.set(183, 2, 13);
spotLight2.target.position.set(184, 1, 31);
sphere.add(spotLight2.target);
sphere.add(spotLight2);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

//#region BUNDARAN
let land;
loader.load("./new_assets/bundaran_quarter.glb", function (gltf) {
  land = gltf.scene;
  land.traverse(function (node) {
    if (node.isMesh) {
      node.receiveShadow = true;
      node.castShadow = false;
    }
  });
  land.position.x = -234.5;
  land.position.y = 0.1;
  land.position.z = -724;
  land.scale.x = 1560;
  land.scale.y = 10;
  land.scale.z = 1560;
  scene.add(land);
});
let land2;
loader.load("./new_assets/bundaran_quarter.glb", function (gltf) {
  land2 = gltf.scene;
  land2.traverse(function (node) {
    if (node.isMesh) {
      node.receiveShadow = true;
      node.castShadow = false;
    }
  });
  land2.position.x = -723;
  land2.position.y = 0.1;
  land2.position.z = 235;
  land2.scale.x = 1560;
  land2.scale.y = 10;
  land2.scale.z = 1560;
  land2.rotateY(Math.PI * 0.5);
  scene.add(land2);
});
let land3;
loader.load("./new_assets/bundaran_quarter.glb", function (gltf) {
  land3 = gltf.scene;
  land3.traverse(function (node) {
    if (node.isMesh) {
      node.receiveShadow = true;
      node.castShadow = false;
    }
  });
  land3.position.x = -234.5 + 959;
  land3.position.y = 0.1;
  land3.position.z = -724 + 488.5;
  land3.rotateY((Math.PI * 3) / 2);
  land3.scale.x = 1560;
  land3.scale.y = 10;
  land3.scale.z = 1560;
  scene.add(land3);
});
let land4;
loader.load("./new_assets/bundaran_quarter.glb", function (gltf) {
  land4 = gltf.scene;
  land4.traverse(function (node) {
    if (node.isMesh) {
      node.receiveShadow = true;
      node.castShadow = false;
    }
  });
  land4.position.x = -723 + 959;
  land4.position.y = 0.1;
  land4.position.z = 235 + 488.5;
  land4.scale.x = 1560;
  land4.scale.y = 10;
  land4.scale.z = 1560;
  land4.rotateY(Math.PI);
  scene.add(land4);
});
//#endregion
let lamp;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp = gltf.scene;
  lamp.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  lamp.position.x = 325;
  lamp.position.y = 0;
  lamp.position.z = 0;
  lamp.scale.x = 2;
  lamp.scale.y = 2;
  lamp.scale.z = 2;
  scene.add(lamp);
});
let lamp2;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp2 = gltf.scene;
  lamp2.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  lamp2.position.x = -325;
  lamp2.position.y = 0;
  lamp2.position.z = 0;
  lamp2.rotateY(Math.PI);
  lamp2.scale.x = 2;
  lamp2.scale.y = 2;
  lamp2.scale.z = 2;
  scene.add(lamp2);
});
let lamp3;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp3 = gltf.scene;
  lamp3.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  lamp3.position.x = 0;
  lamp3.position.y = 0;
  lamp3.position.z = 325;
  lamp3.rotateY(-Math.PI * 0.5);
  lamp3.scale.x = 2;
  lamp3.scale.y = 2;
  lamp3.scale.z = 2;
  scene.add(lamp3);
});
let lamp4;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp4 = gltf.scene;
  lamp4.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  lamp4.position.x = 0;
  lamp4.position.y = 0;
  lamp4.position.z = -325;
  lamp4.rotateY(Math.PI * 0.5);
  lamp4.scale.x = 2;
  lamp4.scale.y = 2;
  lamp4.scale.z = 2;
  scene.add(lamp4);
});
const texture = new THREE.TextureLoader().load(
  "new_assets/0d74be130bab1bdcb4857be2d6fb79ee.jpg"
);
const texturePave = new THREE.TextureLoader().load(
  "new_assets/arched-cobblestone-pavement-texture-cobblestone-pavement-street-arched-pattern-seamless-tileable-repeating-square-d-rendering-112522272.jpg"
);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(12, 12);
texturePave.wrapS = THREE.RepeatWrapping;
texturePave.wrapT = THREE.RepeatWrapping;
texturePave.repeat.set(32, 32);
// immediately use the texture for material creation

const material = new THREE.MeshPhongMaterial({
  map: texture,
  bumpMap: texture,
  bumpScale: 2,
});
const geometry = new THREE.CylinderGeometry(150, 150, 0.01, 32);
const cylinder = new THREE.Mesh(geometry, material);
cylinder.receiveShadow = true;
cylinder.position.set(0, 0, 0);
scene.add(cylinder);
const material2 = new THREE.MeshPhongMaterial({
  map: texturePave,
  bumpMap: texturePave,
});
const geometry2 = new THREE.CylinderGeometry(400, 400, 0, 32);
const cylinder2 = new THREE.Mesh(geometry2, material2);
cylinder2.receiveShadow = true;
cylinder2.castShadow = false;
cylinder2.position.set(0, 0, 0);
scene.add(cylinder2);
let arcdetriomphe;
loader.load("./new_assets/arc_de_triomphe_phong.glb", function (gltf) {
  arcdetriomphe = gltf.scene;
  arcdetriomphe.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  arcdetriomphe.position.x = -23;
  arcdetriomphe.position.y = -6;
  arcdetriomphe.position.z = -5;
  arcdetriomphe.rotateY(0.319);
  arcdetriomphe.scale.x = 5;
  arcdetriomphe.scale.y = 5;
  arcdetriomphe.scale.z = 5;
  scene.add(arcdetriomphe);
});

const controls = new PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

const box = new THREE.Mesh(boxGeometry, boxMaterial);

const axesHelper = new THREE.AxesHelper(50);
axesHelper.position.y = 10;
scene.add(axesHelper);

scene.add(box);

let keyboard = [];
addEventListener("keydown", (e) => {
  keyboard[e.key] = true;
});
addEventListener("keyup", (e) => {
  keyboard[e.key] = false;
});

let displayCoordinate = document.getElementById("coor");
function processKeyboard(delta) {
  let speed = 100;
  let actualSpeed = speed * delta;
  if (keyboard["w"]) {
    // if (
    //   cam.position.z > -250 &&
    //   cam.position.z < 250 &&
    //   cam.position.x > -200 &&
    //   cam.position.x < 200
    // ) {
    controls.moveForward(actualSpeed);
    // }
  }
  if (keyboard["a"]) {
    // if (cam.position.x > -200) {
    controls.moveRight(-actualSpeed);
    // }
  }
  if (keyboard["s"]) {
    // if (
    //   cam.position.z > -250 &&
    //   cam.position.z < 250 &&
    //   cam.position.x > -200 &&
    //   cam.position.x < 200
    // ) {
    controls.moveForward(-actualSpeed);
    // }
  }
  if (keyboard["d"]) {
    // if (cam.position.x < 200) {
    controls.moveRight(actualSpeed);
    // }
  }
  if (keyboard["Control"]) {
    // console.log(cam.position.y)
    if (cam.position.y > 0) {
      cam.translateY(-actualSpeed);
    }
  }
  if (keyboard[" "]) {
    // if (cam.position.y < 120) {
    cam.translateY(actualSpeed);
    // }
  }
}

let timer = 0;
function drawScene() {
  renderer.render(scene, cam);
  // console.log(mobil.getWorldPosition());
  // directionalLight.position.set(cam,, 30, 0);
  let delta = clock.getDelta();
  sphere.rotateY(-0.01);
  processKeyboard(delta);
  controls.lock();
  displayCoordinate.innerHTML =
    "(" +
    Math.round(cam.position.x) +
    "," +
    Math.round(cam.position.y) +
    "," +
    Math.round(cam.position.z) +
    ")";
  requestAnimationFrame(drawScene);
}
drawScene();
