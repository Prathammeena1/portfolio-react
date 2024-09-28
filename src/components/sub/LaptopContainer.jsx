import { useGLTF, useTexture } from "@react-three/drei";
import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const LaptopContainer = () => {
  const model = useGLTF("./model/mac.glb");
  const groupRef = useRef();
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const textures = useTexture([
    "./model/bg.png",
    "./model/red.jpg",
    // Aur textures ko array mein add kar sakte hain
  ]);
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);

  let meshes = {};
  model.scene.traverse((e) => {
    meshes[e.name] = e;
  });

  useEffect(() => {
    if (model.scene) {
      const matte = model.scene.getObjectByName("matte");
      if (matte) {
        const textureLoader = new THREE.TextureLoader();
        textures.forEach((texture, index) => {
          textureLoader.load(texture, (loadedTexture) => {
            if (index === 0) {
              matte.material.map = loadedTexture;
              matte.material.needsUpdate = true;
              matte.material.emissiveIntensity = 0;
              matte.material.metalness = 0;
              matte.material.roughness = 1;
            } else {
              // Yahan par aap additional textures ke liye logic add kar sakte hain
              // For example: matte.material.normalMap = loadedTexture;
            }
            if (index === textures.length - 1) {
              setIsTextureLoaded(true);
            }
          });
        });
      }
    }
  }, [model, textures]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const rotationSpeedX = -0.04;
      const rotationSpeedY = 0.2;
      groupRef.current.rotation.y = mouseX * rotationSpeedY;
      groupRef.current.rotation.x = mouseY * rotationSpeedX;
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        scroller: "body",
        trigger: ".laptop-page",
        start: "top 0%",
        end: "top -100%",
        // markers: true,
        scrub: 1,
        snap:[0,.07,.25,.47,1]
      },
    });
    tl.from(meshes.screen.rotation, {
      x: THREE.MathUtils.degToRad(180),
    });



    if (model.scene) {
      const matte = model.scene.getObjectByName("matte");
      if (matte) {
        const textureLoader = new THREE.TextureLoader();
        const textures = [
          textureLoader.load("./model/Vton.png"),
          textureLoader.load("./model/Movie.png"),
          textureLoader.load("./model/Gallary.png"),
          textureLoader.load("./model/Internshala.png"),
        ];

        matte.material.map = textures[0];
        matte.material.needsUpdate = true;
        matte.material.emissiveIntensity = 0;
        matte.material.metalness = 0;
        matte.material.roughness = 1;
        setIsTextureLoaded(true);

        tl.to(matte.material, {
          duration: 5, // Transition ko 5 second tak extend kiya
          onUpdate: function() {
            const progress = this.progress();
            const segmentSize = 1 / (textures.length - 1);
            const currentSegment = Math.floor(progress / segmentSize);
            const segmentProgress = (progress % segmentSize) / segmentSize;

            // Snap feature ke liye threshold
            const snapThreshold = 0.1; // 10% threshold

            if (currentSegment < textures.length - 1) {
              let mixRatio;
              if (segmentProgress < snapThreshold) {
                mixRatio = 0; // Pichle texture par snap
              } else if (segmentProgress > 1 - snapThreshold) {
                mixRatio = 1; // Agle texture par snap
              } else {
                mixRatio = gsap.parseEase("power2.inOut")((segmentProgress - snapThreshold) / (1 - 2 * snapThreshold));
              }

              const mixShader = new THREE.ShaderMaterial({
                uniforms: {
                  texture1: { value: textures[currentSegment] },
                  texture2: { value: textures[currentSegment + 1] },
                  mixRatio: { value: mixRatio },
                  waveFrequency: { value: 10.0 },
                  waveAmplitude: { value: 0.05 }
                },
                vertexShader: `
                  varying vec2 vUv;
                  void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                  }
                `,
                fragmentShader: `
                  uniform sampler2D texture1;
                  uniform sampler2D texture2;
                  uniform float mixRatio;
                  uniform float waveFrequency;
                  uniform float waveAmplitude;
                  varying vec2 vUv;
                  void main() {
                    vec2 waveUv = vUv;
                    if (mixRatio > 0.0 && mixRatio < 1.0) {
                      waveUv += vec2(sin(vUv.y * waveFrequency) * waveAmplitude * mixRatio, 0.0);
                    }
                    vec4 color1 = texture2D(texture1, waveUv);
                    vec4 color2 = texture2D(texture2, vUv);
                    gl_FragColor = mix(color1, color2, smoothstep(0.0, 1.0, mixRatio));
                  }
                `
              });
              matte.material = mixShader;
            } else {
              matte.material.map = textures[textures.length - 1];
            }
            matte.material.needsUpdate = true;
          },
          ease: "power2.inOut" // Overall transition ke liye smooth easing
        },'a');
        tl.to('.serialNumber',{
          transform:'translateY(-75%)',
          duration:6.5,
        },'a')
      }
    }

  }, []);

  if (!isTextureLoaded) {
    return null; // Texture load hone tak kuch nahi dikhayega
  }

  return (
    <group ref={groupRef} position={[0, -10, 0]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default LaptopContainer;
