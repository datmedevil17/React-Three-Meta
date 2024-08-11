import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/tree.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.imagetostl_mesh0.geometry}
        material={materials.mat0}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/tree.glb')