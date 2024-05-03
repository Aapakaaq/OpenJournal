export function FormatDate(dateString : string): string {
  const [year, month, day] = dateString.split('-');
  let newDate = `${day}/${month}/${year}`;
  return newDate;
};
