'use client'

import { Layout } from '@/components/dom/Layout'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import '@/global.css'
import { View } from '@/components/canvas/View'
import { Common } from '@/components/canvas/View'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  return (
    <html lang='en' className='antialiased text-white h-full w-full'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body
        className={`tracking-tight min-h-screen min-w-screen max-w-screen ${pathname === '/projects' ? 'h300' : ''}`}
      >
        <header className='grid grid-cols-2 w-full'>
          <div className='my-auto mx-0'>
            <h1 className='text-3xl font-thin -mt-2'>Liam Tsang</h1>
            <h1 className='text-md font-light'>3D Developer & Designer</h1>
            <h2 className='mt-3 text-sm text-slate-300'>liamtsang@gmail.com</h2>
            <h2 className='text-sm text-slate-300'>LinkedIn</h2>
            <h2 className='text-sm text-slate-300'>GitHub</h2>
          </div>
        </header>
        <div id='Frame' className='frame'>
          <div className='frame_line frame_line-left'></div>
          <div className='frame_line frame_line-right'></div>
          <div className='frame_line frame_line-top'></div>
          <div className='frame_line frame_line-bottom'></div>
        </div>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
