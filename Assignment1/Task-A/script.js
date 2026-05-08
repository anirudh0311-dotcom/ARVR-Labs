/* ===========================
   Task-A: 3D Rotation Script
   Three.js + WebXR Implementation
   =========================== */

// ==========================================
// 1. SCENE SETUP & INITIALIZATION
// ==========================================

let scene, camera, renderer, cube;
let isAutoRotating = true; // Changed to true for automatic rotation by default
let vrSession = null;
let rotationValues = { x: 0, y: 0, z: 0 };

// Initialize Three.js scene
function initScene() {

    // Create scene
    scene = new THREE.Scene();

    // Simple background
    createVirtualSpaceBackground();

    // Setup camera
    const width = document.getElementById('canvas-container').clientWidth;
    const height = document.getElementById('canvas-container').clientHeight;

    camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    );

    camera.position.z = 2.5;

    // Setup renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;

    document.getElementById('canvas-container')
        .appendChild(renderer.domElement);

    // Create lighting
    createLighting();

    // Create cube
    createCube();

    // Particles
    createFloatingParticles();

    // Resize event
    window.addEventListener('resize', onWindowResize);

    // Event listeners
    setupEventListeners();

    // Auto rotate button
    initializeAutoRotateButton();

    // Start animation
    animate();
}


// ==========================================
// 2. LIGHTING SETUP
// ==========================================

function createLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Directional light (simulating sunlight)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point light (for dynamic effect)
    const pointLight = new THREE.PointLight(0x667eea, 0.5);
    pointLight.position.set(-5, 3, 2);
    scene.add(pointLight);
}

// ==========================================
// 3. CREATE 3D OBJECT (CUBE)
// ==========================================

function createCube() {
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    // Create material with gradient-like effect using multiple colors
    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x667eea, metalness: 0.5, roughness: 0.7 }), // Right (red)
        new THREE.MeshStandardMaterial({ color: 0x764ba2, metalness: 0.5, roughness: 0.7 }), // Left (blue)
        new THREE.MeshStandardMaterial({ color: 0x51cf66, metalness: 0.5, roughness: 0.7 }), // Top (green)
        new THREE.MeshStandardMaterial({ color: 0xff9999, metalness: 0.5, roughness: 0.7 }), // Bottom (orange)
        new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.5, roughness: 0.7 }), // Front (yellow)
        new THREE.MeshStandardMaterial({ color: 0xff69b4, metalness: 0.5, roughness: 0.7 })  // Back (pink)
    ];

    cube = new THREE.Mesh(geometry, materials);
    cube.castShadow = true;
    cube.receiveShadow = true;

    // Add edges to make rotation more visible
    const edges = new THREE.EdgesGeometry(geometry);
    const wireframe = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
    cube.add(wireframe);

    scene.add(cube);
}

// ==========================================
// 4. SIMPLE BACKGROUND
// ==========================================

function createVirtualSpaceBackground() {

    // Simple grey background
    scene.background = new THREE.Color(0xbdbdbd);

}

// ==========================================
// 5. CREATE FLOATING PARTICLES
// ==========================================

function createFloatingParticles() {
    const particleCount = 60;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Create random particle positions and colors
    for (let i = 0; i < particleCount; i++) {
        // Random positions within a large sphere
        const radius = Math.random() * 20 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Random colors (blues and purples for space theme)
        colors[i * 3] = Math.random() * 0.5 + 0.5;     // R
        colors[i * 3 + 1] = Math.random() * 0.5 + 0.2; // G
        colors[i * 3 + 2] = Math.random() * 0.8 + 0.2; // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Store particles reference for animation
    scene.userData.particles = particles;
}

function setupEventListeners() {
    // Slider controls
    document.getElementById('rotate-x').addEventListener('input', (e) => {
        rotationValues.x = parseFloat(e.target.value) * (Math.PI / 180);
        document.getElementById('x-value').textContent = e.target.value + '°';
        document.getElementById('rotation-x').textContent = e.target.value + '°';
    });

    document.getElementById('rotate-y').addEventListener('input', (e) => {
        rotationValues.y = parseFloat(e.target.value) * (Math.PI / 180);
        document.getElementById('y-value').textContent = e.target.value + '°';
        document.getElementById('rotation-y').textContent = e.target.value + '°';
    });

    document.getElementById('rotate-z').addEventListener('input', (e) => {
        rotationValues.z = parseFloat(e.target.value) * (Math.PI / 180);
        document.getElementById('z-value').textContent = e.target.value + '°';
        document.getElementById('rotation-z').textContent = e.target.value + '°';
    });

    // Button controls
    document.getElementById('auto-rotate-btn').addEventListener('click', toggleAutoRotate);
    document.getElementById('reset-btn').addEventListener('click', resetRotation);
    document.getElementById('enter-vr-btn').addEventListener('click', enterVRMode);

    // Keyboard controls
    document.addEventListener('keydown', handleKeyboard);
}

// Toggle auto-rotation animation
function toggleAutoRotate() {
    isAutoRotating = !isAutoRotating;
    const btn = document.getElementById('auto-rotate-btn');
    btn.textContent = isAutoRotating ? 'Auto Rotate (ON)' : 'Auto Rotate (OFF)';
    btn.style.opacity = isAutoRotating ? '1' : '0.7';
}

// Initialize auto-rotation button state
function initializeAutoRotateButton() {
    const btn = document.getElementById('auto-rotate-btn');
    btn.textContent = isAutoRotating ? 'Auto Rotate (ON)' : 'Auto Rotate (OFF)';
    btn.style.opacity = isAutoRotating ? '1' : '0.7';
}

// Reset all rotations
function resetRotation() {
    rotationValues = { x: 0, y: 0, z: 0 };
    document.getElementById('rotate-x').value = 0;
    document.getElementById('rotate-y').value = 0;
    document.getElementById('rotate-z').value = 0;
    document.getElementById('x-value').textContent = '0°';
    document.getElementById('y-value').textContent = '0°';
    document.getElementById('z-value').textContent = '0°';
    document.getElementById('rotation-x').textContent = '0°';
    document.getElementById('rotation-y').textContent = '0°';
    document.getElementById('rotation-z').textContent = '0°';
}

// Keyboard controls
function handleKeyboard(event) {
    const step = 5 * (Math.PI / 180); // 5 degree increment

    switch(event.key) {
        case 'ArrowUp':
            rotationValues.x = clampRadians(rotationValues.x - step);
            updateSlider('rotate-x', rotationValues.x * (180 / Math.PI));
            break;
        case 'ArrowDown':
            rotationValues.x = clampRadians(rotationValues.x + step);
            updateSlider('rotate-x', rotationValues.x * (180 / Math.PI));
            break;
        case 'ArrowLeft':
            rotationValues.y = clampRadians(rotationValues.y - step);
            updateSlider('rotate-y', rotationValues.y * (180 / Math.PI));
            break;
        case 'ArrowRight':
            rotationValues.y = clampRadians(rotationValues.y + step);
            updateSlider('rotate-y', rotationValues.y * (180 / Math.PI));
            break;
        case 'w':
        case 'W':
            rotationValues.z = clampRadians(rotationValues.z + step);
            updateSlider('rotate-z', rotationValues.z * (180 / Math.PI));
            break;
        case 's':
        case 'S':
            rotationValues.z = clampRadians(rotationValues.z - step);
            updateSlider('rotate-z', rotationValues.z * (180 / Math.PI));
            break;
        case ' ':
            event.preventDefault();
            toggleAutoRotate();
            break;
        case 'r':
        case 'R':
            resetRotation();
            break;
    }
}

// Helper function to update slider and trigger input event
function updateSlider(sliderId, value) {
    const slider = document.getElementById(sliderId);
    slider.value = Math.min(360, Math.max(0, value));
    const event = new Event('input', { bubbles: true });
    slider.dispatchEvent(event);
}

function clampRadians(value) {
    const twoPi = Math.PI * 2;
    return ((value % twoPi) + twoPi) % twoPi;
}

// ==========================================
// 5. VR MODE
// ==========================================

async function enterVRMode() {
    try {
        // Check if WebXR is available
        if (!navigator.xr) {
            alert('WebXR is not supported in your browser. Please use a VR-compatible browser.');
            return;
        }

        // Check if VR is supported
        const sessionSupported = await navigator.xr.isSessionSupported('immersive-vr');
        if (!sessionSupported) {
            alert('VR is not supported on this device.');
            return;
        }

        // Request VR session
        vrSession = await navigator.xr.requestSession('immersive-vr', {
            requiredFeatures: ['local-floor'],
            optionalFeatures: ['dom-overlay', 'dom-overlay-for-handheld-ar'],
            domOverlay: { root: document.body }
        });

        document.getElementById('vr-status').textContent = 'Active';
        console.log('VR Session started');

        // Session ended
        vrSession.addEventListener('end', () => {
            document.getElementById('vr-status').textContent = 'Not Active';
            console.log('VR Session ended');
        });

    } catch (error) {
        console.error('VR Mode Error:', error);
        alert('Unable to enter VR mode. ' + error.message);
    }
}

// ==========================================
// 6. ANIMATION LOOP
// ==========================================

function animate() {
    requestAnimationFrame(animate);

    if (cube) {
        // Auto-rotation if enabled (continuous rotation)
        if (isAutoRotating) {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.015;
            cube.rotation.z += 0.005;
        } else {
            // Manual rotation only when auto-rotation is disabled
            cube.rotation.x = rotationValues.x;
            cube.rotation.y = rotationValues.y;
            cube.rotation.z = rotationValues.z;
        }

        // Update UI with current rotation values
        const xDeg = (cube.rotation.x * 180 / Math.PI) % 360;
        const yDeg = (cube.rotation.y * 180 / Math.PI) % 360;
        const zDeg = (cube.rotation.z * 180 / Math.PI) % 360;

        document.getElementById('rotation-x').textContent = Math.round(xDeg) + '°';
        document.getElementById('rotation-y').textContent = Math.round(yDeg) + '°';
        document.getElementById('rotation-z').textContent = Math.round(zDeg) + '°';
    }

    // Animate floating particles for virtual space effect
    if (scene.userData.particles) {
        scene.userData.particles.rotation.x += 0.001;
        scene.userData.particles.rotation.y += 0.002;
    }

    renderer.render(scene, camera);
}

// ==========================================
// 7. WINDOW RESIZE HANDLER
// ==========================================

function onWindowResize() {
    const width = document.getElementById('canvas-container').clientWidth;
    const height = document.getElementById('canvas-container').clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// ==========================================
// 8. INITIALIZATION
// ==========================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initScene);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (vrSession) {
        vrSession.end();
    }
});
