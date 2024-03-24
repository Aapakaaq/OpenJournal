use chrono::{DateTime, FixedOffset, Timelike};
use rusqlite::types::ValueRef;

const DATETIME_FORMAT: &str = "%Y-%m-%d %H:%M:%S";

// TODO: Fix
pub fn value_ref_to_datetime(value: ValueRef, column_name: &str) -> Result<DateTime<FixedOffset>, Box<dyn std::error::Error>> {
    match value {
        ValueRef::Text(date) => {
            let date_as_string = std::str::from_utf8(date)?;
            println!("Date as string: {}", date_as_string);

            let date_without_fractional_seconds = date_as_string.split('.')
                .next().unwrap_or(date_as_string);
            println!("Without nano seconds {}", date_without_fractional_seconds);
            let parsed_datetime = DateTime::parse_from_str(date_without_fractional_seconds,
                                                           DATETIME_FORMAT)
                .expect("Failed to parse date")
                .with_nanosecond(0)
                .expect("Failed to set nanoseconds");
            Ok(parsed_datetime)
        }
        _ => Err(format!("Unexpected type for {}", column_name).into()),
    }
}