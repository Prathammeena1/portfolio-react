import { ScrollControls, useGLTF, useScroll, useTexture } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const   LaptopContainer = () => {
  const model = useGLTF('./model/mac.glb');
  const screenRef = useRef();
  const groupRef = useRef();
  const [rotation, setRotation] = useState(THREE.MathUtils.degToRad(0)); // Start at 180 degrees
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const tex = useTexture('./model/red.jpg')

  let meshes = {};
  model.scene.traverse((e) => {
    meshes[e.name] = e;
    if (e.name === 'screen') {
      screenRef.current = e;
    }
  });
  
  // Update material properties
  useEffect(() => {
    if (model.scene) {
      const matte = model.scene.getObjectByName('matte');
      if (matte) {
        matte.material.map = tex;
        matte.material.emissiveIntensity = 0;
        matte.material.metalness = 0;
        matte.material.roughness = 1;
      }
    }
  }, [model, tex]);

  // Event listener for mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  
  


  meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
  let data = useScroll();


  // Update rotation based on mouse movement
  useFrame((state,delta) => {
    if (groupRef.current) {
      // Map mouseX and mouseY to rotation values
      const rotationSpeedX = -.04;
      const rotationSpeedY = .2;
      groupRef.current.rotation.y = mouseX * rotationSpeedY;
      groupRef.current.rotation.x = mouseY * rotationSpeedX;
    }
    if(screenRef.current){
      console.log(data.offset)
      meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
    }
  });


  



  return (
    <group ref={groupRef} position={[20, -10, 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default LaptopContainer;
