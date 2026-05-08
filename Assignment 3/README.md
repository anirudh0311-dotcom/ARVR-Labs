# Assignment 3: Interactive Dynamic Pallets

## Overview
This project is an immersive WebXR experience built using **A-Frame**. It features 5 interactive 3D pallets (cards) arranged in a semi-circle. When hovered, the pallets slightly enlarge to indicate interactivity. When clicked, they dynamically flip along either their X or Y axis to reveal a quote's author on the reverse side.

## Design Aesthetics
The visual style employs a sleek "glassmorphism" aesthetic with neon glowing borders, set inside a dark "starry" environment. This design draws attention directly to the text while maintaining a premium VR feel. 

- **Environment**: A starry space-like atmosphere that provides a stark contrast against the UI elements.
- **Pallets**: Slightly transparent, metallic slates with bright cyan and pink glowing borders for the front and back faces, respectively.
- **Typography**: Uses modern VR-ready sans-serif fonts to ensure legibility.

## Flip Animation Logic
The core flip animation is handled via a custom A-Frame component named `flip-on-interaction`. 

1. **State Management**: The component maintains an `isFlipped` boolean and an `isAnimating` boolean. `isAnimating` prevents multiple rapid clicks from glitching the animation sequence, creating an animation lock for 800ms while the flip occurs.
2. **Event Handling**: Click and hover events are detected on the front and back plane geometries. These events trigger custom events (`hover-start`, `hover-end`, `do-flip`) on the parent container (the "flipper" entity).
3. **Animation Execution**: 
   - When a flip is triggered, the target rotation is determined based on the current `isFlipped` state (toggling between `0` and `180` degrees).
   - The script dynamically builds the rotation vector depending on the assigned axis (X or Y). For an X-axis flip, the target rotation is `${target} 0 0`. For a Y-axis flip, it is `0 ${target} 0`.
   - We use A-Frame's built-in `animation` system with an `easeInOutBack` easing function for a smooth, natural flipping motion that subtly springs back into place.

## Text Orientation Handling (Legibility)
To ensure the text on the back of the flipped card is legible and not mirrored, the reverse side requires specific spatial orientation.

When a 2D plane is placed back-to-back with another plane and rotated 180 degrees by a parent container, the back plane naturally faces the user but appears mirrored if we do not pre-correct it. 

Here is how the orientation is handled for both axes:

- **Y-Axis Flip (Left/Right):**
  - The parent entity rotates `180` degrees on the Y-axis.
  - To prevent mirroring, the back plane is initialized with a local rotation of `0 180 0`.
  - When the parent rotates `180` degrees, the total rotation relative to the world becomes `180 + 180 = 360` (or `0`). This perfectly faces the text toward the user.

- **X-Axis Flip (Top/Bottom):**
  - The parent entity rotates `180` degrees on the X-axis.
  - To prevent mirroring and upside-down text, the back plane is initialized with a local rotation of `180 0 0`.
  - When the parent rotates `180` degrees, the combined transform results in the text being correctly oriented upright and forward-facing. 

This mathematical correction is applied dynamically during the initialization phase in the JavaScript code to ensure all cards, regardless of their flipping axis, are completely legible:
```javascript
// Correcting orientation to prevent mirrored/upside-down text on the back
if (axis === 'x') {
  backPlane.setAttribute('rotation', '180 0 0');
} else {
  backPlane.setAttribute('rotation', '0 180 0');
}
```

## How to Run
1. Serve the project folder using a local web server (e.g., VS Code Live Server extension, `npx serve`, or Python's `http.server`). Note: Due to browser security restrictions around WebXR and Cross-Origin requests, simply opening the HTML file directly might prevent the textures and components from loading properly.
2. Open the `index.html` file in a modern browser (Chrome, Firefox, or Safari).
3. Use `WASD` keys to move and the mouse to look around. Left-click (or hover + click) to interact with the pallets.

## Tools Used
- **A-Frame**: Core framework for declarative 3D/WebXR.
- **A-Frame Environment Component**: Used for lighting, sky, and atmosphere creation.
