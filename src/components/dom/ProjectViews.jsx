import React, { Suspense, use, useLayoutEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import { View } from '@/components/canvas/View'
import { Common } from '@/components/canvas/View'
import Glyph from '@/components/canvas/Glyph'
import House from '@/components/canvas/parametric/ShapingCurves'
import Rainbow from '@/components/canvas/Rainbow'
import AdirImages from '@/components/canvas/AdirImages'

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
          onToggle: (self) => self.isActive && setView(view, faces[i]),
        })
      })
    }
    function setView(newView, newFace) {
      if (newView !== currentView) {
        viewTween.current = gsap.to(currentView, {
          transform: 'rotateX(90deg)',
          display: 'none',
          autoAlpha: 1,
          duration: 0.5,
        })
        viewTween.current = gsap.to(newView, {
          transform: 'rotateX(0deg)',
          display: 'block',
          autoAlpha: 0,
          duration: 0.5,
        })
        viewTween.current = gsap.to(currentFace, {
          transform: 'rotateX(90deg) translateZ(8em)',
          opacity: 0,
          duration: 0.5,
        })
        viewTween.current = gsap.to(newFace, {
          transform: 'rotateX(0deg)',
          opacity: 1,
          duration: 0.5,
        })
        currentView = newView
        currentFace = newFace
      }
    }
  })

  return (
    <>
      <div id='projects' className='z-10 relative text-right py-40'>
        <div id='cube' className='mt-10'>
          {/* Glyph */}
          <div className='face first bottom-0 right-0'>
            <div id='projectTitle' className='text-xl'>
              Glyph
            </div>
            <div id='subTitle' className='text-md font-semibold my-2'>
              2023 / School
            </div>
            <div className='text-xs font-semibold mt-4 '>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Three.js</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Astro</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 text-center'>TeachableMachines</span>
            </div>
            <div id='description' className='z-0 text-lg font-medium mt-2 right-0 pl-40'>
              A mobile web app for viewing additional information on relics in museums. Using image recognition on the
              physical object, museum goers will get to inspect the relic in a digital 3D space, and learn about time it
              came from.
            </div>
          </div>
          {/* House of The Golden Thread */}
          <div className='face bottom-0 right-0'>
            <div id='projectTitle' className='text-xl'>
              House of the Golden Thread
            </div>
            <div id='subTitle' className='text-md font-semibold my-2'>
              2023 / Commission
            </div>
            <div className='text-xs font-semibold mt-4 '>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Three.js</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Astro</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 text-center'>TeachableMachines</span>
            </div>
            <div id='description' className='z-0 text-lg font-medium mt-2 right-0 pl-40'>
              A mobile web app for viewing additional information on relics in museums. Using image recognition on the
              physical object, museum goers will get to inspect the relic in a digital 3D space, and learn about time it
              came from.
            </div>
          </div>
          {/* Portfolio */}
          <div className='face bottom-0 right-0'>
            <div id='projectTitle' className='text-xl'>
              Portfolio
            </div>
            <div id='subTitle' className='text-md font-semibold my-2'>
              2023 / School
            </div>
            <div className='text-xs font-semibold mt-4 '>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Three.js</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>Astro</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 text-center'>TeachableMachines</span>
            </div>
            <div id='description' className='z-0 text-lg font-medium mt-2 right-0 pl-40'>
              A mobile web app for viewing additional information on relics in museums. Using image recognition on the
              physical object, museum goers will get to inspect the relic in a digital 3D space, and learn about time it
              came from.
            </div>
          </div>
          {/* Adir */}
          <div className='face bottom-0 right-0'>
            <div id='projectTitle' className='text-xl'>
              Adir Landes Portfolio
            </div>
            <div id='subTitle' className='text-md font-semibold my-2'>
              2023 / Commission
            </div>
            <div className='text-xs font-semibold mt-4 '>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>HTML</span>
              <span className='rounded-2xl border border-red-500 py-1 px-2 mx-1 text-center'>CSS</span>
            </div>
            <div id='description' className='z-0 text-lg font-medium mt-2 right-0 pl-40'>
              A visually bold, yet simple and clean portfolio website for graphic and product designer Adir Landes. A
              simple static website that mostly tested my hosting and deployment skills.
            </div>
          </div>
        </div>
      </div>
      <div ref={viewsContainer} id='Three' className='h-full w-screen'>
        <View className='view first h-screen w-full flex-col items-center justify-center'>
          <Glyph />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <House scale={3.3} />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <Rainbow rotation={[0.3, 0.69, 0]} />
          <Common />
        </View>
        <View className='view h-screen w-full flex-col items-center justify-center'>
          <AdirImages />
          <Common />
        </View>
      </div>
    </>
  )
}
