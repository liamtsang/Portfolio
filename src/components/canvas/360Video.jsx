import { Sphere, useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

export default function Shibuya({ url }) {
  const texture = useVideoTexture('./shibuya.mp4')

  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.y += 0.002
  })

  return (
    <Sphere ref={ref} args={[1500, 60, 40]}>
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </Sphere>
  )
}
