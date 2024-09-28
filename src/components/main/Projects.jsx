import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useProgress } from "@react-three/drei";
import LaptopContainer from "../sub/LaptopContainer";

const Projects = () => {
  const [light] = useState("./model/studio_small_09_4k.exr");
  const { progress, loaded } = useProgress();

  return (
    <div className="laptop-page h-[200vh] w-full z-[999]">
      <div className="sticky top-0 h-screen w-full">
        <div className="h-full w-full absolute top-0 left-0 overflow-hidden flex flex-col justify-between">
          <div className="p-20 flex justify-between text-[3vw]">
            <div className="heading">
              <h1 className="heading">Recent Works</h1>
            </div>
            <div className="heading overflow-hidden h-[3vw] leading-[3vw]">
              <div className="flex gap-2 heading">
                ( 0{" "}
                <div className="inline-block serialNumber">
                  <h1>1</h1> <h1>2</h1> <h1>3</h1> <h1>4</h1>
                </div>{" "}
                )
              </div>
            </div>
          </div>
          <div className="p-20 flex justify-between text-3xl">
            <div className="heading h-[3vw] leading-[3vw] overflow-hidden">
            <div className='inline-block serialNumber uppercase'><h1>idm vton ( reimagine) </h1> <h1>movie app ( tmdb api )</h1> <h1>Gallary App ( unsplash APi )</h1> <h1>Internshala ( Full Stack project ) </h1></div>
            </div>
            <div className="heading h-[3vw] leading-[3vw] overflow-hidden">
            <div className='inline-block serialNumber uppercase'><h1>2024</h1> <h1>2024</h1> <h1>2024</h1> <h1>2024</h1></div>
            </div>
          </div>
        </div>
        <div className="h-full w-full relative top-0 left-0 overflow-hidden">
          <Canvas
            className="relative z-[1000]"
            camera={{ fov: 11, position: [0, -10, 220] }}
          >
            <Suspense fallback={null}>
              <Environment files={light} />
              <LaptopContainer />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Projects;
