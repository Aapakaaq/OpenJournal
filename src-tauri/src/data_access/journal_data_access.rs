use std::rc::Rc;
use rusqlite::{CachedStatement, Connection, params, Savepoint, Statement};
use rusqlite::types::Value;
use crate::dtos::journal_dto::{JournalActionDTO, JournalDTO};

use crate::models::journal::Journal;
use crate::models::journal_action::JournalAction;
use crate::models::journal_entry::JournalEntry;
use crate::models::tag::Tag;

pub fn add_journal(conn: &mut Connection, journal: &JournalDTO) -> Result<i64, ()> {

    let save_point: Savepoint = conn.savepoint().unwrap();

    let journal_id: i64 = add_entry(&save_point, &journal.content).unwrap();
    let tag_ids: Vec<usize> = add_tags(&save_point, &journal.tags).unwrap();
    add_entry_tags(&save_point, &journal_id, &tag_ids).unwrap();
    add_actions(&save_point, &journal.actions, journal_id).unwrap();

    save_point.commit().unwrap();

    Ok(journal_id)
}

pub fn get_by_tag_names(conn: &mut Connection, tag_names: &Vec<String>) -> Result<Option<Vec<Journal>>, ()> {
    let mut journals: Vec<Journal> = Vec::new();

    rusqlite::vtab::array::load_module(&conn).expect("Failed to load array module");
    let mut get_by_tag_names_statement: Statement = conn.prepare(
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
            WHERE t.name IN (SELECT * FROM rarray(?))
        ").expect("Failed to prepare statement");

    let tag_values: Rc<Vec<Value>> = Rc::new(tag_names.iter().clone()
        .map(|tag_name| Value::Text(tag_name.to_string())).collect());

    let mut rows = get_by_tag_names_statement.query_map(
       [tag_values], |row| {
        Ok(Journal::create_from_row(&row).unwrap())
    }).unwrap();

    for journal in rows {
        journals.push(journal.unwrap());
    }

    Ok(Some(journals))
}

pub fn get_all_journals(conn: &mut Connection) -> Result<Option<Vec<Journal>>, ()> {
    let mut journals: Vec<Journal> = Vec::new();
    let mut all_journals_statement: Statement = conn.prepare(
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
        ").expect("Failed to prepare statement");

    let mut rows = all_journals_statement.query_map([], |row| {
        Ok(Journal::create_from_row(&row).unwrap())
    }).unwrap();

    for journal in rows {
        journals.push(journal.unwrap());
    }

    Ok(Some(journals))
}

fn add_tags(save_point: &Savepoint, tags: &Vec<String>) -> Result<Vec<usize>, ()> {
    let mut ids: Vec<usize> = Vec::new();
    for tag in tags {
        let id: usize = save_point.execute(
            "INSERT INTO tags (name) VALUES (?)",
            params![&tag],
        ).expect("Failed to insert tag");

        ids.push(id);
    }

    Ok(ids)
}

fn add_entry_tags(save_point: &Savepoint, entry_id: &i64, tags_id: &Vec<usize>) -> Result<(), ()> {
    let mut cached_statement: CachedStatement =
        save_point.prepare_cached("INSERT INTO entry_tags (entry_id, tag_id) VALUES (?, ?)")
            .expect("Failed to prepare statement");

    for tag_id in tags_id {
        cached_statement.execute(params![&entry_id, &tag_id])
            .expect("Failed to insert entry_tag");
    }

    Ok(())
}

fn add_actions(save_point: &Savepoint, actions: &Vec<JournalActionDTO>, journal_id: i64) -> Result<(), ()> {
    let mut cached_statement: CachedStatement =
        save_point.prepare_cached("INSERT INTO actions \
                                    (entry_id, description, due_date, completed, completed_at) \
                                    VALUES (?, ?, ?, ?, ?)").expect("Failed to prepare statement");

    for action in actions {
        let due_date = match &action.due_date {
            Some(date) => date.to_string(),
            None => "".to_string(),
        };
        let is_completed: bool = false;
        let completed_at: String = "".to_string();

        cached_statement.execute(
            rusqlite::params![
                &journal_id,
                &action.description,
                due_date,
                &is_completed,
                completed_at]
        ).expect("Failed to insert action");
    }

    Ok(())
}

fn add_entry(save_point: &Savepoint, content: &str) -> Result<i64, ()> {
    save_point.execute(
        "INSERT INTO entries (content) VALUES (?)",
        params![&content],
    ).expect("Failed to insert entry");

    Ok(save_point.last_insert_rowid())
}
