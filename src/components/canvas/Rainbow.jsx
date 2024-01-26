import React, { useRef, useEffect } from 'react'
import { Edges, AccumulativeShadows, RandomizedLight, Center } from '@react-three/drei'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFrame } from '@react-three/fiber'

export default function Rainbow(props) {
  const ref = useRef()
  gsap.registerPlugin(ScrollTrigger)

  // GSAP
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(ref.current.rotation, {
        scrollTrigger: {
          scrub: true,
        },
        x: '5',
        y: '3',
        z: '.45',
        ease: '',
        repeatRefresh: true,
      })
      gsap.to(ref.current.position, {
        scrollTrigger: {
          scrub: true,
        },
        ease: 'power1.inOut',
        repeatRefresh: true,
      })
    }, ref) // <- scopes all selector text inside the context to this component (optional, default is document)
    return () => ctx.revert() // cleanup!
  }, [])

  // Building Circles
  const circles = []
  for (let i = 0; i < 21; i++) {
    circles.push(<Circle key={i} position={[0, 0, i / 10]} hue={i * 15} />)
  }

  return (
    <Center>
      <group ref={ref} {...props}>
        {/* <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial transparent opacity={0} />
          <Edges
          scale={1}
          threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
          color={"gray"}
        />
        </mesh> */}
        <mesh position={[0, 0, -1]}>{circles}</mesh>
        <AccumulativeShadows temporal frames={100}>
          <RandomizedLight position={[2, 5, 2]} radius={10} />
        </AccumulativeShadows>
      </group>
    </Center>
  )
}

function Circle(props) {
  const ref = useRef()
  let h = 0
  useFrame((state, clock) => {
    h += 0.0025
    ref.current.material.color.setHSL(props.hue / 360 + h, 1, 0.5)
  })

  return (
    <mesh position={props.position}>
      <circleGeometry args={[1, 164]} />
      <meshBasicMaterial transparent opacity={0} />
      <Edges
        ref={ref}
        scale={1}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
      />
    </mesh>
  )
}
