export default function Notes() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl">
          <a className='rounded-border py-4 px-8 hover:bg-slate-600 hover:bg-opacity-60'>
            + Add Note
          </a>
      </div>
    </main>
  ) 
}