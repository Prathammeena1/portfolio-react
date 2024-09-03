import React from 'react'
import HeroContent from '../sub/HeroContent'


const Hero = () => {
  return (
    <div className='h-screen w-full relative'>
      <video 
      autoPlay
      loop
      muted
      className='rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover '
      >

        <source src='/blackhole.webm' />
      </video>

      <HeroContent/>
    </div>
  )
}

export default Hero