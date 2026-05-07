# Assignment 1: AR/VR Web Applications

A comprehensive AR/VR project demonstrating 3D visualization and augmented reality technologies.

---

##  Project Overview

This assignment contains two complementary projects:

1. **Task A**: 3-Degrees of Rotation (VR Application using Three.js)
2. **Task B**: Marker-Based AR (Augmented Reality using A-Frame)

Both projects demonstrate interactive 3D visualization in web browsers with VR/AR capabilities.

---

##  Project Structure

```
Assignment 1/
├── Task-A/                 # VR Application (Three.js)
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling and layout
│   ├── script.js           # Three.js application logic
│   └── README.md           # Task A documentation
│
├── Task-B/                 # AR Application (A-Frame)
│   ├── index.html          # Main HTML file with A-Frame
│   ├── style.css           # AR interface styling
│   ├── script.js           # AR tracking and interaction logic
│   └── README.md           # Task B documentation
│
└── README.md               # This file
```

---

##  Quick Start

### Task A: 3D Rotation (VR)

1. Navigate to the `Task-A` folder
2. Open `index.html` in a modern web browser
3. **Watch the cube rotate automatically** on all three axes in the virtual space
4. Use the control panel to adjust rotation manually or toggle auto-rotation
5. Use keyboard shortcuts for quick rotation
6. Click "Enter VR Mode" for immersive experience

**Requirements:**
- Modern web browser (Chrome, Firefox, Edge)
- WebGL support
- For VR: VR-compatible device with WebXR support

### Task B: Marker-Based AR

1. Navigate to the `Task-B` folder
2. Open `index.html` in a web browser on a mobile device
3. Allow camera access when prompted
4. Show the **Hero Marker** (Hiro pattern) to your device camera
5. Watch the 3D rotating cube appear on the marker

**Requirements:**
- Mobile device with camera
- Modern web browser with WebXR support
- Hero Marker pattern (print or display digitally)

---

##  Task A: 3-Degrees of Rotation (VR)

### Objective
Create a VR-based web application using **Three.js** to demonstrate three degrees of rotation (X, Y, Z axes) with interactive controls.

### Features

 **3D Interactive Object**
- Colorful cube with gradient-colored faces
- Real-time rotation on X, Y, Z axes
- Smooth animations and transitions
- **Auto-rotation enabled by default** on all axes

 **User Controls**
- **Mouse Sliders**: Precise control over rotation angles
- **Keyboard Shortcuts**:
  - Arrow keys: Rotate X & Y axes
  - W/S: Rotate Z-axis
  - Space: Toggle auto-rotation
  - R: Reset all rotations

 **Animation Modes**
- Manual rotation via sliders
- Auto-rotation with continuous animation
- Reset functionality

 **VR Support**
- WebXR integration for immersive VR mode
- Head tracking and hand controllers support
- WebXR Polyfill for broader compatibility

 **UI/UX**
- Intuitive control panel with real-time feedback
- Responsive design (desktop and mobile)
- Status indicators and instructions
- Modern, gradient-based styling

### Technical Stack

- **Three.js**: 3D graphics library (v128)
- **WebXR**: VR/AR capabilities
- **WebXR Polyfill**: Fallback support
- **HTML5 Canvas**: Rendering target
- **CSS3**: Modern styling and animations

### How to Use

1. **Using Sliders**: Drag the sliders to rotate on each axis
2. **Using Keyboard**:
   - Move arrow keys to rotate X/Y axes
   - Press W to increase Z rotation, S to decrease
   - Press Space to toggle auto-rotation
   - Press R to reset all values
3. **VR Mode**: Click "Enter VR Mode" to use with VR headset
4. **Auto-Rotate**: Toggle the auto-rotation feature for continuous animation

### Rotation Axes Explained

- **X-Axis (Roll)**: Side-to-side rotation
- **Y-Axis (Pitch)**: Up-and-down rotation
- **Z-Axis (Yaw)**: Forward-and-backward rotation

---

##  Task B: Marker-Based AR (A-Frame)

### Objective
Create an AR web application using **A-Frame** with marker-based detection that mirrors Task A functionality.

### Features

 **Marker Detection**
- Real-time detection using **Hero Marker** (Hiro pattern)
- Visual status indicators
- Automatic detection on marker appearance
- **Camera always active** for continuous scanning

 **3D Object Anchoring**
- Rotating cube anchored to detected marker
- Multi-colored cube faces
- **Continuous auto-rotation on all axes** when marker is visible

 **Interactive Interface**
- Info panel with instructions and status
- Floating status indicator
- Screenshots capture capability

 **Mobile Optimization**
- Touch gesture support
- Responsive UI for various screen sizes
- Full-screen camera view

 **AR Experience**
- WebXR compatible
- Works on mobile AR devices
- Proper lighting and shadows
- Realistic 3D rendering

### Technical Stack

- **A-Frame**: 3D web framework (v1.4.0)
- **AR.js**: Web-based augmented reality library
- **Three.js**: 3D rendering (via A-Frame)
- **WebXR**: AR capabilities
- **Camera API**: Device camera access

### How to Use

1. **Prepare Marker**: Print or display the Hero Marker pattern
2. **Open Application**: Navigate to Task-B index.html on mobile device
3. **Allow Permissions**: Grant camera access when prompted
4. **Point Camera**: Show the Hero marker to your device camera
5. **View 3D Object**: Watch the rotating cube appear anchored to the marker
6. **Interact**:
   - Rotate and move the marker to see the object from different angles
   - Swipe left/right to toggle info panel
   - Click "Capture Screen" to save a screenshot

### Hero Marker Pattern

The Hero Marker (Hiro) is a recognizable checkerboard pattern. You can:
- Print it from online resources
- Display it on another screen
- Use AR.js online marker generators

---

##  Technical Implementation Details

### Task A: Three.js Architecture

```
initScene()
├── Camera Setup (Perspective Camera)
├── Renderer Setup (WebGL)
├── Lighting
│   ├── Ambient Light
│   ├── Directional Light
│   └── Point Light
├── 3D Cube Creation
│   ├── Geometry (BoxGeometry)
│   ├── Materials (6 colored faces)
│   └── Wireframe overlay
└── Event Listeners
    ├── Keyboard controls
    ├── Slider controls
    ├── Button controls
    └── Window resize handler
```

### Task B: A-Frame Architecture

```
A-Frame Scene
├── Camera (with position tracking)
├── Marker Detection (Hiro preset)
│   ├── onMarkerFound event
│   └── onMarkerLost event
├── 3D Entities
│   ├── Main rotating cube
│   ├── Sub-cubes (multi-colored)
│   ├── Text label
│   └── Lighting
└── Event Handlers
    ├── Marker events
    ├── Touch gestures
    └── Keyboard shortcuts
```

---

##  Browser Compatibility

### Desktop Browsers
-  Chrome 90+
-  Firefox 88+
-  Edge 90+
-  Safari 14+

### Mobile Browsers
-  Chrome for Android
-  Firefox for Android
-  Safari for iOS 14+
-  Samsung Internet

### VR/AR Support
-  Meta Quest Browser
-  WebXR-capable devices
-  Google ARCore devices
-  Apple ARKit devices (iOS 14+)

---

##  Learning Outcomes

After completing this assignment, you will understand:

1. **3D Graphics Programming**
   - Scene setup and rendering
   - Camera and projection concepts
   - Lighting and materials
   - Animation loops

2. **VR Development**
   - WebXR API fundamentals
   - Head tracking
   - Immersive modes

3. **AR Development**
   - Marker-based detection
   - Real-world object anchoring
   - Camera integration

4. **Web Technologies**
   - HTML5 Canvas
   - ES6+ JavaScript
   - CSS3 animations
   - API integration

5. **UI/UX Design**
   - Responsive layouts
   - User feedback systems
   - Accessibility considerations

---

##  Troubleshooting

### Task A Issues

**Problem**: Cube not rotating
- **Solution**: Check browser console for errors. Ensure Three.js CDN is accessible.

**Problem**: VR mode doesn't work
- **Solution**: Ensure browser supports WebXR. Try WebXR Polyfill. Check device VR capabilities.

**Problem**: Low performance/lag
- **Solution**: Check GPU acceleration. Reduce graphics quality. Close other tabs.

### Task B Issues

**Problem**: Camera not accessible
- **Solution**: Check browser permissions. Ensure HTTPS (some browsers require it). Restart browser.

**Problem**: Marker not detected
- **Solution**: Ensure good lighting. Use clear, printed marker. Keep marker in frame center.

**Problem**: Marker detected but 3D object doesn't appear
- **Solution**: Check browser console. Ensure AR.js CDN is accessible. Try different marker.

---

##  Resources & References

### Documentation
- [Three.js Documentation](https://threejs.org/docs/)
- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [WebXR Standard](https://immersive-web.github.io/)

### Tutorials
- [Three.js Fundamentals](https://threejs.org/manual/)
- [A-Frame School](https://aframe.io/school/)
- [AR.js Examples](https://github.com/AR-js-org/AR.js/tree/master/examples)

### Tools
- [Three.js Editor](https://threejs.org/editor/)
- [A-Frame Inspector](https://aframe.io/docs/master/introduction/visual-inspector-and-debugging.html)
- [AR.js Marker Generator](https://ar-js-org.github.io/studio/)

---

##  Submission Checklist

-  Both Task A and Task B are implemented
-  Code is well-documented with comments
-  UI is intuitive and user-friendly
-  Responsive design works on multiple devices
-  All features functioning correctly
-  Error handling implemented
-  Performance optimized
-  Documentation complete

---

##  Customization Guide

### Changing Colors (Task A)
Edit `script.js` in the `createCube()` function to modify material colors.

### Changing Animations (Task B)
Edit the animation attributes in `index.html` to adjust rotation speed and behavior.

### Adding New Geometries
Replace `BoxGeometry` in Task A with other Three.js geometries:
- `TorusGeometry` - Ring shape
- `SphereGeometry` - Ball shape
- `TetrahedronGeometry` - Pyramid shape

### Customizing UI
Modify `style.css` files to change colors, fonts, and layout.

---

##  Support & Feedback

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for error messages
3. Consult the official documentation links
4. Test in different browsers

---

##  License

This project is created for educational purposes as part of an AR/VR assignment.

---

##  Key Highlights

 **Complete Implementation**
- Both tasks fully implemented with all requirements
- Production-ready code quality
- Comprehensive documentation

 **User Experience**
- Intuitive, humanized interfaces
- Real-time visual feedback
- Responsive design for all devices

 **Performance**
- Optimized rendering
- Smooth animations (60 FPS target)
- Efficient resource management

 **Developer-Friendly**
- Well-commented code
- Easy to customize and extend
- Debug utilities included

---

**Created**: May 6, 2026  
**Version**: 1.0  
**Status**: Complete 

---

**Happy exploring the world of AR/VR! **
