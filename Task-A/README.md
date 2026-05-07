# Task A: 3-Degrees of Rotation (VR Application)

## Overview

Task A is a VR-style web application built with **Three.js** and **WebXR polyfill**. The app presents a 3D cube that rotates automatically on all three axes and also supports manual control through sliders and keyboard shortcuts.

## Features

- **3D cube with six colored faces**
- **Wireframe edges** for rotation visibility
- **Automatic rotation on X, Y, Z** axes by default
- **Manual rotation sliders** for precise control
- **Keyboard shortcuts** for fast interaction
- **Floating particles and gradient background** for a space theme
- **VR mode support** via WebXR

## Controls

- ` / `: Rotate around the X-axis
- ` / `: Rotate around the Y-axis
- `W / S`: Rotate around the Z-axis
- `Space`: Toggle auto-rotation on/off
- `R`: Reset rotation to default

## How to Run

1. Open `Task-A/index.html` in a modern browser
2. Allow WebGL to initialize
3. Use the sliders or keyboard to control the cube
4. Click **Enter VR Mode** if your browser and device support WebXR

## Files

- `index.html` — main application page
- `style.css` — layout, responsive styling, and control panel design
- `script.js` — Three.js scene setup, object creation, animation, and input handling

## Notes

- Auto-rotation is enabled by default
- The UI updates live with rotation angles
- VR mode requires a compatible browser/device and may not work on all platforms

## Recommended Browsers

- Chrome
- Firefox
- Edge

## Development Details

The app uses a **PerspectiveCamera**, **ambient and directional lighting**, and a **mesh with six separate materials** to display a colorful cube. Interaction is provided through DOM sliders and keyboard events.


##  Debugging & Troubleshooting

### Enable Debug Mode
```javascript
// In browser console
window.THREE_DEBUG = true;
```

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Cube not rendering | Three.js not loaded | Check CDN in browser console |
| No rotation | Event listeners not attached | Check for JavaScript errors |
| Laggy performance | GPU not accelerated | Enable hardware acceleration |
| VR not working | WebXR not supported | Use compatible browser/device |

---

##  Learning Points

1. **Three.js Fundamentals**
   - Scene setup and configuration
   - Camera projection and positioning
   - Lighting and shading
   - Material and geometry

2. **3D Mathematics**
   - Rotation using Euler angles (X, Y, Z)
   - Quaternion concepts
   - Vector mathematics
   - Transformation matrices

3. **Web Technologies**
   - WebGL rendering
   - Canvas API
   - Event handling
   - DOM manipulation

4. **VR Development**
   - WebXR API
   - Head tracking
   - Immersive rendering

---

##  Resources

- [Three.js Official Docs](https://threejs.org/docs/)
- [MDN WebGL Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [WebXR Specification](https://immersive-web.github.io/)
- [Three.js Rotation Tutorial](https://threejs.org/docs/#api/en/math/Euler)

---

##  Submission Files

- `index.html` - Main HTML structure with CDN links
- `style.css` - Complete styling and responsive design
- `script.js` - Full Three.js implementation (350+ lines)
- This `README.md` - Documentation

---

##  Enhancements & Future Ideas

- Add texture mapping to cube faces
- Import custom 3D models (GLTF/GLB)
- Multi-object rotation scenarios
- Advanced VR controller support
- 360° camera view
- Performance profiler
- Animation recording/replay

---

**Version**: 1.0  
**Status**: Complete   
**Last Updated**: May 6, 2026

---

**Enjoy exploring 3D rotations in VR! **
