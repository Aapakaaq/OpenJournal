use rusqlite::Row;
use rusqlite::types::ValueRef;
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

// TODO: Consider creating a macro to get the field names of the structs and
// use that to create the SQL statements
impl Journal {

    // TODO: Improve this
    pub fn is_valid(&self) -> bool {
        if (self.entry.content.trim().is_empty()) {
            return false;
        }

        true
    }
    /// Note: This function is tightly coupled to the table definition and column names
    pub fn create_from_row(row: &Row) -> Result<Journal, Box<dyn std::error::Error>> {
        let column_name = "entry_created_at";
        let created_at_value: ValueRef = row.get_ref(2)?;
        println!("{:?}", created_at_value);
        //  let created_at= value_ref_to_datetime(created_at_value, column_name)?;

        let entry = JournalEntry {
            id: row.get::<_, Option<i32>>(0)?,
            content: row.get::<_, String>(1)?,
            created_at: row.get::<_, String>(2)?,
        };

        let tag = Tag {
            id: row.get::<_, Option<i32>>(3)?,
            name: row.get::<_, String>(4)?,
        };

        let due_date_value = row.get_ref(7)?;
        //  let due_date: Option<DateTime<Local>> = Some(value_ref_to_datetime(due_date_value, "action_due_date")?);
        let completed_at_value = row.get_ref(9)?;
        //    let completed_at: Option<DateTime<Local>> = Some(value_ref_to_datetime(completed_at_value,
//                                                                                     "action_completed_at")?);

        let action = JournalAction {
            id: row.get::<_, Option<i32>>(5)?,
            entry_id: row.get::<_, i32>(0)?,
            description: row.get::<_, String>(6)?,
            due_date: row.get::<_, Option<String>>(7)?,
            completed: row.get::<_, bool>(8)?,
            completed_at: row.get::<_, Option<String>>(9)?,
        };

        Ok(Journal {
            entry: entry,
            tags: vec![tag],
            actions: vec![action],
        })
    }
}