import React, { useRef, useEffect, useMemo } from 'react'
import { Edges, AccumulativeShadows, RandomizedLight, Center, Box, Instances, Instance } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Cross(props) {
  return (
    <>
      <group scale={3}>
        <Box args={[0.5, 0.5, 0.5]} rotation={[Math.PI / 1.25, Math.PI / 4, 0]}>
          <Edges scale={1} color='black' />
        </Box>
      </group>

      <AccumulativeShadows />
      <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
    </>
  )
}
