# Assignment 4: Planetary Systems & Orbital Mechanics

This repository contains the deliverables for Assignment 4, demonstrating the implementation of both **Static Unity 3D Planetary Simulation** (Option 1) and **WebXR Earth-Moon Orbital System** (Option 2).

## Option 2: WebXR Earth-Moon Orbital System

### Page 1: Project Summary and WebXR Concepts

**Project Summary:**
The objective of this assignment was to construct a dynamic, web-based 3D animation of the Earth-Moon orbital system. Using HTML and the A-Frame framework, this simulation visually demonstrates simultaneous celestial motions: the Earth's continuous rotation on its axis, the Moon's independent rotation, and the Moon's revolution around the Earth. High-resolution spherical projections (texture maps) were utilized to wrap the generic `<a-sphere>` primitives, providing a realistic depiction of both bodies set against an immersive starfield background. 

**WebXR Concepts Used:**
- **Scene Setup (`<a-scene>`):** Creates the global 3D context where lighting, camera, and entities exist.
- **Primitives and Entities:** Used `<a-sphere>` for planetary bodies and `<a-sky>` for the 360-degree environmental background.
- **Asset Management (`<a-assets>`):** Preloading texture images (`earth.jpg`, `moon.jpg`, `stars.jpg`) to ensure smooth performance and caching before rendering the scene.
- **Lighting:** Implemented a combination of `<a-light type="ambient">` for base visibility and `<a-light type="directional">` to simulate the Sun's directional rays and create realistic shading.
- **Transformations & Nesting:** Employed spatial transformations (`position`, `rotation`) and parent-child entity nesting to combine independent and dependent relative motions.
- **Animations:** Utilized A-Frame's `animation` component to linearly animate the `rotation` property over specific durations, creating continuous, looped orbital mechanics.

---

### Page 2: Stepwise Technical Approach (Nested Animations)

To ensure the Moon rotates on its own axis while simultaneously revolving around the Earth, the following stepwise technical approach was implemented through entity nesting:

1. **Creating the Main System Wrapper:**
   - I started by creating a parent `<a-entity>` placed directly in front of the camera (`position="0 1.5 -6"`). This acts as the anchor point for the entire Earth-Moon system.

2. **Earth Modeling and Rotation:**
   - Inside the main wrapper, an `<a-sphere>` was defined for the Earth.
   - It was textured using the `src="#earthTexture"` and scaled with `radius="1.5"`.
   - To achieve independent rotation, an `animation` component was attached directly to this Earth sphere, animating its Y-axis from `0` to `360` degrees over `10000` milliseconds (`dur: 10000`).

3. **Establishing the Moon's Orbital Pivot (Revolution):**
   - Directly underneath the main wrapper (as a sibling to the Earth, not a child), an invisible `<a-entity>` was created to serve as the **Moon Orbit Pivot**.
   - Because it shares the exact origin `(0,0,0)` of the system wrapper (which is the center of the Earth), rotating this pivot will rotate anything attached to it around the Earth.
   - I applied an `animation` to this pivot entity to rotate `360` degrees over a duration of `27000` ms, representing the Moon's longer orbital period (revolution).

4. **Moon Modeling and Rotation (Nesting):**
   - The Moon (`<a-sphere>`) was nested directly **inside** the Moon Orbit Pivot.
   - It was given a localized `position="4 0 0"`, which pushes it outward from the pivot point. Because the parent pivot is rotating, this position offset translates into a circular orbit around the Earth.
   - Finally, to ensure the Moon also rotates on its own axis, a separate `animation` component was applied directly to the Moon `<a-sphere>` itself. This drives the local Y-axis rotation independently of the parent's revolution.

**Result:** The Moon is subject to the rotational transformation of its parent pivot (providing the revolution) while simultaneously maintaining its local rotation animation (providing axial rotation).

---

## Option 1 & Unity Implementation

Additionally, this repository includes two Unity projects exploring orbital mechanics:
- **Option 1 Folder:** Contains `StaticPlanetary.unity` showcasing a high-fidelity static arrangement of celestial bodies.
- **Option 2 Folder:** Contains `OrbitalSystem.unity` with customized C# scripts (`OrbitMotion.cs`, `RotatePlanet.cs`) demonstrating orbital paths and planetary rotation directly within the Unity engine.
