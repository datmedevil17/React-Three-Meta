import { useRef } from "react";
import {Canvas,useFrame} from "@react-three/fiber"

const AnimatedBox=()=>{
    const meshRef = useRef(null)
  
    useFrame(()=>{
      if(meshRef.current){
        meshRef.current.rotation.x+=0.01;
  
  
      }
    })
  
    return(
      <mesh ref={meshRef} scale={[3,3,3]}>
        <boxGeometry/>
        <meshStandardMaterial/>
      </mesh>
    )  
  }

  export default AnimatedBox;