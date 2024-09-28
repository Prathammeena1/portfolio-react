import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import React, { Suspense } from 'react'
import Curtain from '../sub/Curtain'

const Random = () => {

    // useGSAP(()=>{
    //     gsap.to('.clippy',{
            // delay:1,
    //         duration:1,
    //         ease:'power2.inOut'
    //     })
    // })

  return (
    <div className='h-screen w-full bg-zinc-900 flex items-center justify-center'>
      <Canvas className='h-[500px] w-[350px]'>
        <Suspense fallback={null}>
          {/* <Curtain /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Random