import React, { useEffect, useRef, useState, useMemo } from "react";
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

  const gridContent = useMemo(() => {
    const grid = Array(10).fill().map(() => Array(8).fill(0));
    const images = [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    ];
    
    const placeImage = (row, col) => {
      if (grid[row][col] === 0 && 
          grid[row].filter(cell => cell === 1).length < 1 &&
          grid.map(r => r[col]).filter(cell => cell === 1).length < 1) {
        grid[row][col] = 1;
        return true;
      }
      return false;
    };

    let totalImages = 0;
    while (totalImages < 10) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 8);
      if (placeImage(row, col)) {
        totalImages++;
      }
    }

    return grid.flatMap((row, rowIndex) => 
      row.map((cell, colIndex) => {
        const randomImage = Math.floor(Math.random() * 5);
        return (
          <div key={`${rowIndex}-${colIndex}`} className="relative grid-item" style={{gridRow: rowIndex + 1, gridColumn: colIndex + 1}}>
            {cell === 1 && (
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={images[randomImage]} 
                  alt={`Skill ${randomImage}`}
                  className="h-[150px] object-cover"
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
            )}
          </div>
        );
      })
    );
  }, []);

  return (
    <div ref={containerRef} className="skills-page relative h-[500vh] bg-[#030014] w-full">
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
      
        {/* <motion.div 
          className="absolute h-full w-full"
          style={{
            top: useTransform(scrollYProgress, [0, 1], ['100%', '-275%'])
          }}
        >
          <div className="h-screen w-full ">
            <div className="grid grid-cols-8 grid-rows-10 h-full w-full gap-8">
              {gridContent}
          
            </div>
          </div>
          <div className="h-screen w-full bg-yellow-500"></div>
          <div className="h-screen w-full bg-green-500"></div>
        </motion.div> */}
      </div>
    </div>

      );
};

export default Skills;
