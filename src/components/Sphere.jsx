import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useHelper, useTexture } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
const Sphere = () => {
  const meshRef = useRef(null);
  

  const map = useTexture("./textures/cracked_concrete_diff_4k.png")
  const displacementMap = useTexture("./textures/cracked_concrete_disp_4k.png")
  const normalMap = useTexture("./textures/cracked_concrete_nor_gl_4k.png")
  const roughnessMap = useTexture("./textures/cracked_concrete_rough_4k.png")

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <>
     
      <mesh scale={[1, 1, 1]} position={[0, 2, 0]} castShadow>
        <sphereGeometry />
        <meshStandardMaterial   map={map} normalMap={normalMap} displacementMap={displacementMap} roughnessMap={roughnessMap}/>
      </mesh>
     
    </>
  );
};

export default Sphere;
