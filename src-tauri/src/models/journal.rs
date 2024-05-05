use serde::{Deserialize, Serialize};

use crate::models::journal_action::JournalAction;
use crate::models::journal_entry::JournalEntry;
use crate::models::tag::Tag;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Journal {
    pub entry: JournalEntry,
    pub tags: Vec<Tag>,
    pub actions: Vec<JournalAction>,
}

