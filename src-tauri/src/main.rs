// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sqlx::postgres::{PgPoolOptions};
use dotenv::dotenv;
use std::env;
use sqlx::{Pool, Postgres};

mod notes;
use notes::note_queries::query_all_notes_titles;

// struct for the Database Connection
pub struct Conn(Pool<Postgres>);

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {

  dotenv().ok();

  let psql_url = env::var("DATABASE_URL").expect("Postgres URL in env not found!");

  let pool: Pool<Postgres> = PgPoolOptions::new()
      .connect(&psql_url).await?;

  tauri::Builder::default()
      // passes the db connection to asking functions
      .manage::<Conn>(Conn(pool))
      .invoke_handler(tauri::generate_handler![query_all_notes_titles])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");

  Ok(())
}
