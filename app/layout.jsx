'use client'
const title = 'Liam Tsang'
const url = 'https://react-three-next.vercel.app/'
const description =
  'The easiest and fastest way to create a 3D website using React Three Fiber and NextJS'
const author = 'Liam Tsang'
const twitter = '@'

import { Layout } from '@/src/components/dom/Layout'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './global.css'
import { View } from '@/components/canvas/View'
import { Common } from '@/components/canvas/View'

export default function RootLayout({ children }) {
  const pathname = usePathname()

  return (
    <html lang='en' className='w-full h-full antialiased text-white'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        {/* Recommended Meta Tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={author} />
        <meta name='designer' content={author} />
        <meta name='publisher' content={author} />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta
          name='keywords'
          content='Liam Tsang, 3D Developer, Three.js, Three.js Develepor, Threejs, Threejs Developer, R3F, R3F Developer, Liam, Tsang, Software Engineer,Product Manager,Project Manager,Data Scientist,Computer Scientist'
        />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta property='og:title' content={title} />
        <meta property='og:type' content='site' />
        <meta property='og:url' content={url} />
        <meta property='og:image' content={'/icons/share.png'} />
        <meta property='og:site_name' content={title} />
        <meta property='og:description' content={description} />

        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link
          rel='apple-touch-icon'
          sizes='16x16'
          href='/icons/favicon-16x16.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='32x32'
          href='/icons/favicon-32x32.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/icons/apple-touch-icon.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <link
          rel='mask-icon'
          color='#000000'
          href='/icons/safari-pinned-tab.svg'
        />
        <link rel='apple-touch-startup-image' href='/startup.png' />

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, initial-scale=1.0'
        />
        <meta name='theme-color' content='#000' />
        <link rel='shortcut icon' href='/icons/apple-touch-icon.png' />

        {/* 
      Twitter Summary card
        documentation: https://dev.twitter.com/cards/getting-started
        Be sure validate your Twitter card markup on the documentation site. */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content={twitter} />
      </head>
      <body
        className={`tracking-tight min-h-screen min-w-screen max-w-screen ${pathname === '/projects' ? 'h300' : ''}`}
      >
        {/* <header className='grid w-full grid-cols-2'>
          <div className='mx-0 my-auto'>
            <h1 className='-mt-2 text-3xl font-thin'>Liam Tsang</h1>
            <h1 className='font-light text-md'>3D Developer & Designer</h1>
            <h2 className='mt-3 text-sm text-slate-300'>liamtsang@gmail.com</h2>
            <h2 className='text-sm text-slate-300'>LinkedIn</h2>
            <h2 className='text-sm text-slate-300'>GitHub</h2>
          </div>
        </header> */}
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
