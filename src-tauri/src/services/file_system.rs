use std::fmt::Display;
use std::fs::File;
use std::io::prelude::*;

#[derive(Debug)]
pub enum FileSystemErr {
    IoError(std::io::Error),
    EmptyPathError(String),
    EmptyContent,
}

impl Display for FileSystemErr {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            FileSystemErr::EmptyContent =>
                write!(f, "File cannot is empty"),
            FileSystemErr::EmptyPathError(message) =>
                write!(f, "{}", message),
            FileSystemErr::IoError(io_error) =>
                write!(f, "{}", io_error),
        }
    }
}

impl std::error::Error for FileSystemErr {}

pub trait FileSystem {
    fn save(&self, filename: &str, content: &str) -> Result<(), FileSystemErr>;
}

pub struct DiskFileSystem;

impl FileSystem for DiskFileSystem {
    fn save(&self, path: &str, content: &str) -> Result<(), FileSystemErr> {
        if (path.trim().is_empty()) {
            return Err(FileSystemErr::EmptyPathError("Missing save path".to_string()));
        }

        if (content.trim().is_empty()) {
            return Err(FileSystemErr::EmptyContent);
        }

        let mut file: File = match File::create_new(path) {
            Ok(file) => { file }
            Err(err) => { return Err(FileSystemErr::IoError(err)); }
        };

        return match file.write_all(content.as_bytes()) {
            Ok(_) => { Ok(()) }
            Err(err) => { Err(FileSystemErr::IoError(err)) }
        };
    }
}

