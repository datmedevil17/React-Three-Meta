import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInput } from '../hooks/useInput';

const MyPlayer = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { scene, gl } = useThree();
  
  const { forward, backward, left, right, dance, shift } = useInput();
  const currentAction = useRef("");

  useEffect(() => {
    let action = "";

    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running"; // Switch to running if shift is pressed
      }
    } else if (dance) {
      action = "idle";
    }

    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2); // Fade out the current animation
      nextActionToPlay?.reset().fadeIn(0.2).play(); // Fade in and play the next animation
      currentAction.current = action; // Update the current action
    }

  }, [forward, backward, left, right, dance, shift, actions]);
  console.log(model)

  return (
    <>
      {/* Scale and position the player model */}
      <primitive 
        object={model.scene} 
        position={[0, -2, 8]}
        scale={[3, 3, 3]} 
        castShadow
        receiveShadow 
      />
    </>
  );
};

export default MyPlayer;
