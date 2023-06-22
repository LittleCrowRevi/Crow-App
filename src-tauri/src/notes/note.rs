use std::time::Instant;


struct Note {
  id: i64,
  date: Instant,
  color: i64,
  title: String,
  text: String,
}

impl Note {

  fn new(id: i64, color: i64, title: String, text: String) -> Self {
    
    let date = Instant::now();

    Note { 
      id, 
      date, 
      color, 
      title, 
      text
    }
  }
}