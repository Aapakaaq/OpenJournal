pub mod test_helpers {
    use rusqlite::{Connection};
    use SqlTest::data_access::initialize_database::create_tables;

    pub fn prepare_test_db() -> Result<Connection,()>{
        let mut conn = Connection::open_in_memory().expect("Failed to create in-memory database");
        create_tables(&mut conn).expect("Failed to create tables");
        Ok(conn)
    }

    pub fn clear_test_db(conn: &Connection) -> Result<(),()>{
        conn.execute("DELETE FROM entries", [])
            .expect("Error clearing entries");
        conn.execute("DELETE FROM tags", [])
            .expect("Error clearing tags");
        conn.execute("DELETE FROM entry_tags", [])
            .expect("Error clearing entry_tags");
        conn.execute("DELETE FROM actions", [])
            .expect("Error clearing actions");

        Ok(())
    }
}