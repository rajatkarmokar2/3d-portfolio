import React,{ Suspense,useEffect,useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment,Html,OrbitControls,Preload,useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ( { isMobile } ) => {
  const computer = useGLTF( "/computer.glb" );

  return (
    <mesh>
      <ambientLight intensity={ 0.4 } />
      <hemisphereLight intensity={ 0.5 } skyColor="white" groundColor="black" />
      <spotLight
        position={ [ -20,50,10 ] }
        angle={ 0.4 } // Wider coverage
        penumbra={ 0.5 }
        intensity={ 1.5 } // Increased intensity
        castShadow
        shadow-mapSize-width={ 1024 }
        shadow-mapSize-height={ 1024 }
      />
      <pointLight position={ [ 10,10,10 ] } intensity={ 1.5 } />
      {/* Model */ }
      <primitive
        object={ computer.scene }
        scale={ isMobile ? 0.7 : 0.75 }
        position={ isMobile ? [ 0,-3,-2.2 ] : [ 0,-3.25,-1.5 ] }
        rotation={ [ -0.01,-0.2,-0.1 ] }
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const isMobile = useIsMobile();

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={ [ 1,1.5 ] } // Reduce max DPR for better mobile performance
      camera={ { position: [ 20,3,5 ],fov: 25 } }
      gl={ { antialias: true,preserveDrawingBuffer: true } }
    >
      <Suspense fallback={ <CanvasLoader /> }>
        <OrbitControls
          enableZoom={ false }
          maxPolarAngle={ Math.PI / 2 }
          minPolarAngle={ Math.PI / 2 }
        />
        <Computers isMobile={ isMobile } />
        <Environment preset="studio" />
        <Preload all />
      </Suspense>

    </Canvas>
  );
};

export default ComputersCanvas;


const useIsMobile = () => {
  const [ isMobile,setIsMobile ] = useState( false );

  useEffect( () => {
    const handleResize = () => setIsMobile( window.innerWidth <= 768 );
    window.addEventListener( "resize",handleResize );
    handleResize(); // Initial check
    return () => window.removeEventListener( "resize",handleResize );
  },[] );

  return isMobile;
};