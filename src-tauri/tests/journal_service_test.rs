use chrono::Utc;
use http::StatusCode;

use open_journal::models::journal::Journal;
use open_journal::models::journal_action::JournalAction;
use open_journal::models::journal_entry::JournalEntry;
use open_journal::models::tag::Tag;
use open_journal::services::file_system::FileSystem;
use open_journal::services::journal_service::JournalService;

struct MockFileSystem;

impl FileSystem for MockFileSystem {
    fn save(&self, _: &str, _: &str) -> Result<(), std::io::Error> {
        Ok(())
    }
}


#[test]
fn test_create_journal_empty_json() {
    // Arrange
    let empty_string: &str = "";
    let path: &str = "path";

    let sut = JournalService::<MockFileSystem>::new(MockFileSystem);

    // Act
    let result = sut.create_journal(empty_string, path);

    // Assert
    assert_eq!(result, Err(StatusCode::UNPROCESSABLE_ENTITY));
}

#[test]
fn test_create_journal_invalid_json() {
    // Arrange
    let invalid_json: &str = "mario";
    let path: &str = "path";

    let sut = JournalService::<MockFileSystem>::new(MockFileSystem);

    // Act
    let result = sut.create_journal(invalid_json, path);

    // Assert
    assert_eq!(result, Err(StatusCode::BAD_REQUEST));
}

#[test]
fn test_create_journal_valid_json() {
    // Arrange
    let fake_journal = Journal {
        entry: JournalEntry {
            content: "Test content".to_string(),
            created_at: Utc::now().to_string(),
        },

        tags: vec![Tag { name: "Test tag".to_string() }],
        actions: vec![JournalAction {
            description: "Test action".to_string(),
            due_date: Some(Utc::now().to_string()),
            completed: false,
            completed_at: None,
        }],
    };
    let path: &str = "path";
    let fake_journal_as_json = serde_json::to_string(&fake_journal).unwrap();

    let sut = JournalService::<MockFileSystem>::new(MockFileSystem);

    // Act
    let result = sut.create_journal(fake_journal_as_json.as_str(), path);

    // Assert
    assert_eq!(result, Ok(StatusCode::CREATED));
}