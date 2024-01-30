import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane, useTexture, MeshDistortMaterial } from '@react-three/drei'

function Wave() {
  const texture0 = useTexture('img/adir0.png')
  const texture1 = useTexture('img/adir1.png')
  const texture2 = useTexture('img/adir2.png')

  return (
    <>
      <Plane args={[1, 2.14, 16, 16]} position={[-1, 0, 0]} scale={0.9}>
        <MeshDistortMaterial map={texture0} distort={0.3} speed={1} />
      </Plane>
      <Plane args={[1, 2.14, 16, 16]} position={[0, 0, 0]} scale={0.9}>
        <MeshDistortMaterial map={texture1} distort={0.322} speed={1} />
      </Plane>
      <Plane args={[1, 2.14, 16, 16]} position={[1, 0, 0]} scale={0.9}>
        <MeshDistortMaterial map={texture2} distort={0.31} speed={1} />
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
