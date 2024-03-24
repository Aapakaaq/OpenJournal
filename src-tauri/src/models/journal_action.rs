use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JournalAction {
    pub id: Option<i32>,
    pub entry_id: i32,
    pub description: String,
    pub due_date: Option<String>,
    pub completed: bool,
    pub completed_at: Option<String>,
}