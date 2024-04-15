use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct JournalActionDTO {
    pub description: String,
    pub due_date: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JournalDTO {
    pub content: String,
    pub actions: Vec<JournalActionDTO>,
    pub tags: Vec<String>,
}

impl JournalDTO {
    // TODO: Improve this validation
    pub fn is_valid(&self) -> bool {
        if self.content.trim().is_empty() {
            return false;
        }

        true
    }
}