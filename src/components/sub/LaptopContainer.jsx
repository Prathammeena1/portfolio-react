import { useGLTF, useTexture } from '@react-three/drei';
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LaptopContainer = () => {
  const model = useGLTF('./model/mac.glb');
  const screenRef = useRef();
  const groupRef = useRef();
  const [rotation, setRotation] = useState(THREE.MathUtils.degToRad(180)); // Start at 180 degrees
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const tex = useTexture('./model/red.jpg')

  model.scene.traverse((e) => {
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

  // Update rotation based on mouse movement
  useFrame(() => {
    if (groupRef.current) {
      // Map mouseX and mouseY to rotation values
      const rotationSpeedX = -.04;
      const rotationSpeedY = .5;
      groupRef.current.rotation.y = mouseX * rotationSpeedY;
      groupRef.current.rotation.x = mouseY * rotationSpeedX;
    }
  });

  return (
    <group ref={groupRef} position={[0, -10, 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default LaptopContainer;
