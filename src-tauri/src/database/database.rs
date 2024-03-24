use rusqlite::Connection;

pub trait Database {
    fn new(database_path: String) -> Self;
    fn create_connection(&self) -> Result<Connection, rusqlite::Error>;
}

#[derive(Debug)]
pub struct SqliteDB {
    database_path: String,
}

impl Database for SqliteDB{
    fn new(database_path: String) -> Self {
        Self {
            database_path: database_path.into(),
        }
    }

    /// Creates a new SqliteHandler with array module loaded
    fn create_connection(&self) -> Result<Connection, rusqlite::Error> {
        let conn = Connection::open(&self.database_path).unwrap();
        rusqlite::vtab::array::load_module(&conn).expect("Failed to load array module");
        Ok(conn)
    }
}
