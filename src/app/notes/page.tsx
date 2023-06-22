'use client'

import { useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

function QueryNotes(): [any] {
  // type for parsing the Note Structs
  type note = {
    id: Number,
    date: Date,
    color: Number,
    title: String,
    text: String
  }
  let notes: [note];

  useEffect(() => {
    invoke('query_all_notes_titles')
      .then((notes_query) => {
        // trycatch in case something fails
        try {
          notes = notes_query as [note];
          console.log("debug: " + notes[0].title);
          return notes;
        } catch(e) {
          console.log((e as Error).message)
        }
      });
  })

  return [undefined];
}

function NoteDisplay() {


  return <a className='rounded-border mt-5 py-4 px-8 hover:bg-slate-600 hover:bg-opacity-60'>
    </a>
}

export default function Notes() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl">
          <a className='rounded-border py-4 px-8 hover:bg-slate-600 hover:bg-opacity-60'>
            + Add Note
          </a>
          <QueryNotes />
      </div>
    </main>
  ) 
}