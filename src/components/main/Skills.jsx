import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import StarModel from "../sub/StarModel";

const Skills = () => {
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
          transition: { 
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
          },
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, starsControls, textAnimationComplete]);

  return (
    <div ref={containerRef} className="skills-page relative h-[200vh] bg-[#030014] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div 
          style={{ scale: modelScale, opacity: modelBrightness }}
          className="skill-model absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-transparent z-[2]"
        >
          <div className="logoHidder"></div>
          <spline-viewer
            loading-anim-type="spinner-big-dark"
            url="https://prod.spline.design/whgtU8ckFrTFSzmh/scene.splinecode"
          ></spline-viewer>
        </motion.div>

        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="skill-model-text absolute top-0 left-0 right-0 flex items-center h-screen justify-center z-[3]"
        >
          <h2 className="heading text-zinc-300 text-6xl font-bold">
            Presenting Skills
          </h2>
        </motion.div>
        <motion.div 
          className="skill-logos absolute top-0 left-0 right-0 bottom-0 h-screen w-full z-[5] flex flex-wrap justify-center items-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
        >
          {[
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "/model/express.png",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
            "/model/three.png",
            "https://www.vectorlogo.zone/logos/framer/framer-icon.svg",
            "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-plain.svg"
          ].map((imageUrl, index) => (
            <motion.div 
              key={index}
            >
              <StarModel imageUrl={imageUrl} size={1} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
