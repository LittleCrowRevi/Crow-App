use serde::{Deserialize, Serialize};
use tauri::State;

use crate::Conn;

#[derive(Debug, Serialize)]
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

    Note { 
      id, 
      date, 
      color, 
      title, 
      text
    }
  }
}


#[tauri::command]
pub async fn query_all_notes<'a>(conn: State<'a, Conn>) -> Result<Vec<Note>, ()> {
  let titles: Vec<String> = vec![];
  let rows = sqlx::query_as!(Note, "SELECT * FROM notes")
      .fetch_all(&conn.inner().0)
      .await
      .expect("[0101] fechting of titles failed");

  println!("rows: {:?}", rows.len());

  Ok(rows)

}