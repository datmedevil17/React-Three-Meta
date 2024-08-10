import './App.css';
import { Canvas } from "@react-three/fiber";
import Sphere from './components/Sphere';
import { OrbitControls,useTexture } from '@react-three/drei';

function App() {

  
  return (
    <div className="container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <OrbitControls/>
        <ambientLight intensity={0.3} />
        <directionalLight color="white" position={[5, 5, 5]} />
        <Sphere />
      </Canvas>
    </div>
  );
}

export default App;
