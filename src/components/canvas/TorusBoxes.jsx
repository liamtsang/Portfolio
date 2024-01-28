import { Instances, Instance, AccumulativeShadows, RandomizedLight, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function TorusBoxes() {
  const texture = useTexture('cubetexture.png')

  let boxes = []
  let numberOfBoxes = 1400
  const ref = useRef()
  while (numberOfBoxes > 0) {
    let scale = numberOfBoxes < 50 ? Math.random() * 2.75 : Math.random() * 1.25
    let hue = Math.random() * 360
    let color = `hsl(${hue},100%,30%)`
    boxes.push(<CustomBox key={numberOfBoxes} scale={scale} color={color} />)
    numberOfBoxes--
  }

  useFrame(() => {
    ref.current.rotation.z += 0.0005
  })

  return (
    <>
      <group position={[0.15, 0.15, 0]} rotation={[-Math.PI / 4, 0.3, 0]} scale={[0.1, 0.1, 0.1]}>
        <Instances ref={ref}>
          <boxGeometry />
          <meshPhysicalMaterial
            map={texture}
            roughness={1}
            metalness={0}
            ior={1.5}
            reflectivity={0.5}
            iridescence={2}
            iridescenceIOR={1.3}
            sheen={0}
          />
          {boxes}
        </Instances>
      </group>
      <AccumulativeShadows temporal frames={100}>
        <RandomizedLight position={[2, 5, 2]} radius={10} />
      </AccumulativeShadows>
    </>
  )
}

function CustomBox(props) {
  let ref = useRef()

  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(ref.current.position, {
        scrollTrigger: {
          start: () => 0.15 * innerHeight,
          end: () => 1.05 * innerHeight,
          scrub: true,
        },
        x: position[0] * 25,
        y: position[1] * 10,
        z: position[2] * 100,
        ease: 'power1.inOut',
        repeatRefresh: true,
      })
    }) // <- scopes all selector text inside the context to this component (optional, default is document)
    return () => ctx.revert() // cleanup!
  }, [])

  const r = Math.random()
  useFrame(() => {
    // ref.current.rotation.x += 0.005*r;
    ref.current.rotation.z += 0.005 * r
    ref.current.rotation.y += 0.0025 * r
  })

  let position = makePoints(280, Math.random() * 50, Math.random() * 360, Math.random() * 360)

  return <Instance ref={ref} color={props.color} scale={props.scale} position={position} />
}

function makePoints(R, r, u, v) {
  u = (u * Math.PI) / 180
  v = (v * Math.PI) / 180
  let x = (R + r * Math.cos(v)) * Math.cos(u)
  let y = (R + r * Math.cos(v)) * Math.sin(u)
  let z = r * Math.sin(u)
  return [x / 20, y / 20, z / 20]

  // return new THREE.Vector3(x/20,y/20,z/20);
}

useTexture.preload('/cubetexture.png')
