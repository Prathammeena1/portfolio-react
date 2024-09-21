import { motion } from "framer-motion";
import React, { useState } from "react";
import { slideFromLeft, slideFromTop } from "../utils/motion";
import { SparklesIcon } from "@heroicons/react/16/solid";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import LaptopContainer from "./LaptopContainer";

const HeroContent = () => {
  const [light, setLight] = useState("");
  const [environmentLoaded, setEnvironmentLoaded] = useState(false);

  const handleAnimationComplete = () => {
    setLight("./model/studio_small_09_4k.exr");
    setEnvironmentLoaded(true);
  };

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
          className="flex flex-col mt-6 text-6xl font-bold text-white max-w-[600px]"
        >
          Providing
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-purple-500 to-cyan-500">
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
          onAnimationComplete={handleAnimationComplete}
        >
          Learn More
        </motion.a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
        <h1 className="text-white text-2xl font-meduim mont">Scroll down...</h1>
      </div>

      {/* <div className="h-full w-full absolute top-0 left-0 z-[3]">
        {environmentLoaded && (
          <Canvas camera={{ fov: 14, position: [0, -10, 220] }}>
            <Environment files={light} />
            <ScrollControls style={{ opacity: 0 }}>
              <LaptopContainer />
            </ScrollControls>
          </Canvas>
        )}
      </div> */}
    </motion.div>
  );
};

export default HeroContent;
