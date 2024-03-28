use std::collections::HashMap;
use http::StatusCode;
use rusqlite::{Connection, params};
use crate::data_access::journal_data_access::add_journal;
use crate::dtos::journal_dto::JournalDTO;
use crate::models::journal::Journal;

pub struct JournalService {
    database_path: String,
}

impl JournalService {
    pub fn new(database_path: String) -> Self {
        if database_path.trim().is_empty() {
            panic!("Database path cannot be empty");
        }

        Self {
            database_path: database_path,
        }
    }

    pub fn create_journal(&self, journal_json: String) -> Result<StatusCode, StatusCode>{
        println!("Journal JSON: {}", journal_json);
        if journal_json.trim().is_empty() {
            return Err(StatusCode::UNPROCESSABLE_ENTITY)
        }

        let journal_dto: JournalDTO = match serde_json::from_str(&journal_json) {
            Ok(journal) => journal,
            Err(_) => return Err(StatusCode::BAD_REQUEST)
        };

        println!("Journal DTO: {:?}", journal_dto);

        if !journal_dto.is_valid() {
            return Err(StatusCode::UNPROCESSABLE_ENTITY)
        }

        println!("Journal DTO is valid");
        let path = "./data.db";
        let mut conn: Connection = match Connection::open(path) {
            Ok(conn) => conn,
            Err(error) => {
                println!("Failed to open database connection: {}", error.to_string());
                return Err(StatusCode::INTERNAL_SERVER_ERROR)
            }
        };

        println!("Database connection opened successfully");


        let id = match add_journal(&mut conn, &journal_dto)   {
            Ok(id) => id,
            Err(_) => return{
                conn.close().unwrap();
                println!("Failed to create journal");
                Err(StatusCode::INTERNAL_SERVER_ERROR)
            }
        };

        println!("Journal created successfully: {}", id);

        Ok(StatusCode::CREATED)

    }
}
