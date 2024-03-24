// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use open_journal::services::journal_service::JournalService;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

const DATABASE_PATH: &str = "./database/data.db";
#[tauri::command]
fn add_journal(journal_json: String) -> String {
    let journal_service = JournalService::new(DATABASE_PATH.to_string());
    let status_code = journal_service.create_journal(journal_json).unwrap();
    status_code.to_string()
}


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, add_journal])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
