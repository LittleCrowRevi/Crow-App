'use client'

import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import styles from './notelist.module.css'
// fix window not defined???
import { WebviewWindow, LogicalSize } from '@tauri-apps/api/window'
import { Grenze } from 'next/font/google'
import className from 'classnames'

type Note = {
  id: Number,
  date: Date,
  title: String,
  text: String,
  color: String
}

// var to stop constant fetching from db
let firstLoad = true;

export default function Notes() {
  // var to init the noteState......
  var n: Note[] = [];
  const [notesState, setNotes] = useState(n);

  // TODO: loading animation
  const [loading, setLoading] = useState(false);
  const [editNote, setOpenNote] = useState(false)
  const [updateNotes, setUpNotes] = useState(false);

  // GETS ALL notes from the rust backend
  function QueryNotes() {

    useEffect(() => {
      setLoading(true);
      invoke('query_all_notes')
        .then(function(data) {
          setLoading(false);

          let notes: Note[] = [];
          (data as [Note])?.map((n: Note, index) => {
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

  // lists all notes
  function NoteList() {

    return <div className='flex z-5 w-full max-w-5xl center font-mono flex-col flex-auto lg:flex-row text-xl'>
      {notesState?.map((n:Note, index) => {
        // TODO: more info to display
        if (n !== undefined) {
          let classnames = className(styles.notebutton)
          console.log(n.color);
          return (
            // sigh
              <a style={{borderColor: '#' + n.color}} key={index} onClick={() => OpenEditWindow(n.id)} id='' className={classnames}>
                {n?.title}
              </a>
          )
        }
      })}
    </div>
  };

  function OpenEditWindow(id: Number) {
    console.log(id)
    invoke('open_edit_window', { id });
    //TODO: sizing
    /*const webview = new WebviewWindow('note-editor', {
      url: '/note-edit',
    });
    //webview.setMaxSize(new LogicalSize(400, 400));
    webview.once('tauri://created', function () {
      console.log('note editor window opened')
    })
    webview.once('tauri://error', function (e) {
      console.log(e)
    })*/
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