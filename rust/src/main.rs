use std::net::SocketAddr;
use axum::Router;

mod router;
mod admin;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();

    let app = router::route_stack().await;

    let addr = SocketAddr::from(([127, 0, 0, 1], 3003));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
