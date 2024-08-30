import { motion } from 'framer-motion'
import React from 'react'
import { slideFromLeft, slideFromTop } from '../utils/motion'
import { SparklesIcon } from '@heroicons/react/16/solid'

const HeroContent = () => {
  return (
    <motion.div
    initial="hidden"
    animate="visible"
    exit='visible'
    className="flex items-center justify-center px-20 mt-40 w-full z-[20]"
  >
    <div className="h-full w-full flex flex-col gap-5 justify-center">
      <motion.div
        variants={slideFromTop}
        className="welcome-box py-[7px] px-[20px] w-fit border border-zinc-500 flex gap-2 rounded-full"
      >
        {/* Assuming SparklesIcon is already imported */}
        <SparklesIcon className="text-white mr-[10px] h-5 w-5" />
        <h1 className="welcome-text text-[13px]">Full stack web developer Portfolio</h1>
      </motion.div>

      <motion.div
      variants={slideFromLeft(.5)}
      className='flex flex-col mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto'
      >
        Providing
        <span className='text-transparent bg-clip-text bg-gradient-to-t from-purple-500 to-cyan-500 '>the best</span>
        project experience
      </motion.div>

      <motion.div
      variants={slideFromLeft(.8)}
      className=' text-lg text-gray-400 my-5 max-w-[600px] w-auto h-auto leading-none'
      >

"Versatile full-stack web developer crafting dynamic, user-centric digital solutions."

      </motion.div>
      <motion.a
      variants={slideFromLeft(1)}
      className='py-2 px-6 button-primary text-center welcome-text border border-zinc-500 text-white cursor-pointer rounded-lg w-fit max-w-[200px]'
      >

      lean more

      </motion.a>

    </div>
  </motion.div>

  )
}

export default HeroContent