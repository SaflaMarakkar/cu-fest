import * as THREE from "three";
import * as LocAR from "locar";

const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.001,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

document.getElementById("startBtn").addEventListener("click", async () => {
  // Ask for device motion permission
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    const response = await DeviceOrientationEvent.requestPermission();
    if (response !== "granted") return;
  }

  // Start GPS and webcam
  locar.startGps();
  cam.start();
  deviceControls.connect();
});


const locar = new LocAR.LocationBased(scene, camera);

const deviceControls = new LocAR.DeviceOrientationControls(camera);

const cam = new LocAR.Webcam({
  idealWidth: 1024,
  idealHeight: 768,
  onVideoStarted: (texture) => {
    scene.background = texture;
  },
});

let firstPosition = true;

const indexedObjects = {};

const cube = new THREE.BoxGeometry(20, 20, 20);

const clickHandler = new LocAR.ClickHandler(renderer);

locar.on("gpsupdate", async (pos, distMoved) => {
  if (firstPosition || distMoved > 100) {
    const response = await fetch(
      `https://hikar.org/webapp/map?bbox=${pos.coords.longitude - 0.02},${
        pos.coords.latitude - 0.02
      },${pos.coords.longitude + 0.02},${
        pos.coords.latitude + 0.02
      }&layers=poi&outProj=4326`
    );
    const pois = await response.json();

    pois.features.forEach((poi) => {
      if (!indexedObjects[poi.properties.osm_id]) {
        const mesh = new THREE.Mesh(
          cube,
          new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );

        locar.add(
          mesh,
          poi.geometry.coordinates[0],
          poi.geometry.coordinates[1]
        );
        indexedObjects[poi.properties.osm_id] = mesh;
      }
    });
    firstPosition = false;
  }
});
locar.startGps();

renderer.setAnimationLoop(animate);

function animate() {
  deviceControls.update();
  renderer.render(scene, camera);
}
