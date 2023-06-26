use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Pool, FromRow};
use tauri::{State, AppHandle};

use crate::Conn;

#[derive(Debug, Serialize, FromRow, Deserialize)]
pub struct Note {
  id: i32,
  date: time::OffsetDateTime,
  color: i32,
  title: String,
  text: String,
}

impl Note {

  fn new(id: i32, color: i32, title: String, text: String) -> Self {
    
    let date = time::OffsetDateTime::now_utc();

    Note { id, date, color, title, text }
  }
}


/// GETs all notes
#[tauri::command]
pub async fn query_all_notes<'a>(conn: State<'a, Conn>) -> Result<Vec<Note>, ()> {
  let rows = query_all(&conn, "SELECT * FROM notes", "[0101] fechting of titles failed").await;

  println!("rows queried: {:?}", rows.len());

  Ok(rows)

}

/// UPDATES all incoming notes
#[tauri::command]
pub async fn update_notes<'a>(conn: State<'a, Conn>, notes: Vec<Note>) -> Result<(), ()> {
  for n in notes {
    let qstring = format!(r#"
    UPDATE notes
    SET date now()
        color {}
        title {} 
        text {}
    WHERE id = {}
    "#, n.color, n.title, n.text, n.id);

    let rows = query_all(&conn, &qstring, "[0102] fechting of titles failed").await;
    
  }

  Ok(())
}

#[tauri::command]
pub async fn query_one_note<'a>(conn: State<'a, Conn>, id: String) -> Result<Vec<Note>, ()> {
  let query = format!("SELECT * FROM notes WHERE id = {id}");
  let data = query_all(&conn, &query, format!("[0103] failed fechting of note with id: {id}").as_str()).await;
  Ok(data)
}


#[tauri::command]
pub async fn open_edit_window<'a>(app: AppHandle, conn: State<'a, Conn>, id: String) -> Result<(), ()> {
  let edit_window = tauri::WindowBuilder::new(
    &app,
    "Edit",
    tauri::WindowUrl::App("/notes/editor?id=1".into())
  ).build().expect(format!("[0103] Failed to build window for note with ID: {id}").as_str());
  Ok(())
}

pub async fn query_all<'a>(conn: &State<'a, Conn>, query: &str, error: &str) -> Vec<Note> {
  let data: Vec<Note> = sqlx::query_as(query).fetch_all(&conn.inner().0).await.expect(error);
  data
}
