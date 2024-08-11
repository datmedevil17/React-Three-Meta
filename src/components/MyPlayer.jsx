import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const MyPlayer = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { scene, gl } = useThree();

  useEffect(() => {
    // Play default animation or any other setup
    if (actions) {
      actions.walking?.play(); // Replace with your animation name
    }

    // Enable shadows in the scene
    scene.traverse((object) => {
      if (object.isMesh) object.castShadow = true;
    });

    // Enable shadow map rendering
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows

  }, [actions, gl, scene]);

  return (
    <>
    

      {/* Scale the player model */}
      <primitive 
        object={model.scene} 
        position={[0,-2,8]}
        scale={[3, 3, 3]} 
        castShadow
        receiveShadow 
      />
    </>
  );
};

export default MyPlayer;
