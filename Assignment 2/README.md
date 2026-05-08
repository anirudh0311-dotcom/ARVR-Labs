# Assignment 2: Geostationary Visualization

## Task: The Tilting Earth

This project implements a realistic, rotating model of the Earth using A-Frame and WebXR concepts.

### Documentation

**1. How the Tilt was Calculated and Applied:**
The Earth's axial tilt (obliquity) is approximately 23.5 degrees. In A-Frame, the default up direction is along the Y-axis. To visually represent this tilt relative to the orbital plane (which would be the XZ plane), we need to rotate the Earth around the Z-axis by 23.5 degrees. 
To achieve this without complicating the continuous rotation of the Earth itself, a parent-child entity structure was used:
- A parent `<a-entity>` acts as a wrapper and is given a static rotation of `rotation="0 0 23.5"`. This tilts the entire local coordinate system by 23.5 degrees.
- Inside this parent, a child `<a-entity>` contains the `<a-sphere>` (Globe) and the `<a-cylinder>` (Axis).
- An animation is applied to the child entity to rotate it continuously around its local Y-axis (`to="0 360 0"`). Because the parent is tilted, this local Y-axis rotation accurately simulates the Earth's rotation on its tilted axis.

**2. How the Texture Wrap was Applied:**
To make the sphere look like the Earth, an equirectangular texture map of the Earth was used. 
- The image was first downloaded and saved locally as `earth_texture.jpg`.
- It was loaded into the `<a-assets>` management system with an ID (`id="earth-texture"`). This ensures the image is preloaded before the scene renders, preventing "pop-in" effects and improving performance.
- An `<a-sphere>` primitive was created to represent the globe, with high segment counts for a smooth spherical geometry.
- The texture was applied to the sphere by referencing the asset ID in the `src` attribute of the `<a-sphere>` (`src="#earth-texture"`). A-Frame automatically wraps the 2:1 ratio equirectangular image seamlessly around the sphere's geometry using UV mapping.
