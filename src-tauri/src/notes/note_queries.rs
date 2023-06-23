use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Pool, FromRow};
use tauri::State;

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

    let rows = query_all(&conn, &qstring, "[0101] fechting of titles failed").await;
    
  }

  Ok(())
}

pub async fn query_all<'a>(conn: &State<'a, Conn>, query: &str, error: &str) -> Vec<Note> {
  let a: Vec<Note> = sqlx::query_as(query).fetch_all(&conn.inner().0).await.expect(error);
  a
}
