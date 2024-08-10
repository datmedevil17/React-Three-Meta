import { useRef, useState } from 'react'
import './App.css'
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


function App() {

  return (
    <div classname="container">
    <Canvas>
      <ambientLight intensity={0.1}/>
      <directionalLight color="red" position={[0,0,5]}/>
      <AnimatedBox/>

    </Canvas>
     
      
    </div>
  )
}

export default App
