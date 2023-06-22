import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl">
          <a href="/notes" className='rounded-border py-4 px-8 hover:bg-slate-400 hover:bg-opacity-60'>
            Your Notes
          </a>
          <a href='/music' className='py-4 px-8 mt-5 rounded-border lg:mt-0 lg:ml-5 hover:bg-slate-600 hover:bg-opacity-60'>
            Music
          </a>
          <a className='py-4 px-8 mt-5 rounded-border lg:mt-0 lg:ml-5 hover:bg-slate-600 hover:bg-opacity-60'>
            Stuff
          </a>
      </div>
    </main>
  )
}
