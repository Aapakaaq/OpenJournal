use rusqlite::{Connection, Result, Savepoint};

const ENTRIES_TABLE: &str = "
    CREATE TABLE entries (
        id INTEGER PRIMARY KEY,
        content TEXT NOT NULL,
        created_at DATETIME NOT NULL
    )";

const TAGS_TABLE: &str = "
    CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL
    )";

const ENTRY_TAGS_TABLE: &str =
    "CREATE TABLE IF NOT EXISTS entry_tags (
                entry_id INTEGER,
                tag_id INTEGER NOT NULL,
                FOREIGN KEY (entry_id) REFERENCES entries(id),
                FOREIGN KEY (tag_id) REFERENCES tags(id),
                PRIMARY KEY (entry_id, tag_id)
         );";

const ACTIONS_TABLE: &str =
    "CREATE TABLE IF NOT EXISTS actions (
                id INTEGER PRIMARY KEY,
                entry_id INTEGER NOT NULL,
                description TEXT NOT NULL,
                due_date DATETIME,
                completed BOOLEAN DEFAULT 0,
                completed_at DATETIME,
                FOREIGN KEY (entry_id) REFERENCES entries(id)
        )";

const REFLECTION_TABLE: &str =
    "CREATE TABLE IF NOT EXISTS reflections (
                id INTEGER PRIMARY KEY,
                action_id INTEGER,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (action_id) REFERENCES actions(id)
        )";

pub fn create_tables(conn: &mut Connection) -> Result<(), ()> {
    let save_point = conn.savepoint().unwrap();

    execute_sql(&save_point, ENTRIES_TABLE, "entries table executed")
        .expect("Failed to create entries table");
    execute_sql(&save_point, TAGS_TABLE, "tags table executed")
        .expect("Failed to create tags table");
    execute_sql(&save_point, ENTRY_TAGS_TABLE, "entries_tags table executed")
        .expect("Failed to create entry_tags table");
    execute_sql(&save_point, ACTIONS_TABLE, "actions table executed")
        .expect("Failed to create actions table");
    execute_sql(&save_point, REFLECTION_TABLE, "reflection table executed")
        .expect("Failed to create reflection table");

    save_point.commit().expect("Failed to commit savepoint");
    Ok(())
}

fn execute_sql(savepoint: &Savepoint, query: &str, message: &str) -> Result<()> {
    match &savepoint.execute(query, []) {
        Ok(_) => println!("{}", message),
        Err(e) => println!("Error: {}", e),
    }
    Ok(())
}