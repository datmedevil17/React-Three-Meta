import { useAnimations, useGLTF } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useInput } from '../hooks/useInput';

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuaternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }) => {
    let directionOffset = 0;
  
    if (backward) { // Switch forward with backward
      if (left) {
        directionOffset = Math.PI * 0.25;
      } else if (right) {
        directionOffset = -Math.PI * 0.25;
      }
    } else if (forward) { // Switch backward with forward
      if (left) {
        directionOffset = Math.PI * 0.75;
      } else if (right) {
        directionOffset = -Math.PI * 0.75;
      } else {
        directionOffset = Math.PI;
      }
    } else if (right) { // Switch left with right
      directionOffset = Math.PI * 0.5;
    } else if (left) { // Switch right with left
      directionOffset = -Math.PI * 0.5;
    }
  
    return directionOffset;
  };
  

const MyPlayer = () => {
  const model = useGLTF("./models/player.glb");
  const { actions } = useAnimations(model.animations, model.scene);
  const { scene, gl } = useThree();

  const { forward, backward, left, right, dance, shift } = useInput();
  const currentAction = useRef("");
  const controlsRef = useRef();
  const camera = useThree((state) => state.camera);

  const updateCameraTarget = (moveX, moveZ) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;

    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };

  useEffect(() => {
    let action = "idle"; // Default to idle

    if (forward || backward || left || right) {
      action = "walking";
      if (shift) {
        action = "running"; // Switch to running if shift is pressed
      }
    } else if (dance) {
      action = "dance";
    }

    if (currentAction.current !== action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2); // Fade out the current animation
      nextActionToPlay?.reset().fadeIn(0.2).play(); // Fade in and play the next animation
      currentAction.current = action; // Update the current action
    }

  }, [forward, backward, left, right, dance, shift, actions]);

  useFrame((state, delta) => {
    if (currentAction.current === "walking" || currentAction.current === "running") {
      let angleCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right
      });

      rotateQuaternion.setFromAxisAngle(
        rotateAngle,
        angleCameraDirection + newDirectionOffset
      );
      model.scene.quaternion.rotateTowards(rotateQuaternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const velocity = currentAction.current === "running" ? 10 : 5;
      const moveX = walkDirection.x * velocity * delta;
      const moveZ = walkDirection.z * velocity * delta;

      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;

      updateCameraTarget(moveX, moveZ);
    }
  });

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <primitive
        object={model.scene}
        position={[0, -2, 8]}
        scale={[3, 3, 3]}
        castShadow
        receiveShadow
        rotation={[0, 0, 0]} // Set initial rotation to 0
      />
    </>
  );
};

export default MyPlayer;
