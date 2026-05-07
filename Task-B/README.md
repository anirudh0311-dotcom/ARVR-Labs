# Task B: Marker-Based AR Application (A-Frame)

## Overview

Task B is a marker-based AR application created with **A-Frame** and **AR.js**. It detects the **Hero Marker (Hiro pattern)** and displays a rotating 3D cube anchored to the marker in real time.

## Features

- **Hiro marker detection** with visual status updates
- **Rotating 3D cube** anchored to the marker
- **Camera permission UI** with loading and retry states
- **Info panel** with usage instructions and feature list
- **Floating detection status bar** for quick feedback
- **Touch gesture support** for mobile devices
- **Responsive interface** for desktop and mobile screens

## How to Use

1. Open `Task-B/index.html` in a modern browser
2. Grant camera permission when prompted
3. Show the Hero Marker to the camera
4. The cube will appear and rotate automatically
5. Use **Hide Info** to collapse the panel

## Controls

- `H` / `h` — Toggle the info panel
- `Esc` — Show the info panel if hidden
- Swipe left / right — Toggle the panel on mobile

## Marker Requirements

- Use a printed or displayed Hero Marker image
- Keep the marker well-lit and stable
- Make sure the marker fills the camera frame enough for detection

## Files

- `index.html` — AR scene markup and UI
- `style.css` — styling for overlays, panels, and responsive layout
- `script.js` — marker tracking, camera logic, and interaction handlers
- `README.md` — this documentation

## Notes

- The app is optimized for mobile devices with cameras
- If camera access is denied, an error overlay appears with retry support
- The rotating cube is identified by `id="rotating-cube"` and is animated when the marker is detected

## Recommended Browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox (with WebXR compatibility)

## Troubleshooting

- Marker not detected: improve lighting, keep the marker stable, and make sure it is clearly visible
- Camera access denied: refresh the page and allow camera permissions
- Cube not visible: ensure the marker is in the camera view and the page is not blocked by another app

## Implementation Notes

- The AR scene uses `a-scene` with `arjs` enabled for webcam marker detection
- A floating status bar updates between waiting, detected, and error states
- The UI was cleaned to remove duplicate overlay blocks and ensure a single camera loading/error experience

## Submission Checklist

-  Marker-based AR system using Hero Marker
-  3D rotating cube appears on marker detection
-  Camera access and loading UI included
-  Info panel support
-  Responsive mobile-friendly design
-  Documentation updated and aligned with current files

**Total Code**: 800+ lines of production-ready code

---

**Version**: 1.0  
**Status**: Complete   
**Last Updated**: May 6, 2026

---

**Ready to explore the future of AR! **
