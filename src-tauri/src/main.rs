// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::Error;
use http::StatusCode;
use open_journal::services::file_system::DiskFileSystem;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use open_journal::services::journal_service::{JournalService, JournalSystemErr};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}


#[tauri::command]
fn create_journal(journal_json: &str, path: &str) -> u16 {
    let disk_file_system = DiskFileSystem;
    let service: JournalService<DiskFileSystem> = JournalService::new(disk_file_system);

    let status_code = match service.create_journal(journal_json, path) {
        Ok(_) => {StatusCode::CREATED}
        Err(err) => {match err{
            JournalSystemErr::NullOrEmpty(_) => {StatusCode::UNPROCESSABLE_ENTITY}
            JournalSystemErr::InvalidJson(_) => {StatusCode::BAD_REQUEST}
            JournalSystemErr::IoError(io_err) => {
                match io_err {
                    ref err if err.kind() == std::io::ErrorKind::AlreadyExists => {
                        StatusCode::CONFLICT
                    }
                    _ => StatusCode::INTERNAL_SERVER_ERROR
                }

            }
        } }
    };

    status_code.as_u16()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, create_journal])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
