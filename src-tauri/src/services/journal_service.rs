use http::StatusCode;
use serde_json::Value;

use crate::services::file_system::FileSystem;

pub struct JournalService<T: FileSystem> {
    file_system: T,
}

impl<T: FileSystem> JournalService<T> {
    pub fn new(file_system: T) -> Self {
        JournalService { file_system }
    }

    pub fn create_journal(&self, journal_json: &str, path: &str) -> Result<StatusCode, StatusCode> {
        dbg!("Journal JSON: {}", journal_json);
        if journal_json.trim().is_empty() {
            return Err(StatusCode::UNPROCESSABLE_ENTITY);
        }
        println!("{:?}", journal_json);
        // For validation
        let _: Value = match serde_json::from_str(&journal_json) {
            Ok(journal) => journal,
            Err(err) => {
                println!("{:?}", err);
                return Err(StatusCode::BAD_REQUEST);
            }
        };
        println!("Json validated");

        match self.file_system.save(path, journal_json) {
            Ok(_) => { Ok(StatusCode::CREATED) }
            Err(err) => {
                println!("{:?}", err);
                Err(StatusCode::INTERNAL_SERVER_ERROR)
            }
        }
    }
}


