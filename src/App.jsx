import React, { useEffect, useRef } from "react"
import Lenis from '@studio-freight/lenis'
import Hero from "./components/main/Hero"
// import Page2 from "./components/main/Page2"
import StarCanvas from "./components/main/StarBackground"
// import Navbar from "./components/main/Navbar"
import Skills from "./components/main/Skills"

const App = () => {
  const lenisRef = useRef()

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
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
      {/* <Navbar/> */}
      <Hero />
      <Skills />
      {/* <Page2/> */}
    </div>
  )
}

export default App