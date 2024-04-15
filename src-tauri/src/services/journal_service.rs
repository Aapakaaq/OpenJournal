use std::fmt::{Display, Formatter};
use http::StatusCode;
use serde_json::{Error, Value};

use crate::services::file_system::{FileSystem, FileSystemErr};


pub struct JournalService<T: FileSystem> {
    file_system: T,
}

#[derive(Debug)]
pub enum JournalSystemErr {
    NullOrEmpty(String),
    InvalidJson(Error),
    IoError(std::io::Error),
}

impl Display for JournalSystemErr {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match self {
            JournalSystemErr::NullOrEmpty(msg) =>
                write!(f, "{}", msg),
            JournalSystemErr::InvalidJson(parse_err) =>
                write!(f, "{}", parse_err),
            JournalSystemErr::IoError(io_error) =>
                write!(f, "{}", io_error),
        }
    }
}
impl std::error::Error for JournalSystemErr {}

impl<T: FileSystem> JournalService<T> {
    pub fn new(file_system: T) -> Self {
        JournalService { file_system }
    }

    pub fn create_journal(&self, journal_json: &str, path: &str) -> Result<bool, JournalSystemErr> {
        dbg!("Journal JSON: {}", journal_json);
        if journal_json.trim().is_empty() {
            return Err(JournalSystemErr::NullOrEmpty("json cannot be empty".to_string()));
        }

        if path.trim().is_empty() {
            return Err(JournalSystemErr::NullOrEmpty("path cannot be empty".to_string()));
        }

        println!("{:?}", journal_json);
        // For validation
        let _: Value = match serde_json::from_str(&journal_json) {
            Ok(journal) => journal,
            Err(err) => {
                return Err(JournalSystemErr::InvalidJson(err));
            }
        };

        println!("Json validated");

        return match self.file_system.save(path, journal_json) {
            Ok(_) => { Ok(true) }
            Err(err) => {match err  {
                FileSystemErr::IoError(err) => {
                    Err(JournalSystemErr::IoError(err))}
                // Unrecoverable error given previous code
                FileSystemErr::EmptyContent => {panic!("{}", err)}
            }}
        }
    }
}


