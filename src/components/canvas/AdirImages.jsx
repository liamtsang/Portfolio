import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, useTexture, MeshDistortMaterial } from '@react-three/drei'

function Wave() {
  const ref0 = useRef()
  const ref1 = useRef()
  const ref2 = useRef()
  useFrame(
    ({ clock }) => (
      (ref0.current.uTime = clock.getElapsedTime() * 0.25 + 0.5),
      (ref1.current.uTime = clock.getElapsedTime() * 0.25 + 1),
      (ref2.current.uTime = clock.getElapsedTime() * 0.25 + 3)
    ),
  )

  const texture = useTexture('img/adir0.png')

  return (
    <>
      <Plane ref={ref0} position={[-1, 0, 0]} scale={0.9}>
        <MeshDistortMaterial map={texture} distort={1} speed={10} />
      </Plane>
      <Plane ref={ref1} position={[0, 0, 0]} scale={0.9}>
        <MeshDistortMaterial distort={1} speed={10} />
      </Plane>
      <Plane ref={ref2} position={[1, 0, 0]} scale={0.9}>
        <MeshDistortMaterial distort={1} speed={10} />
      </Plane>
    </>
  )
}

export default function AdirImages() {
  return (
    <>
      <Wave />
    </>
  )
}
