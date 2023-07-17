'use client'

import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import styles from './notelist.module.css'
import className from 'classnames'
import { Note } from '../lib/lib'

// var to stop constant fetching from db
let firstLoad = true;

export default function Notes() {
  const [notesState, setNotes] = useState<Note[] | null>(null);

  // TODO: loading animation
  const [loading, setLoading] = useState(false);
  const [editNote, setOpenNote] = useState(false)
  const [updateNotes, setUpNotes] = useState(false);
  const [sortType, setSortType] = useState("id");

  function changedLoading(state: boolean) {
    setLoading(state);
    return <></>
  }
  // GETS ALL notes from the rust backend
  function QueryNotes() {

    useEffect(() => {
      setLoading(true);
      invoke('query_all_notes')
        .then(function(data) {
          let notes: Note[] = [];
          (data as [Note]).map((n: Note, index) => { notes.push(n) });
          notes.sort(sortNotes);
          console.log(notes);
          setNotes(notes);
        })
        .then(() => setLoading(false))
        .catch(e => console.log(e));
      }
    );
    return <></>
  };

  function sortNotes(a: Note, b: Note) {

    if (sortType == "id") {

      if (a.id > b.id) {
        return 1
      }
      if (a.id < b.id) {
        return -1
      }
      return 0
    }

    return 0;
  }

  // lists all notes
  function NoteList() {

    return <div className='flex z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl'>
      {notesState?.map((n:Note, index) => {
        // TODO: more info to display
        if (n !== undefined) {
          let classnames = className(styles.notebutton)
          return (
            // sigh
              <a style={{borderColor: '#' + n.color}} key={index} onClick={() => OpenEditWindow(n.id)} id='' className={classnames}>
                {n?.title}
                <p className="text-xs">
                  {n?.text}
                </p>
              </a>
          )
        }
      })}
    </div>
  };

  function OpenEditWindow(id: Number) {
    console.log("Opening note with ID " + id);
    invoke('open_edit_window', { id });
    //TODO: sizing
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {firstLoad && (
        <>
          <QueryNotes/>
          {firstLoad = false}
        </>
      )}
      {loading ? (
        <div className='loading-container flex-center-column flex-auto lg:flex-row text-xl'>
          loading
        </div>
      ): (
        <div className="notes-row flex-center-column flex-auto lg:flex-row text-xl">
          <NoteList />
      </div>
      )}
    </main>
  ) 
}