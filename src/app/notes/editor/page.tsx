'use client'

import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { Note } from '@/app/lib/lib';

let firstLoad = true;

export default function Editor() {

  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<Note | null>(null);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  function FetchNote() {

    useEffect(() => {
      invoke("query_one_note", { id })
        .then((data) => {
          let note = (data as [Note])[0];
          console.log("Editing Note: " + note.id)
          setNote(note);
        })
    });

    return <></>
  }

  return (
  <main className="flex min-h-screen flex-col items-center justify-between">
    {firstLoad && (
      <>
        {firstLoad = false}
        <FetchNote/>
      </>
    )}
    <div className='notes-row flex-center-column flex-auto lg:flex-row text-xl'>
      {note?.text}
    </div>
  </main>)
}