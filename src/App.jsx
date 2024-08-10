import './App.css';
import { Canvas } from "@react-three/fiber";
import Sphere from './components/Sphere';
import { OrbitControls, useHelper } from '@react-three/drei';
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

function DirectionalLightWithHelper() {
  const lightRef = useRef(null);

  useHelper(lightRef, DirectionalLightHelper, 5, "red");

  return (
    <directionalLight
      ref={lightRef}
      color="white"
      position={[0, 10, 10]}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-near={0.1}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
  );
}

function App() {
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
        <OrbitControls />
        <ambientLight intensity={0.3} />
        <DirectionalLightWithHelper />
        <Sphere />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial color={"#458745"} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
