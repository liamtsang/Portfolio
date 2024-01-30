import React, { Suspense, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { View } from '../../components/canvas/View'
import { Common } from '../../components/canvas/View'
import Glyph from '../../components/canvas/Glyph'
import House from '../../components/canvas/parametric/ShapingCurves'
import Rainbow from '../../components/canvas/Rainbow'
import Shibuya from '../../components/canvas/360Video'
import AdirImages from '../../components/canvas/AdirImages'
import TorusBoxes from '../../components/canvas/TorusBoxes'

import NType82 from 'next/font/local'
const nytype82 = NType82({ src: './NType82-Regular.ttf' })

export default function ProjectViews() {
  const viewTween = useRef(null)
  const viewsContainer = useRef()
  useGSAP(() => {
    const views = gsap.utils.toArray('.view')
    const faces = gsap.utils.toArray('.face')
    let currentView = views[0]
    let currentFace = faces[0]
    if (views.length > 1) {
      views.forEach((view, i) => {
        ScrollTrigger.create({
          start: () => (i - 0.5) * innerHeight,
          end: () => (i + 0.5) * innerHeight,
          onToggle: (self) => self.isActive && setView(view, faces[i])
        })
      })
    }
    function setView(newView, newFace) {
      if (newView !== currentView) {
        viewTween.current = gsap.to(currentView, {
          transform: 'rotateX(90deg)',
          display: 'none',
          duration: 0.5
        })
        viewTween.current = gsap.to(newView, {
          transform: 'rotateX(0deg)',
          display: 'block',
          duration: 0.5
        })
        viewTween.current = gsap.to(currentFace, {
          transform: 'rotateX(90deg) translateZ(8em)',
          opacity: 0,
          duration: 0.5
        })
        viewTween.current = gsap.to(newFace, {
          transform: 'rotateX(0deg)',
          opacity: 1,
          duration: 0.5
        })
        currentView = newView
        currentFace = newFace
      }
    }
  })

  return (
    <>
      <div id='projects' className='relative z-10 py-40 text-right'>
        <div id='cube' className='mt-10'>
          {/* Intro */}
          <div className='face first bottom-0 right-0'>
            <div id='projectTitle' className={nytype82.className + ' text-4xl'}>
              Hi, I'm <span className='text-yellow-300'>Liam</span>
            </div>
            <div
              id='description'
              className='right-0 z-0 mt-2 pl-8 text-lg font-medium md:pl-40'
            >
              I'm a{' '}
              <mark>
                <span>creative developer</span>
              </mark>
              &nbsp;and <mark>designer</mark> with a focus on 3D web
              development. I believe in taking the web to new places, and
              creating experiences that are <mark>fun</mark>,{' '}
              <mark>engaging</mark>, and <mark>memorable</mark>.
            </div>
            <div className='mt-3 flex items-center justify-center text-center text-xs opacity-75'>
              <div style={{ marginRight: 'calc(var(--pad) * -2)' }}>
                Scroll down
              </div>
            </div>
            <div className='-mb-2 mt-0 flex items-center justify-center text-center text-xs opacity-75'>
              <div style={{ marginRight: 'calc(var(--pad) * -2)' }}>◡</div>
            </div>
          </div>
          <Face
            title='Glyph'
            subtitle='2023 | School'
            tech={['Three.js', 'Astro', 'GSAP']}
            link='https://www.glyph.guru/'
            description={
              <div>
                A <span className='text-red-500'>mobile web app</span> for
                viewing additional information on relics in{' '}
                <span className='text-red-500'>museums.</span> Using image
                recognition on the physical object, museum goers will get to
                inspect the relic in a digital 3D space, and learn about the
                time it came from.{' '}
              </div>
            }
          />
          <Face
            title='House of the Golden Thread'
            subtitle='2023 | Commission'
            tech={['Three.js', 'React', 'WebGL']}
            link='https://houseofthegoldenthread.com/'
            description={
              <div>
                A first person{' '}
                <span className='text-red-500'>3D audiospatial experience</span>{' '}
                that brings the listener into an immersive world to experience a
                generative audio entity. A complex project that uses coordinate
                data provided by David Schnug's digital instruments in order to
                precisely move the audio sources.
              </div>
            }
          />
          <Face
            title='360° Video Art'
            subtitle='2023 | School'
            tech={['TouchDesigner', 'Three.JS', 'RunwayML']}
            link='https://www.youtube.com/watch?v=VntnhZ-1WCg'
            description={
              <div>
                Live-controlled art made in TouchDesigner. Using 360° videos I
                applied a large variety of effects that I controlled with a MIDI
                controller in <span className='text-red-500'>real-time</span>{' '}
                for my Live Visuals class.
              </div>
            }
          />
          <Face
            title='Adir Landes Portfolio'
            subtitle='2023 | Commission'
            tech={['HTML', 'CSS', 'TeachableMachines']}
            link='https://durrlanders.org/'
            description={
              <div>
                A visually <span className='text-red-500'>bold and clean</span>{' '}
                portfolio website for graphic and product designer Adir Landes.
                A simple static website that mostly tested my hosting and
                deployment skills.
              </div>
            }
          />
          {/* Outro */}
          <div className='face padleft bottom-0 right-0'>
            <div
              id='projectTitle'
              className={nytype82.className + ' text-left text-4xl '}
            >
              Let's work together.
            </div>
            <ul className='text-left'>
              <li>
                <Link
                  href='mailto:liamtsang@gmail.com'
                  id='description'
                  className='right-0 z-0 mt-2 text-lg font-medium text-blue-400 underline'
                >
                  liamtsang@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href='mailto:liamtsanggmail.com'
                  id='description'
                  className='right-0 z-0 mt-2 text-lg font-medium text-blue-400 underline'
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div ref={viewsContainer} id='Three' className='h-full w-screen'>
        <View className='view first h-screen w-full flex-col items-center justify-center'>
          <TorusBoxes />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <Glyph />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <House scale={3.3} />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <Shibuya />
          <Common fov={120} />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <AdirImages />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <Rainbow />
          <Common />
        </View>
      </div>
    </>
  )
}

function Face(props) {
  let tech = []
  for (let i = 0; i < props.tech.length; i++) {
    let span
    if (i == props.tech.length - 1) {
      span = (
        <span
          key={i}
          className='rounded-2xl border border-red-500 px-2 py-1 text-center'
        >
          {props.tech[i]}
        </span>
      )
    } else {
      span = (
        <span
          key={i}
          className='mx-1 rounded-2xl border border-red-500 px-2 py-1 text-center'
        >
          {props.tech[i]}
        </span>
      )
    }
    tech.push(span)
  }

  return (
    <div className='face bottom-0 right-0'>
      <Link id='projectLink' className='' target='_blank' href={props.link}>
        <div
          id='projectTitle'
          className={nytype82.className + ' text-2xl hover:text-blue-500'}
        >
          <span className='pr-2 text-base text-red-500'>&#10697;</span>{' '}
          {props.title}
        </div>
      </Link>
      <div id='subTitle' className='text-md mb-2 font-semibold'>
        <Suspense fallback={<div>Loading...</div>}>{props.subtitle}</Suspense>
      </div>

      <div className='mt-4 text-xs font-semibold '>{tech}</div>
      <div
        id='description'
        className='right-0 z-0 mt-2 text-balance pl-8 text-lg font-medium md:pl-40'
      >
        {props.description}
      </div>
    </div>
  )
}
