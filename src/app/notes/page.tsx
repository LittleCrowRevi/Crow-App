'use client'

import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

type note = {
  id: Number,
  date: Date,
  color: Number,
  title: String,
  text: String
}

let firstLoad = true;

const qNotes = async (): Promise<[note]> => {
  const notes = await invoke('query_all_notes') as [note];
  console.log("debug: " + notes[0].title);
  return notes ?? [];
};

async function QueryNotesaa()  {

  let notes = [];
  const [notesState, setNotes] = useState('');
  

  const qn = await invoke('query_all_notes') as [note];
  notes = qn;
  console.log("debug: " + notes[0].title);
  return notes ?? [];
};

// <a className='rounded-border py-4 px-8 hover:bg-slate-600 hover:bg-opacity-60'>+ Add Note</a>

export default function Notes() {

  var n: note[] = [];
  const [loading, setLoading] = useState(false);
  const [notesState, setNotes] = useState(n);
  const [updateNotes, setUpNotes] = useState(false);

  function QueryNotes() {


    let notes: note[] = [];
    useEffect(() => {
      setLoading(true);
      invoke('query_all_notes')
        .then(function(data) {
          setLoading(false);
          (data as [note])?.map((n: note, index) => {
            notes.push(n);
          });
          setNotes(notes);
          console.log("a: " + notes);
        })
        .catch(e => console.log(e));
      }
    );
    return <></>
  };

  function NoteDisplay() {

    return <div className='flex z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl'>
      {notesState?.map((n:note, index) => {
        if (n !== undefined) {
          console.log("note: " + n)
          return (<a key={index} className='rounded-border mt-5 py-4 px-8 lg:ml-5 hover:bg-slate-600 hover:bg-opacity-60'>{n?.title}</a>)
        }
      })}
    </div>
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {firstLoad && (
        <>
        <QueryNotes/>
        {firstLoad = false}
        </>
      )}
      {loading ? (
        <div className='loading-container z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl'>
          loading
        </div>
      ): (
        <div className="notes-row flex z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl">
          <NoteDisplay />
      </div>
      )}
    </main>
  ) 
}