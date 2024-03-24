use chrono::{TimeZone, Utc};
use SqlTest::data_access::journal_data_access::add_journal;
use SqlTest::models::journal::Journal;
use SqlTest::models::journal_action::JournalAction;
use SqlTest::models::journal_entry::JournalEntry;
use SqlTest::models::tag::Tag;
use crate::test_helpers::test_helpers::{ prepare_test_db};

mod test_helpers;

#[test]
fn create_from_row_should_create_journal() {
// Arrange
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

    add_journal(&mut conn,  &fake_journal).unwrap();

    let mut journal_statement = conn.prepare(
        "SELECT
                e.id AS entry_id,
                e.content AS entry_content,
                e.created_at AS entry_created_at,
                t.id AS tag_id,
                t.name AS tag_name,
                a.id AS action_id,
                a.description AS action_description,
                a.due_date AS action_due_date,
                a.completed AS action_completed,
                a.completed_at AS action_completed_at
            FROM
                entries e
                    LEFT JOIN
                entry_tags et ON e.id = et.entry_id
                    LEFT JOIN
                tags t ON et.tag_id = t.id
                    LEFT JOIN
                actions a ON e.id = a.entry_id
    ").unwrap();
    let expected_amount = 1;
    // Act
    let mut rows = journal_statement.query_map([], |row| {
        Ok(Journal::create_from_row(&row).unwrap())
    }).unwrap();

    let amount_of_rows = rows.by_ref().count();

    // Assert
    print!("Amount of rows: {}", amount_of_rows);
    assert_eq!(amount_of_rows, expected_amount);
    for row in rows {
        let row = row.unwrap();
        assert_eq!(row.entry.id, fake_journal.entry.id);
        assert_eq!(row.entry.content, fake_journal.entry.content);
        assert_eq!(row.entry.created_at, fake_journal.entry.created_at);

        assert_eq!(row.tags[0].id, fake_journal.tags[0].id);
        assert_eq!(row.tags[0].name, fake_journal.tags[0].name);

        assert_eq!(row.actions[0].id, fake_journal.actions[0].id);
        assert_eq!(row.actions[0].entry_id, fake_journal.actions[0].entry_id);
        assert_eq!(row.actions[0].description, fake_journal.actions[0].description);
        assert_eq!(row.actions[0].due_date, fake_journal.actions[0].due_date);
        assert_eq!(row.actions[0].completed, fake_journal.actions[0].completed);
        assert_eq!(row.actions[0].completed_at, fake_journal.actions[0].completed_at);
    }

}