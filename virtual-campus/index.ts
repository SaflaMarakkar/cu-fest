import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ThreeJSOverlayView } from "@googlemaps/three";

let map: google.maps.Map;
let overlayView: ThreeJSOverlayView | null = null;

const LOCATIONS = [
  { name: "Tagore Nikethan", lat: 11.1340598, lng: 75.8951733 },
  { name: "EMS Seminar Hall", lat: 11.1338299, lng: 75.8930597 },
  { name: "Botanical Garden", lat: 11.1339034, lng: 75.8905995 },
  { name: "STUDENT TRAP", lat: 11.1358791, lng: 75.8894318 },
  { name: "Pareeksha Bhavan", lat: 11.1354189, lng: 75.8916137 },
];

const mapOptions = {
  tilt: 0,
  heading: 0,
  zoom: 19,
  mapId: "15431d2b469f209e",
  disableDefaultUI: true,
  gestureHandling: "none",
  keyboardShortcuts: false,
};

// 📛 Create yellow label sprite
function createLabelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  // Style
  ctx.fillStyle = "#FFD700"; // Yellow
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.font = "bold 42px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Rounded banner background
  const radius = 20;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(canvas.width - radius, 0);
  ctx.quadraticCurveTo(canvas.width, 0, canvas.width, radius);
  ctx.lineTo(canvas.width, canvas.height - radius);
  ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - radius, canvas.height);
  ctx.lineTo(radius, canvas.height);
  ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.fillStyle = "#000";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(80, 20, 1);

  return sprite;
}

function initMap(center: google.maps.LatLngLiteral): void {
  const mapDiv = document.getElementById("map") as HTMLElement;
  map = new google.maps.Map(mapDiv, {
    ...mapOptions,
    center,
  });

  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
  directionalLight.position.set(0, 10, 50);
  scene.add(directionalLight);

  const pinLoader = new GLTFLoader();
  const droneLoader = new GLTFLoader();
  const pinUrl = "https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf";
  const droneUrl = "assets/Drone.glb";

  Promise.all([
    new Promise<THREE.Group>((resolve) => pinLoader.load(pinUrl, (gltf) => resolve(gltf.scene))),
    new Promise<THREE.Group>((resolve) => droneLoader.load(droneUrl, (gltf) => resolve(gltf.scene))),
  ]).then(([pinModel, droneModel]) => {
    LOCATIONS.forEach((loc) => {
      const isCenter = loc.lat === center.lat && loc.lng === center.lng;
      const model = isCenter ? droneModel.clone(true) : pinModel.clone(true);
      model.scale.set(isCenter ? 50 : 5, isCenter ? 50 : 5, isCenter ? 50 : 5);
      if (isCenter) {
        model.scale.set(50, 50, 50); // Drone
        model.rotation.x = Math.PI / 2; // keep drone horizontal
      } else {
        model.scale.set(5, 5, 5); // Pin
        model.rotation.set(Math.PI, 0, 0); // 👈 make pin stand vertically
      }

      const latDiff = (loc.lat - center.lat) * 111000;
      const lngDiff = (loc.lng - center.lng) * 111000 * Math.cos((center.lat * Math.PI) / 180);

      model.position.set(lngDiff, latDiff, 0);
      scene.add(model);

      // Add yellow banner label
      const label = createLabelSprite(loc.name);
      label.position.set(model.position.x, model.position.y, model.position.z - 70);
      scene.add(label);
    });

    // 🎥 Animate only for center
    let { tilt, heading, zoom } = mapOptions;
    const animate = () => {
      if (tilt < 67.5) {
        tilt += 0.5;
      } else if (heading <= 360) {
        heading += 0.2;
        zoom -= 0.0005;
      } else {
        return;
      }
      map.moveCamera({ tilt, heading, zoom });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  });

  if (overlayView) overlayView.setMap(null);

  overlayView = new ThreeJSOverlayView({
    map,
    scene,
    anchor: { ...center, altitude: 100 },
    THREE,
  });
}

// 🎛️ Setup location selector
function setupLocationSelector() {
  const selector = document.getElementById("locationSelector") as HTMLSelectElement;
  selector.innerHTML = "";

  LOCATIONS.forEach((loc, index) => {
    const option = document.createElement("option");
    option.value = index.toString();
    option.textContent = loc.name;
    selector.appendChild(option);
  });

  selector.addEventListener("change", () => {
    const selected = LOCATIONS[parseInt(selector.value)];
    initMap({ lat: selected.lat, lng: selected.lng });
  });
}

declare global {
  interface Window {
    initMap: () => void;
  }
}

window.initMap = () => {
  setupLocationSelector();
  initMap({ lat: LOCATIONS[0].lat, lng: LOCATIONS[0].lng });
};

export { initMap };
