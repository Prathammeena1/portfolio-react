import React from 'react'
import HeroContent from '../sub/HeroContent'
import StarCanvas from './StarBackground'


const Hero = () => {
  return (
    <div className='h-screen w-full relative top-0 left-0 z-[1]'>
      <div className='h-screen w-full absolute top-0 left-0 z-[1] opacity-[.6]'>
        <video 
      autoPlay
      loop
      muted
      className='rotate-180 absolute top-[-40vh]  left-0 w-full h-full object-cover '
      >
        <source src='/blackhole.webm' />
      </video>

      </div>

      <HeroContent/>
    </div>
  )
}

export default Hero