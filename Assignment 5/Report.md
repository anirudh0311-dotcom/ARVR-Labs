# Assignment 5: Marker-Based AR with Vuforia - Project Report

## Page 1: Project Overview

### Summary
This project demonstrates a functional Augmented Reality (AR) solution built using Unity and the Vuforia Engine. The core functionality centers on "Marker-Based AR," where a physical or digital image (the custom marker) is recognized by the application's camera, triggering the augmentation of a 3D globe. When the camera detects the distinct features of the custom marker, the Vuforia Engine continuously tracks its position and orientation in real-time, allowing the 3D globe to appear perfectly anchored to the real-world image regardless of the camera's viewing angle.

### Technical Approach
To achieve stable and robust augmentation, specific tools and methodologies were employed:
- **Vuforia Engine:** Chosen for its industry-leading computer vision and image recognition capabilities. Vuforia excels at detecting "feature points" (areas of high contrast, sharp corners, and complex patterns) on an image target and establishing a robust tracking coordinate system.
- **Unity 3D:** Used as the primary development environment due to its seamless integration with Vuforia and its powerful real-time 3D rendering engine, which allows for easy manipulation of 3D assets, lighting, and materials.
- **Coordinate System Alignment:** In the Vuforia tracking paradigm, the detected physical image target becomes the origin (0, 0, 0) of a localized coordinate system. By making the 3D globe a *child* of the Vuforia "Image Target" GameObject within Unity's scene hierarchy, the globe inherits the transform (position, rotation, and scale) of the parent target. As Vuforia updates the Image Target's transform in the virtual space to match the physical marker's movement, the child globe moves in perfect synchronization, creating the illusion of a physical object.

---

## Page 2: Step-by-Step Implementation

### Vuforia Setup
1. **Developer Account & License Key:** Registered/Logged into the Vuforia Developer Portal. Navigated to the License Manager to create a new Basic License key to authenticate the AR application within Unity.
2. **Marker Creation:** Designed a unique image marker ensuring it possessed high feature contrast, non-repetitive patterns, and sharp edges to guarantee a high "star rating" for optimal tracking stability.
3. **Target Manager Configuration:** 
   - Created a new Vuforia Database in the Target Manager.
   - Uploaded the custom marker image (JPG/PNG), specifying its physical width to establish a real-world scale.
   - Evaluated the marker's feature points and star rating to verify tracking reliability.
4. **Database Export:** Downloaded the generated Vuforia Database as a `.unitypackage` to be imported into the Unity project.

### Unity Integration
1. **Vuforia Engine Package:** Imported the Vuforia Engine package into the Unity project via the Package Manager or by adding the custom package.
2. **AR Camera Configuration:** 
   - Replaced the default Unity Main Camera with a Vuforia `ARCamera`.
   - In the Vuforia Configuration settings, pasted the generated License Key to activate the engine.
3. **Database Import:** Imported the downloaded Vuforia Database `.unitypackage`.
4. **Image Target Setup:** Added a Vuforia `ImageTarget` GameObject to the scene. Configured its behavior to reference the imported database and the specific custom marker.
5. **3D Asset Placement:** 
   - Imported or created the 3D Globe model (along with its textures/materials).
   - Placed the 3D Globe into the scene and assigned it as a **child** of the `ImageTarget` GameObject in the hierarchy.
   - Adjusted the globe's scale, rotation, and position relative to the Image Target to ensure it sits correctly on the marker.
6. **Testing & Validation:** Ran the application in Play mode using a webcam, presented the custom marker to the camera, and verified that the 3D globe was successfully augmented and stably tracked.
