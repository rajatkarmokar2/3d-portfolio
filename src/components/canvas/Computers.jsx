import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* General ambient light for overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Hemisphere light for natural diffused light */}
      <hemisphereLight intensity={0.35} skyColor="white" groundColor="black" />

      {/* Spotlight for dramatic lighting */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.3} // Wider angle for more coverage
        penumbra={0.5} // Softer edges for realistic shadows
        intensity={1.2} // Slightly increased intensity
        castShadow
        shadow-mapSize-width={2048} // High-resolution shadows
        shadow-mapSize-height={2048}
      />

      {/* Point light for highlighting model details */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
        <Environment preset="city" />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
