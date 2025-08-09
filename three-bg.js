// THREE.js Scene Setup (simple floating particle field)
const mount = document.getElementById('bg-canvas');
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3.2;

// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mount.appendChild(renderer.domElement);

// particles
const particlesCount = 800;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const speeds = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 10; // x
  positions[i3 + 1] = (Math.random() - 0.5) * 6; // y
  positions[i3 + 2] = (Math.random() - 0.5) * 10; // z
  speeds[i] = 0.0005 + Math.random() * 0.0015;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.03,
  transparent: true,
  opacity: 0.9
});

const points = new THREE.Points(geometry, material);
scene.add(points);

// subtle lights
const light = new THREE.DirectionalLight(0xffffff, 0.2);
light.position.set(5,5,5);
scene.add(light);

// animation loop
let t = 0;
function animateThree() {
  t += 0.01;
  const pos = geometry.attributes.position.array;
  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    pos[i3 + 1] += Math.sin(t + i) * geometry.attributes.aSpeed.array[i] * 0.7;
    // slowly wrap particles
    if (pos[i3 + 1] > 4) pos[i3 + 1] = -4;
    if (pos[i3 + 1] < -4) pos[i3 + 1] = 4;
  }
  geometry.attributes.position.needsUpdate = true;

  points.rotation.y += 0.0008;
  points.rotation.x += 0.0004;

  renderer.render(scene, camera);
  requestAnimationFrame(animateThree);
}
animateThree();

// handle resize
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
