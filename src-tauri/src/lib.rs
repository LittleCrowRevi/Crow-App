
#[macro_export]
macro_rules! query_all {
    ($query:expr, $conn:expr, $cast:ty, $error:expr) => {
        sqlx::query_as!($cast, $query)
          .fetch_all(&$conn.inner().0)
          .await
          .expect($error)
    };
}