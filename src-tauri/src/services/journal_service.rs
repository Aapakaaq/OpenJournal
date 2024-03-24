use http::StatusCode;
use rusqlite::Connection;
use crate::data_access::journal_data_access::add_journal;
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
        if journal_json.trim().is_empty() {
            return Err(StatusCode::UNPROCESSABLE_ENTITY)
        }

        let journal: Journal = match serde_json::from_str(&journal_json) {
            Ok(journal) => journal,
            Err(_) => return Err(StatusCode::BAD_REQUEST)
        };

        if !journal.is_valid() {
            return Err(StatusCode::UNPROCESSABLE_ENTITY)
        }

        let mut conn: Connection = match Connection::open(&self.database_path) {
            Ok(conn) => conn,
            Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR)
        };

        match add_journal(&mut conn, &journal)   {
            Ok(_) => (),
            Err(_) => return Err(StatusCode::INTERNAL_SERVER_ERROR)
        }

        Ok(StatusCode::CREATED)

    }
}