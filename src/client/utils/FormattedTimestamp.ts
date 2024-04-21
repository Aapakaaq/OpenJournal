/// Creates a timestamp with the format
// hours:minutes day month year. 24-hour format
export function getFormattedTimestamp(): string {
  const date: Date = new Date();
  const hours24: string = String(date.getHours()).padStart(2, '0');
  const minutes: string = String(date.getMinutes()).padStart(2, '0');
  const day: string = String(date.getDate()).padStart(2, '0');
  const month: string = String(date.getMonth() + 1).padStart(2, '0');
  const year: number = date.getFullYear();

  return `${hours24}:${minutes} ${day} ${month} ${year}`;
}