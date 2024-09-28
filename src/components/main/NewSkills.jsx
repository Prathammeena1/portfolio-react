import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const NewSkills = () => {
  const containerRef = useRef(null);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const modelScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  const modelBrightness = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 0.25], ["20%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const starsControls = useAnimation();

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.25 && !textAnimationComplete) {
        setTextAnimationComplete(true);
      }
      if (latest > 0.5 && textAnimationComplete) {
        starsControls.start({
          scale: [0, 1],
          opacity: [0, 1],
          transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
        });
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, starsControls, textAnimationComplete]);


  return (
    <div ref={containerRef} className="skills-page relative h-[300vh] bg-[#030014] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ scale: modelScale, opacity: modelBrightness }}
          className="skill-model absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-transparent z-[2]"
        >
          <div className="logoHidder"></div>
          {typeof window !== 'undefined' && (
            <spline-viewer
              loading-anim-type="spinner-big-dark"
              url="https://prod.spline.design/whgtU8ckFrTFSzmh/scene.splinecode"
            ></spline-viewer>
          )}
        </motion.div>

        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="skill-model-text absolute top-0 left-0 right-0 flex items-center h-screen justify-center z-[3]"
        >
          <h2 className="heading text-zinc-300 text-6xl font-bold">
            Presenting Skills
          </h2>
        </motion.div>
      
      
      </div>
    </div>
  );
};

export default NewSkills;
