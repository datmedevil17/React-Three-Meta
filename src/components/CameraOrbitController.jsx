import { OrbitControls } from "three/examples/jsm/Addons.js";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const CameraOrbitController = () => {
    const { camera, gl } = useThree();
    useEffect(()=>{
        const controls = new OrbitControls(camera, gl.domElement);
        return()=>{
            controls.dispose();

        }
    },[camera,gl]
)
  return null
}

export default CameraOrbitController
