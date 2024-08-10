import { useRef, useState } from 'react'
import './App.css'
import {Canvas,useFrame,useThree} from "@react-three/fiber"
import AnimatedBox from './components/AnimatedBox'
import CameraOrbitController from './components/CameraOrbitController'

import { OrbitControls,Stats,useHelper } from '@react-three/drei'

function App() {

  return (
    <div classname="container">
    <Canvas>
      {/* <Stats/>
      <axesHelper/>
      <gridHelper/> */}
      <OrbitControls/>
      <ambientLight intensity={0.1}/>
      <directionalLight color="red" position={[0,0,5]}/>
      <AnimatedBox/>

    </Canvas>
     
      
    </div>
  )
}

export default App
