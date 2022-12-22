use axum::Router;
use axum::routing::get;

pub async fn route_stack() -> Router {

    let app = Router::new()
        .route("/", get(|| async {"Hello, Revi!"}));

    app
}