mod test_helpers;

use std::string::ToString;
use chrono::{Utc};
use rusqlite::Connection;

use SqlTest::data_access::journal_data_access::{add_journal, get_by_tag_names};

use SqlTest::models::journal::Journal;
use SqlTest::models::journal_action::JournalAction;
use SqlTest::models::journal_entry::JournalEntry;
use SqlTest::models::tag::Tag;
use crate::test_helpers::test_helpers::{prepare_test_db};

#[test]
fn get_by_tag_names_should_get_valid_tags(){
    // Arrange
    let expected_amount: usize = 2;

    let tag_1: String = "Mario".to_string();
    let tag_2: String = "Not mario".to_string();
    let tag_3: String = "Bowser".to_string();

    let tags_to_search : Vec<String> = vec![tag_1.clone(), tag_2.clone()];
    let mut conn: Connection = prepare_test_db().expect("Failed to prepare test database");

    let fake_journal_tag_1 = Journal {
        entry: JournalEntry {
            id: Some(1),
            content: "Test content".to_string(),
            created_at: Utc::now().to_string()
        },
        tags: vec![Tag { id: Some(1), name: tag_1.clone() }],
        actions: vec![JournalAction {
            id: Some(1),
            entry_id: 1,
            description: "Test action".to_string(),
            due_date: Some(Utc::now().to_string()),
            completed: false,
            completed_at: None,
        }],
    };

    let fake_journal_tag_2_3 = Journal {
        entry: JournalEntry {
            id: Some(2),
            content: "Test content".to_string(),
            created_at: Utc::now().to_string()
        },
        tags: vec![Tag { id: Some(2), name: tag_2.clone() }, Tag { id: Some(3),
            name: tag_3.clone() }],
        actions: vec![JournalAction {
            id: Some(2),
            entry_id: 2,
            description: "Test action".to_string(),
            due_date: Some(Utc::now().to_string()),
            completed: false,
            completed_at: None,
        }],
    };

    let fake_journal_tag_3 = Journal {
        entry: JournalEntry {
            id: Some(3),
            content: "Test content".to_string(),
            created_at: Utc::now().to_string()
        },
        tags: vec![Tag { id: Some(3), name: tag_3.clone() }],
        actions: vec![JournalAction {
            id: Some(3),
            entry_id: 3,
            description: "Test action".to_string(),
            due_date: Some(Utc::now().to_string()),
            completed: false,
            completed_at: None,
        }],
    };

    add_journal(&mut conn, &fake_journal_tag_1).unwrap();
    add_journal(&mut conn, &fake_journal_tag_2_3).unwrap();
    add_journal(&mut conn, &fake_journal_tag_3).unwrap();

    // Act
    let actual_result: Option<Vec<Journal>> = get_by_tag_names(&mut conn, &tags_to_search).unwrap();

    // Assert
    let actual_amount_of_rows: usize = actual_result.as_ref().unwrap().len();

    assert_eq!(actual_amount_of_rows, expected_amount);

    // Assert
    for journal in actual_result.unwrap() {
        let has_tag = journal.tags.iter().any(|tag| tags_to_search.contains(&tag.name));
        assert!(has_tag, "Journal does not have any of the searched tags: {:?}", journal);
    }
}

#[test]
fn add_journal_should_add_journal_to_database() {
    // Arrange
    struct Occurrence {
        entry_count: i32,
        tag_count: i32,
        entry_tag_count: i32,
        action_count: i32,
    }

    let expected_amount: usize = 1;
    let expected_count: usize = 1;

    let mut conn = prepare_test_db().expect("Failed to prepare test database");

    let fake_journal = Journal {
        entry: JournalEntry {
            id: Some(1),
            content: "Test content".to_string(),
            created_at: Utc::now().to_string()
        },

        tags: vec![Tag { id: Some(1), name: "Test tag".to_string() }],
        actions: vec![JournalAction {
            id: Some(1),
            entry_id: 1,
            description: "Test action".to_string(),
            due_date: Some(Utc::now().to_string()),
            completed: false,
            completed_at: None,
        }],
    };

    // Act
    let result = add_journal(&mut conn, &fake_journal);
    let mut amount_of_enries = conn.prepare("
    SELECT
        (SELECT COUNT(*) FROM entries) AS entry_count,
        (SELECT COUNT(*) FROM tags) AS tag_count,
        (SELECT COUNT(*) FROM entry_tags) AS entry_tag_count,
        (SELECT COUNT(*) FROM actions) AS action_count
    ").unwrap();

    let mut occurences = amount_of_enries.query_map([], |row| {
        Ok(Occurrence {
            entry_count: row.get(0)?,
            tag_count: row.get(1)?,
            entry_tag_count: row.get(2)?,
            action_count: row.get(3)?,
        })
    }).unwrap();

    // Assert
    assert!(result.is_ok());
    let amount_of_rows = occurences.by_ref().count();

    assert_eq!(amount_of_rows, expected_amount);

    for occurences in occurences {
        let occurence = occurences.unwrap();

        assert_eq!(occurence.entry_count, expected_count as i32);
        assert_eq!(occurence.tag_count, expected_count as i32);
        assert_eq!(occurence.entry_tag_count, expected_count as i32);
        assert_eq!(occurence.action_count, expected_count as i32);
    }

    // Clean-up
}