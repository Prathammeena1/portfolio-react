import { useLoader, useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three';

const Curtain = () => {
    const shaderRef = useRef();
    const [texture] = useLoader(THREE.TextureLoader, ['./model/random.jpg']);
    const [imageSize, setImageSize] = useState({ width: 1, height: 1 });

    useEffect(() => {
        if (texture.image) {
            setImageSize({
                width: texture.image.width,
                height: texture.image.height
            });
        }
    }, [texture]);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2, 32, 32]} />
            <shaderMaterial
                ref={shaderRef}
                uniforms={{
                    uTexture: { value: texture },
                    uTime: { value: 0 },
                    uAspect: { value: imageSize.width / imageSize.height },
                }}
                vertexShader={`
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform sampler2D uTexture;
                    uniform float uAspect;
                    uniform float uTime;
                    varying vec2 vUv;
                    
                    void main() {
                        vec2 uv = vUv;
                        uv.x *= uAspect;
                        
                        float time = mod(uTime, 4.0);
                        float progress = smoothstep(0.0, 1.0, time / 2.0);
                        float reverseProgress = smoothstep(0.0, 1.0, (time - 2.0) / 2.0);
                        
                        float waveFreq = 10.0;
                        float waveAmp = 0.05;
                        
                        float wave = sin(uv.y * waveFreq + uTime * 5.0) * waveAmp;
                        
                        if (time < 2.0) {
                            uv.x += wave * progress;
                        } else {
                            uv.x += wave * (1.0 - reverseProgress);
                        }
                        
                        vec4 color = texture2D(uTexture, uv);
                        
                        float blackness = 1.0;
                        if (time < 2.0) {
                            blackness = 1.0 - progress;
                        } else {
                            // blackness = reverseProgress;
                        }
                        
                        gl_FragColor = mix(color, vec4(0.0, 0.0, 0.0, 1.0), blackness);
                    }
                `}
            />
        </mesh>
    );
};

export default Curtain