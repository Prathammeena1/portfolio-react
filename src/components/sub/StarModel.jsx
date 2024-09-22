import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const StarModel = ({ imageUrl, size = 1 }) => {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(200, 200)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create a cube geometry
    const geometry = new THREE.BoxGeometry(size, size, size)

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imageUrl)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)
    camera.position.z = 3

    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      
      targetRotationY = mouseX * Math.PI
      targetRotationX = mouseY * Math.PI
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)
      
      cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05
      cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05
      
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [imageUrl, size])

  return <div ref={mountRef} />
}

export default StarModel