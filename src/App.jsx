import React, { useEffect, useRef } from "react"
import Lenis from '@studio-freight/lenis'
import Hero from "./components/main/Hero"
import StarCanvas from "./components/main/StarBackground"
import NewSkills from "./components/main/NewSkills"
import Projects from "./components/main/Projects"
import Random from "./components/main/Random"

const App = () => {
  const lenisRef = useRef()

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5,
    })

    function raf(time) {
      lenisRef.current.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisRef.current.destroy()
    }
  }, [])

  return (
    <div className="relative bg-[#030014] h-full w-full text-zinc-200">
      <StarCanvas />
      <Hero />
      <Projects />
      {/* <Random /> */}
    </div>
  )
}

export default App