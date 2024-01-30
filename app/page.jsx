'use client'

import Oracle from 'next/font/local'
import ProjectViews from '../src/components/dom/ProjectViews'

import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

const oracle = Oracle({ src: './ABCOracleVariable-Trial.ttf' })

export default function Page() {
  return (
    <main className={oracle.className + 'm-10 text-zinc-100'}>
      <ProjectViews />
    </main>
  )
}
