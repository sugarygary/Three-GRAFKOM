import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

var boxes = [];
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
cubeloader.setPath("night-skyboxes/Vindelalven/");
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
const pointLightLamp1 = new THREE.PointLight(0xf4d4ab, 20, 150, 3);
pointLightLamp1.position.set(0, 77, -316);
pointLightLamp1.castShadow = true;
scene.add(pointLightLamp1);
let pointLightHelperLamp1 = new THREE.PointLightHelper(pointLightLamp1, 5);
scene.add(pointLightHelperLamp1);

// lampu 2
const pointLightLamp2 = new THREE.PointLight(0xf4d4ab, 20, 150, 3);
pointLightLamp2.position.set(-316, 77, 0);
pointLightLamp2.castShadow = true;
scene.add(pointLightLamp2);
let pointLightHelperLamp2 = new THREE.PointLightHelper(pointLightLamp2, 5);
scene.add(pointLightHelperLamp2);

// Lampu 3
const pointLightLamp3 = new THREE.PointLight(0xf4d4ab, 20, 150, 3);
pointLightLamp3.position.set(317, 77, 0);
pointLightLamp3.castShadow = true;
scene.add(pointLightLamp3);
let pointLightHelperLamp3 = new THREE.PointLightHelper(pointLightLamp3, 5);
scene.add(pointLightHelperLamp3);

// Lampu 4
const pointLightLamp4 = new THREE.PointLight(0xf4d4ab, 20, 150, 3);
pointLightLamp4.position.set(0, 77, 316);
pointLightLamp4.castShadow = true;
scene.add(pointLightLamp4);
let pointLightHelperLamp4 = new THREE.PointLightHelper(pointLightLamp4, 5);
scene.add(pointLightHelperLamp4);
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
const sphere2 = new THREE.Mesh(geometrySphere, materialSphere);
sphere2.position.set(0, 5, 0);

scene.add(sphere);
scene.add(sphere2);
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
  mobil.position.y = -5.5;
  mobil.position.z = 0;
  mobil.scale.x = 0.28;
  mobil.scale.y = 0.28;
  mobil.scale.z = 0.28;
  sphere.add(mobil);
});

let pesawat;
loader.load("./new_assets/supermarine_spitfire.glb", function (gltf) {
  pesawat = gltf.scene;
  // mobil.traverse(function (node) {
  //   if (node.isMesh) {
  //     node.castShadow = true;
  //     node.receiveShadow = true;
  //   }
  // });
  pesawat.position.x = 500;
  pesawat.position.y = 500;
  pesawat.position.z = 0;
  pesawat.scale.x = 0.4;
  pesawat.scale.y = 0.4;
  pesawat.scale.z = 0.4;
  sphere2.add(pesawat);
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
spotLight.target.position.set(171, -2, 31);
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
spotLight2.target.position.set(184, -2, 31);
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
  lamp.position.x = 325;
  lamp.position.y = 0;
  lamp.position.z = 0;
  lamp.scale.x = 2;
  lamp.scale.y = 2;
  lamp.scale.z = 2;
  gltf.scene.updateMatrixWorld(true);
  lamp.traverse(function (node) {
    if (node.isMesh) {
      let box = new THREE.Box3();
      node.castShadow = true;
      node.geometry.computeBoundingBox();
      box.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld);
      boxes.push(box);
      const helper = new THREE.Box3Helper(box, 0xffff00);
      scene.add(helper);
    }
  });
  scene.add(lamp);
});
let lamp2;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp2 = gltf.scene;
  lamp2.position.x = -325;
  lamp2.position.y = 0;
  lamp2.position.z = 0;
  lamp2.rotateY(Math.PI);
  lamp2.scale.x = 2;
  lamp2.scale.y = 2;
  lamp2.scale.z = 2;
  gltf.scene.updateMatrixWorld(true);
  lamp2.traverse(function (node) {
    if (node.isMesh) {
      let box = new THREE.Box3();
      node.castShadow = true;
      node.geometry.computeBoundingBox();
      box.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld);
      boxes.push(box);
      const helper = new THREE.Box3Helper(box, 0xffff00);
      scene.add(helper);
    }
  });
  scene.add(lamp2);
});
let lamp3;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp3 = gltf.scene;
  lamp3.position.x = 0;
  lamp3.position.y = 0;
  lamp3.position.z = 325;
  lamp3.rotateY(-Math.PI * 0.5);
  lamp3.scale.x = 2;
  lamp3.scale.y = 2;
  lamp3.scale.z = 2;
  gltf.scene.updateMatrixWorld(true);
  lamp3.traverse(function (node) {
    if (node.isMesh) {
      let box = new THREE.Box3();
      node.castShadow = true;
      node.geometry.computeBoundingBox();
      box.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld);
      boxes.push(box);
      const helper = new THREE.Box3Helper(box, 0xffff00);
      scene.add(helper);
    }
  });
  scene.add(lamp3);
});
let lamp4;
loader.load("./new_assets/street_lamp.glb", function (gltf) {
  lamp4 = gltf.scene;
  lamp4.position.x = 0;
  lamp4.position.y = 0;
  lamp4.position.z = -325;
  lamp4.rotateY(Math.PI * 0.5);
  lamp4.scale.x = 2;
  lamp4.scale.y = 2;
  lamp4.scale.z = 2;
  gltf.scene.updateMatrixWorld(true);
  lamp4.traverse(function (node) {
    if (node.isMesh) {
      let box = new THREE.Box3();
      node.castShadow = true;
      node.geometry.computeBoundingBox();
      box.copy(node.geometry.boundingBox).applyMatrix4(node.matrixWorld);
      boxes.push(box);
      const helper = new THREE.Box3Helper(box, 0xffff00);
      scene.add(helper);
    }
  });
  scene.add(lamp4);
});
const texture = new THREE.TextureLoader().load(
  "new_assets/0d74be130bab1bdcb4857be2d6fb79ee.jpg"
);
const texturePave = new THREE.TextureLoader().load(
  "new_assets/bricks_street.jpg"
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
  arcdetriomphe.position.x = -25;
  arcdetriomphe.position.y = -6;
  arcdetriomphe.position.z = -5;
  arcdetriomphe.rotateY(0.319);
  arcdetriomphe.scale.x = 5;
  arcdetriomphe.scale.y = 5;
  arcdetriomphe.scale.z = 5;
  arcdetriomphe.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });
  scene.add(arcdetriomphe);
});
let gedung;
loader.load("./new_assets/buildings_front_1.glb", function (gltf) {
  gedung = gltf.scene;
  gedung.position.x = 370;
  gedung.position.y = 125;
  gedung.position.z = -5;
  gedung.rotateY(-0.2);
  gedung.scale.x = 500;
  gedung.scale.y = 500;
  gedung.scale.z = 500;
  gedung.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  scene.add(gedung);
});
let gedung2;
loader.load("./new_assets/buildings_front_2.glb", function (gltf) {
  gedung2 = gltf.scene;
  gedung2.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung2.position.x = 470;
  gedung2.position.y = 125;
  gedung2.position.z = 9;
  gedung2.rotateY(-0.725);
  gedung2.scale.x = 500;
  gedung2.scale.y = 500;
  gedung2.scale.z = 500;
  scene.add(gedung2);
});
let gedung3;
loader.load("./new_assets/buildings_front_3.glb", function (gltf) {
  gedung3 = gltf.scene;
  gedung3.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung3.position.x = 620;
  gedung3.position.y = 125;
  gedung3.position.z = 175;
  gedung3.rotateY(-1.232);
  gedung3.scale.x = 400;
  gedung3.scale.y = 500;
  gedung3.scale.z = 500;
  scene.add(gedung3);
});
let gedung4;
loader.load("./new_assets/buildings_front_4.glb", function (gltf) {
  gedung4 = gltf.scene;
  gedung4.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung4.position.x = 695;
  gedung4.position.y = 125;
  gedung4.position.z = 420;
  gedung4.rotateY(-1.62);
  gedung4.scale.x = 500;
  gedung4.scale.y = 500;
  gedung4.scale.z = 500;
  scene.add(gedung4);
});

let gedung5;
loader.load("./new_assets/guingamp_shop_1_france.glb", function (gltf) {
  gedung5 = gltf.scene;
  gedung5.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung5.position.x = -152;
  gedung5.position.y = 0;
  gedung5.position.z = 410;
  gedung5.rotateY(40.5);
  gedung5.scale.x = 15;
  gedung5.scale.y = 15;
  gedung5.scale.z = 15;
  scene.add(gedung5);
});

let gedung6;
loader.load("./new_assets/nivelles_house_9_belgium.glb", function (gltf) {
  gedung6 = gltf.scene;
  gedung6.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung6.position.x = -336;
  gedung6.position.y = 0;
  gedung6.position.z = 369;
  gedung6.rotateY(2.5);
  gedung6.scale.x = 15;
  gedung6.scale.y = 12;
  gedung6.scale.z = 15;
  scene.add(gedung6);
});
let gedung7;
loader.load("./new_assets/bordeaux_flat_1_corner_france.glb", function (gltf) {
  gedung7 = gltf.scene;
  gedung7.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung7.position.x = -376;
  gedung7.position.y = 0;
  gedung7.position.z = 328;
  gedung7.rotateY(2.2);
  gedung7.scale.x = 15;
  gedung7.scale.y = 12;
  gedung7.scale.z = 15;
  scene.add(gedung7);
});
let gedung8;
loader.load("./new_assets/angers_shop_2_france.glb", function (gltf) {
  gedung8 = gltf.scene;
  gedung8.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung8.position.x = -462;
  gedung8.position.y = 0;
  gedung8.position.z = 183;
  gedung8.rotateY(1.86);
  gedung8.scale.x = 15;
  gedung8.scale.y = 15;
  gedung8.scale.z = 15;
  scene.add(gedung8);
});
let gedung9;
loader.load("./new_assets/laval_shop_1_france.glb", function (gltf) {
  gedung9 = gltf.scene;
  gedung9.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung9.position.x = -497;
  gedung9.position.y = 0;
  gedung9.position.z = -25;
  gedung9.rotateY(1.52);
  gedung9.scale.x = 15;
  gedung9.scale.y = 15;
  gedung9.scale.z = 15;
  scene.add(gedung9);
});
let gedung10;
loader.load("./new_assets/bourges_corner_shop_1_france.glb", function (gltf) {
  gedung10 = gltf.scene;
  gedung10.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung10.position.x = -485;
  gedung10.position.y = 0;
  gedung10.position.z = -122;
  gedung10.rotateY(1.24);
  gedung10.scale.x = 15;
  gedung10.scale.y = 15;
  gedung10.scale.z = 15;
  scene.add(gedung10);
});
let gedung11;
loader.load(
  "./new_assets/chatelaudren_filler_shop_1_france.glb",
  function (gltf) {
    gedung11 = gltf.scene;
    gedung11.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    gedung11.position.x = -405;
    gedung11.position.y = 0;
    gedung11.position.z = -292;
    gedung11.rotateY(0.95);
    gedung11.scale.x = 15;
    gedung11.scale.y = 15;
    gedung11.scale.z = 15;
    scene.add(gedung11);
  }
);
let gedung12;
loader.load("./new_assets/rouen_house_1_france.glb", function (gltf) {
  gedung12 = gltf.scene;
  gedung12.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung12.position.x = -327;
  gedung12.position.y = 0;
  gedung12.position.z = -394;
  gedung12.rotateY(0.67);
  gedung12.scale.x = 15;
  gedung12.scale.y = 15;
  gedung12.scale.z = 15;
  scene.add(gedung12);
});
let gedung13;
loader.load("./new_assets/le_mans_filler_house_1.glb", function (gltf) {
  gedung13 = gltf.scene;
  gedung13.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung13.position.x = -197;
  gedung13.position.y = 0;
  gedung13.position.z = -392;
  gedung13.rotateY(0.475);
  gedung13.scale.x = 15;
  gedung13.scale.y = 15;
  gedung13.scale.z = 15;
  scene.add(gedung13);
});
let gedung14;
loader.load("./new_assets/troyes_filler_house_1_france.glb", function (gltf) {
  gedung14 = gltf.scene;
  gedung14.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung14.position.x = -649;
  gedung14.position.y = 0;
  gedung14.position.z = -320;
  gedung14.rotateY(0.3);
  gedung14.scale.x = 15;
  gedung14.scale.y = 15;
  gedung14.scale.z = 15;
  scene.add(gedung14);
});
let gedung15;
loader.load("./new_assets/dijon_house_1_france.glb", function (gltf) {
  gedung15 = gltf.scene;
  gedung15.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung15.position.x = -39;
  gedung15.position.y = 0;
  gedung15.position.z = -495;
  gedung15.rotateY(0.1);
  gedung15.scale.x = 15;
  gedung15.scale.y = 13;
  gedung15.scale.z = 15;
  scene.add(gedung15);
});
let gedung16;
loader.load("./new_assets/fumay_house_1_france.glb", function (gltf) {
  gedung16 = gltf.scene;
  gedung16.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung16.position.x = 102;
  gedung16.position.y = 0;
  gedung16.position.z = -442;
  gedung16.rotateY(-0.22);
  gedung16.scale.x = 15;
  gedung16.scale.y = 15;
  gedung16.scale.z = 15;
  scene.add(gedung16);
});
let gedung17;
loader.load("./new_assets/troyes_shop_2_france.glb", function (gltf) {
  gedung17 = gltf.scene;
  gedung17.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung17.position.x = 218;
  gedung17.position.y = 0;
  gedung17.position.z = -445;
  gedung17.rotateY(-0.41);
  gedung17.scale.x = 15;
  gedung17.scale.y = 15;
  gedung17.scale.z = 15;
  scene.add(gedung17);
});
let gedung18;
loader.load("./new_assets/dijon_shop_1_france.glb", function (gltf) {
  gedung18 = gltf.scene;
  gedung18.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung18.position.x = 347;
  gedung18.position.y = 0;
  gedung18.position.z = -354;
  gedung18.rotateY(-0.8);
  gedung18.scale.x = 15;
  gedung18.scale.y = 15;
  gedung18.scale.z = 15;
  scene.add(gedung18);
});
let gedung19;
loader.load("./new_assets/troyes_shop_3_france.glb", function (gltf) {
  gedung19 = gltf.scene;
  gedung19.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung19.position.x = 160;
  gedung19.position.y = 0;
  gedung19.position.z = -784;
  gedung19.rotateY(-1.1);
  gedung19.scale.x = 15;
  gedung19.scale.y = 15;
  gedung19.scale.z = 15;
  scene.add(gedung19);
});
let gedung20;
loader.load("./new_assets/troyes_shop_5_france.glb", function (gltf) {
  gedung20 = gltf.scene;
  gedung20.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung20.position.x = 515;
  gedung20.position.y = 0;
  gedung20.position.z = 18;
  gedung20.rotateY(-1.36);
  gedung20.scale.x = 15;
  gedung20.scale.y = 15;
  gedung20.scale.z = 15;
  scene.add(gedung20);
});
let gedung21;
loader.load("./new_assets/le_mans_filler_house_1.glb", function (gltf) {
  gedung21 = gltf.scene;
  gedung21.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  gedung21.position.x = 440;
  gedung21.position.y = 0;
  gedung21.position.z = -24.8;
  gedung21.rotateY(-1.55);
  gedung21.scale.x = 15.5;
  gedung21.scale.y = 15;
  gedung21.scale.z = 15;
  scene.add(gedung21);
});

let orang;
loader.load("./new_assets/sam_low_poly.glb", function (gltf) {
  orang = gltf.scene;
  orang.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang.position.x = 127;
  orang.position.y = 15;
  orang.position.z = 295;
  orang.rotateY(-1.55);
  orang.scale.x = 14;
  orang.scale.y = 14;
  orang.scale.z = 14;
  scene.add(orang);
});

let orang2;
loader.load("./new_assets/assistant_-_guffy_girl.glb", function (gltf) {
  orang2 = gltf.scene;
  orang2.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang2.position.x = -29;
  orang2.position.y = 0;
  orang2.position.z = -66;
  orang2.rotateY(-3);
  orang2.scale.x = 13;
  orang2.scale.y = 13;
  orang2.scale.z = 13;
  scene.add(orang2);
});

let orang3;
loader.load("./new_assets/photographer_with_tripod1.glb", function (gltf) {
  orang3 = gltf.scene;
  orang3.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang3.position.x = -27;
  orang3.position.y = -1;
  orang3.position.z = -134;
  orang3.scale.x = 12;
  orang3.scale.y = 12;
  orang3.scale.z = 12;
  scene.add(orang3);
});

let orang4;
loader.load("./new_assets/female_smokeing.glb", function (gltf) {
  orang4 = gltf.scene;
  orang4.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang4.position.x = 351;
  orang4.position.y = 0;
  orang4.position.z = -146;
  orang4.rotateY(-1);
  orang4.scale.x = 0.12;
  orang4.scale.y = 0.12;
  orang4.scale.z = 0.12;
  scene.add(orang4);
});

let orang5;
loader.load("./new_assets/dennis_posed_004_-_male_standing_business_model.glb", function (gltf) {
  orang5 = gltf.scene;
  orang5.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  //orang5.position.x = -305;
  orang5.position.x = -35;
  orang5.position.y = 0;
  //orang5.position.z = 86;
  orang5.position.z = -66;
  orang5.rotateY(3.5);
  orang5.scale.x = 0.12;
  orang5.scale.y = 0.12;
  orang5.scale.z = 0.12;
  scene.add(orang5);
});

let orang6;
loader.load("./new_assets/fabienne__percy_001_-_mother_and_child.glb", function (gltf) {
  orang6 = gltf.scene;
  orang6.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang6.position.x = 130;
  orang6.position.y = 0;
  orang6.position.z = 46;
  orang6.scale.x = 0.12;
  orang6.scale.y = 0.12;
  orang6.scale.z = 0.12;
  scene.add(orang6);
});

let orang7;
loader.load("./new_assets/gumshoe_male.glb", function (gltf) {
  orang7 = gltf.scene;
  orang7.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang7.position.x = -305;
  orang7.position.y = 0;
  orang7.position.z = 86;
  orang7.rotateY(2);
  orang7.scale.x = 0.15;
  orang7.scale.y = 0.15;
  orang7.scale.z = 0.15;
  scene.add(orang7);
});

let orang8;
loader.load("./new_assets/assistant_-_night_out_outfit.glb", function (gltf) {
  orang8 = gltf.scene;
  orang8.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  orang8.position.x = -99;
  orang8.position.y = 0;
  orang8.position.z = 80;
  orang8.rotateY(-1);
  orang8.scale.x = 13;
  orang8.scale.y = 13;
  orang8.scale.z = 13;
  scene.add(orang8);
});

let mobil2;
loader.load("./new_assets/free_porsche_911_carrera_4s.glb", function (gltf) {
  mobil2 = gltf.scene;
  mobil2.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  mobil2.position.x = 78;
  mobil2.position.y = 8;
  mobil2.position.z = 266;
  mobil2.rotateY(-1.4);
  mobil2.scale.x = 12;
  mobil2.scale.y = 12;
  mobil2.scale.z = 12;
  scene.add(mobil2);
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
  let originX = cam.position.x;
  let originY = cam.position.y;
  let originZ = cam.position.z;
  let actualSpeed = speed * delta;
  if (keyboard["w"]) {
    controls.moveForward(actualSpeed);
  }
  if (keyboard["a"]) {
    controls.moveRight(-actualSpeed);
  }
  if (keyboard["s"]) {
    controls.moveForward(-actualSpeed);
  }
  if (keyboard["d"]) {
    controls.moveRight(actualSpeed);
  }
  if (keyboard["Control"]) {
    if (cam.position.y > 11) {
      cam.translateY(-actualSpeed);
    }
  }
  if (keyboard[" "]) {
    // if (cam.position.y < 120) {
    cam.translateY(actualSpeed);
    // }
  }
  // if (cam.position.y > 120) {
  //   cam.position.y = 120;
  // }

  // if arrow pressed
  if (keyboard["ArrowUp"]) {
    controls.moveForward(actualSpeed);
  }
  if (keyboard["ArrowLeft"]) {
    controls.moveRight(-actualSpeed);
  }
  if (keyboard["ArrowDown"]) {
    controls.moveForward(-actualSpeed);
  }
  if (keyboard["ArrowRight"]) {
    controls.moveRight(actualSpeed);
  }
  let collision = false;
  let d = Math.sqrt(
    cam.position.x * 1.0 * cam.position.x +
      cam.position.z * 1.0 * cam.position.z
  );

  if (d > 390) {
    collision = true;
  }
  for (let i = 0; i < boxes.length; i++) {
    if (collision) {
      break;
    }
    const element = boxes[i];
    if (element.containsPoint(cam.position)) {
      collision = true;
      break;
    }
  }
  if (collision) {
    cam.position.set(originX, originY, originZ);
  }
}

let timer = 0;
function drawScene() {
  renderer.render(scene, cam);
  // console.log(mobil.getWorldPosition());
  // directionalLight.position.set(cam,, 30, 0);
  let delta = clock.getDelta();
  sphere.rotateY(-0.01);
  sphere2.rotateY(-0.015);
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
