import './App.css';
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { DirectionalLightHelper } from 'three';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import MyPlayer from './components/myPlayer';

const Tree = ({ boundary, count }) => {
  const model = useLoader(GLTFLoader, "./models/tree.glb");
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const radius = 5; // Adjust the radius to avoid overlap
    const tempTrees = [];
    const occupiedPositions = new Set();

    while (tempTrees.length < count) {
      const x = Math.random() * (boundary[0] - 2 * radius) - (boundary[0] / 2 - radius);
      const z = Math.random() * (boundary[1] - 2 * radius) - (boundary[1] / 2 - radius);

      // Check for overlap
      const key = `${Math.round(x / radius)}-${Math.round(z / radius)}`;
      if (!occupiedPositions.has(key)) {
        occupiedPositions.add(key);
        const treeObject = new THREE.Object3D();
        treeObject.position.set(x, 0, z);
        tempTrees.push(treeObject);
      }
    }

    setTrees(tempTrees);
  }, [boundary, count]);

  return (
    <group>
      {trees.map((tree, index) => (
        <object3D key={index} position={tree.position} rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={model.scene.clone()} />
        </object3D>
      ))}
    </group>
  );
};

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
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial color={"#458745"} />
        </mesh>
        <Tree boundary={[200,200]} count={40} /> {/* Adjust count as needed */}
        <MyPlayer/>
      </Canvas>
    </div>
  );
}

export default App;
