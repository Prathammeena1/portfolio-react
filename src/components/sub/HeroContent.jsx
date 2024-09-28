import { motion } from "framer-motion";
import React, { useState } from "react";
import { slideFromLeft, slideFromTop } from "../utils/motion";
import { SparklesIcon } from "@heroicons/react/16/solid";


const HeroContent = () => {
  

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="visible"
      className="flex items-center relative justify-between px-20 w-full h-screen z-[20]"
    >
      <div className="h-full flex flex-col gap-5 justify-center">
        <motion.div
          variants={slideFromTop}
          className="welcome-box py-[7px] px-[20px] w-fit border border-zinc-500 flex items-center gap-2 rounded-full"
        >
          <SparklesIcon className="text-white h-5 w-5" />
          <h1 className="welcome-text text-[13px]">
            Full Stack Web Developer Portfolio
          </h1>
        </motion.div>

        <motion.h2
          variants={slideFromLeft(0.5)}
          className="flex flex-col mt-6 text-6xl font-bold text-white max-w-[700px] heading"
        >
          Providing
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-purple-500 to-cyan-500 heading">
            the best
          </span>
          project experience
        </motion.h2>

        <motion.p
          variants={slideFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px] leading-relaxed"
        >
          Versatile full-stack web developer crafting dynamic, user-centric
          digital solutions.
        </motion.p>
        <motion.a
          variants={slideFromLeft(1)}
          className="py-2 px-6 button-primary text-center welcome-text border border-zinc-500 text-white cursor-pointer rounded-lg w-fit max-w-[200px]"
        >
          Learn More
        </motion.a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
        <h1 className="text-white text-2xl font-meduim mont">Scroll down...</h1>
      </div>

      
    </motion.div>
  );
};

export default HeroContent;
