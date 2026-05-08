/* ===========================
   Task-B: A-Frame AR Script
   Marker-Based AR Implementation
   =========================== */

// ==========================================
// 1. INITIALIZATION & STATE MANAGEMENT
// ==========================================

let markerDetected = false;
let infoPanelVisible = true;
let detectionStartTime = Date.now();
const DETECTION_TIMEOUT = 10000; // 10 seconds
let cameraInitialized = false;

// Initialize when A-Frame is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('A-Frame AR Application Initialized');
    showCameraLoading();

    // Wait for A-Frame to be ready
    if (typeof AFRAME !== 'undefined') {
        initializeAR();
    } else {
        document.addEventListener('aframe-loaded', initializeAR);
    }
});

function initializeAR() {
    console.log('Initializing AR system...');

    // Wait for A-Frame scene to be ready
    const scene = document.querySelector('a-scene');
    if (scene) {
        scene.addEventListener('loaded', function() {
            console.log('A-Frame scene loaded');
            setupEventListeners();
            setupMarkerTracking();
            initializeCamera();
        });
    } else {
        console.error('A-Frame scene not found');
        showCameraError();
    }
}

function initializeCamera() {
    console.log('Initializing camera...');

    // Check if we have camera permissions
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Try to access camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                console.log('Camera access granted');
                cameraInitialized = true;
                hideCameraLoading();
                setupCameraMonitoring();
                updateLoadingStep(2); // Move to AR system initialization
            })
            .catch(function(error) {
                console.error('Camera access denied:', error);
                showCameraError();
            });
    } else {
        console.error('getUserMedia not supported');
        showCameraError();
    }
}

// ==========================================
// 2. CAMERA MANAGEMENT
// ==========================================

function showCameraLoading() {
    document.getElementById('camera-loading').classList.remove('hidden');
    document.getElementById('camera-error').classList.add('hidden');
}

function hideCameraLoading() {
    document.getElementById('camera-loading').classList.add('hidden');
}

function showCameraError() {
    document.getElementById('camera-loading').classList.add('hidden');
    document.getElementById('camera-error').classList.remove('hidden');

    // Add retry button event listener
    const retryButton = document.getElementById('retry-camera');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            console.log('Retrying camera access...');
            document.getElementById('camera-error').classList.add('hidden');
            showCameraLoading();
            updateLoadingStep(0);
            initializeCamera();
        });
    }
}

function updateLoadingStep(stepIndex) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index <= stepIndex) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

function setupCameraMonitoring() {
    console.log('Setting up camera monitoring...');

    const scene = document.querySelector('a-scene');

    // Monitor A-Frame camera initialization
    scene.addEventListener('loaded', function() {
        console.log('A-Frame scene loaded');
        setTimeout(() => {
            checkCameraStatus();
        }, 2000);
    });

    // Monitor AR.js camera events
    if (scene && scene.arjs) {
        scene.arjs.addEventListener('initialized', function() {
            console.log('AR.js initialized successfully');
            updateLoadingStep(1); // AR system initialized
        });

        scene.arjs.addEventListener('error', function(error) {
            console.error('AR.js initialization error:', error);
            showCameraError();
        });
    }

    // Handle camera access
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            console.log('Camera access granted');
            cameraInitialized = true;
            hideCameraLoading();
            updateLoadingStep(2); // Ready for marker detection
            stream.getTracks().forEach(track => track.stop()); // Stop the test stream
        })
        .catch(function(error) {
            console.error('Camera access denied:', error);
            showCameraError();
        });

    // Retry camera access
    document.getElementById('retry-camera').addEventListener('click', function() {
        console.log('Retrying camera access...');
        document.getElementById('camera-error').classList.add('hidden');
        showCameraLoading();
        updateLoadingStep(0);
        initializeCamera();
    });
}

function checkCameraStatus() {
    // Check for video elements created by AR.js
    const videos = document.querySelectorAll('video');
    let cameraActive = false;

    videos.forEach(video => {
        if (video.readyState >= 2 && video.videoWidth > 0) {
            console.log('Camera video stream active:', video.videoWidth, 'x', video.videoHeight);
            cameraActive = true;
            // Ensure video is visible
            video.style.display = 'block';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
        }
    });

    // Also check for canvas elements (AR.js might use canvas)
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        if (canvas.width > 0 && canvas.height > 0) {
            console.log('AR canvas active:', canvas.width, 'x', canvas.height);
            cameraActive = true;
            // Ensure canvas is visible
            canvas.style.display = 'block';
        }
    });

    if (cameraActive) {
        cameraInitialized = true;
        hideCameraLoading();
        updateLoadingStep(2);
    } else {
        console.log('Camera not ready yet, checking again...');
        // Continue checking for camera
        setTimeout(checkCameraStatus, 1000);

        // After 5 seconds, try force display as fallback
        setTimeout(function() {
            if (!cameraInitialized) {
                console.log('Camera initialization taking too long, trying force display...');
                forceCameraDisplay();
            }
        }, 5000);
    }
}

// Force camera display (fallback)
function forceCameraDisplay() {
    console.log('Forcing camera display...');

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100vw';
        video.style.height = '100vh';
        video.style.zIndex = '1';
        video.style.objectFit = 'cover';
        video.style.display = 'block';
        console.log('Forced video display');
    });

    if (videos.length === 0 && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                const video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.style.position = 'fixed';
                video.style.top = '0';
                video.style.left = '0';
                video.style.width = '100vw';
                video.style.height = '100vh';
                video.style.zIndex = '1';
                video.style.objectFit = 'cover';
                document.body.appendChild(video);
                console.log('Created fallback video element');
                cameraInitialized = true;
                hideCameraLoading();
            })
            .catch(function(error) {
                console.error('Failed to create fallback camera:', error);
            });
    }
}

// ==========================================
// 3. MARKER TRACKING & DETECTION
// ==========================================

function setupMarkerTracking() {
    const marker = document.querySelector('a-marker');

    if (!marker) {
        console.error('Marker element not found!');
        return;
    }

    console.log('Setting up marker tracking for Hiro marker...');

    // Marker detected
    marker.addEventListener('markerFound', function() {
        console.log('Hiro marker detected!');
        onMarkerDetected();
    });

    // Marker lost
    marker.addEventListener('markerLost', function() {
        console.log('Hiro marker lost');
        onMarkerLost();
    });

    // Initial status check after timeout
    setTimeout(() => {
        if (!markerDetected && cameraInitialized) {
            updateStatus('error', 'No Hiro marker detected. Please show the Hero marker to camera.');
        }
    }, DETECTION_TIMEOUT);
}

// ==========================================
// 4. MARKER STATE HANDLERS
// ==========================================

function onMarkerDetected() {
    if (markerDetected) return; // Prevent duplicate events

    markerDetected = true;
    console.log(' Hiro marker detected! Activating 3D cube...');

    // Update UI
    updateFloatingStatus('detected', 'Hiro Marker Detected! 3D Cube Active');
    updateInfoPanelStatus('Hiro marker detected! 3D rotating cube is now visible.', false);

    // Ensure cube animation is active
    const cube = document.querySelector('#rotating-cube');
    if (cube) {
        // Remove any existing animation and add fresh one
        cube.removeAttribute('animation');
        setTimeout(() => {
            cube.setAttribute('animation', 'property: rotation; to: 360 360 360; dur: 4000; easing: linear; loop: true');
        }, 100);
        console.log('Cube rotation animation activated');
    } else {
        console.error('Rotating cube not found!');
    }
}

function onMarkerLost() {
    markerDetected = false;
    console.log(' Hiro marker lost - cube hidden');

    // Update UI
    updateFloatingStatus('waiting', 'Hiro Marker Lost - Show marker to camera');
    updateInfoPanelStatus('Hiro marker lost. Show the Hero marker to camera again.', true);

    // Stop cube animation when marker is lost
    const cube = document.querySelector('#rotating-cube');
    if (cube) {
        cube.removeAttribute('animation');
        console.log('Cube rotation animation stopped');
    }
}

// ==========================================
// 6. UI UPDATE FUNCTIONS
// ==========================================

function updateFloatingStatus(status, message) {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    // Remove previous status classes
    statusDot.classList.remove('waiting', 'detected', 'error');

    // Apply new status
    statusDot.classList.add(status);
    statusText.className = `${status}`;
    statusText.textContent = message;

    console.log(`Status: ${status} - ${message}`);
}

function updateInfoPanelStatus(message, isError = false) {
    const markerStatus = document.getElementById('marker-status');
    markerStatus.textContent = message;
    markerStatus.className = isError ? 'status-text error' : 'status-text';
}

function updateStatus(type, message) {
    const statusText = document.getElementById('status-text');
    const statusDot = document.getElementById('status-dot');

    statusDot.classList.remove('waiting', 'detected', 'error');
    statusDot.classList.add(type);
    statusText.className = type;
    statusText.textContent = message;

    updateInfoPanelStatus(message, type === 'error');
}

// ==========================================
// 5. EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Toggle info panel
    document.getElementById('info-toggle').addEventListener('click', toggleInfoPanel);

    // Mobile gesture support
    setupGestureControls();

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('Page hidden - AR paused');
        } else {
            console.log('Page visible - AR resumed');
        }
    });
}

function toggleInfoPanel() {
    const panel = document.querySelector('.info-panel');
    const btn = document.getElementById('info-toggle');

    infoPanelVisible = !infoPanelVisible;

    if (infoPanelVisible) {
        panel.classList.remove('hidden');
        btn.textContent = 'Hide Info';
    } else {
        panel.classList.add('hidden');
        btn.textContent = 'Show Info';
    }

    console.log(`Info panel ${infoPanelVisible ? 'shown' : 'hidden'}`);
}

// ==========================================
// 7. GESTURE CONTROLS (MOBILE)
// ==========================================

function setupGestureControls() {
    // Handle touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const diffX = touchStartX - touchEndX;

        // Swipe left to show panel
        if (diffX > 50 && !infoPanelVisible) {
            toggleInfoPanel();
        }
        // Swipe right to hide panel
        else if (diffX < -50 && infoPanelVisible) {
            toggleInfoPanel();
        }
    }
}

// ==========================================
// 8. KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'h':
        case 'H':
            toggleInfoPanel();
            break;
        case 'Escape':
            if (!infoPanelVisible) {
                toggleInfoPanel();
            }
            break;
    }
});

// ==========================================
// 9. PERFORMANCE MONITORING
// ==========================================

function monitorPerformance() {
    if (performance.memory) {
        const memoryUsage = (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit * 100).toFixed(2);
        console.log(`Memory Usage: ${memoryUsage}%`);
    }
}

// Monitor performance periodically
setInterval(monitorPerformance, 5000);

// ==========================================
// 10. ERROR HANDLING
// ==========================================

window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    updateStatus('error', 'Application Error. Check console for details.');
});

// Handle WebXR availability
function checkWebXRSupport() {
    if (!navigator.xr) {
        console.warn('WebXR not available in this browser');
        updateStatus('warning', 'WebXR not fully supported. Some features may be limited.');
        return false;
    }
    return true;
}

// Check on load
window.addEventListener('load', () => {
    checkWebXRSupport();
    console.log('AR Application loaded successfully');
    console.log('Waiting for marker detection...');
});

// ==========================================
// 10. DEBUGGING UTILITIES
// ==========================================

// Enable debug logs by setting window.AR_DEBUG = true
window.AR_DEBUG = false;

function debugLog(message) {
    if (window.AR_DEBUG) {
        console.log(`[AR Debug] ${message}`);
    }
}

// Expose debugging functions globally
window.getARStatus = function() {
    return {
        markerDetected: markerDetected,
        infoPanelVisible: infoPanelVisible,
        detectionTime: Date.now() - detectionStartTime
    };
};

window.toggleDebug = function() {
    window.AR_DEBUG = !window.AR_DEBUG;
    console.log(`Debug mode ${window.AR_DEBUG ? 'enabled' : 'disabled'}`);
};

// ==========================================
// 11. LIFECYCLE MANAGEMENT
// ==========================================

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    console.log('AR Application unloading. Cleanup completed.');
});

// Visibility change handler (pause on tab switch)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('AR Application paused (tab hidden)');
    } else {
        console.log('AR Application resumed (tab visible)');
    }
});

// ==========================================
// 12. DEBUGGING UTILITIES
// ==========================================

// Enable debug logs by setting window.AR_DEBUG = true
window.AR_DEBUG = false;

function debugLog(message) {
    if (window.AR_DEBUG) {
        console.log(`[AR Debug] ${message}`);
    }
}

// Expose debugging functions globally
window.getARStatus = function() {
    return {
        markerDetected: markerDetected,
        cameraInitialized: cameraInitialized,
        infoPanelVisible: infoPanelVisible,
        detectionTime: Date.now() - detectionStartTime
    };
};

window.toggleDebug = function() {
    window.AR_DEBUG = !window.AR_DEBUG;
    console.log(`Debug mode ${window.AR_DEBUG ? 'enabled' : 'disabled'}`);
};

window.forceMarkerDetection = function() {
    console.log('Forcing marker detection for testing...');
    onMarkerDetected();
};

window.resetAR = function() {
    console.log('Resetting AR system...');
    markerDetected = false;
    cameraInitialized = false;
    location.reload();
};

// Log initialization status
console.log('AR Application debugging utilities loaded:');
console.log('- getARStatus(): Get current AR status');
console.log('- toggleDebug(): Toggle debug logging');
console.log('- forceMarkerDetection(): Force marker detection (for testing)');
console.log('- resetAR(): Reset entire AR system');

console.log('A-Frame AR Script loaded successfully!');
