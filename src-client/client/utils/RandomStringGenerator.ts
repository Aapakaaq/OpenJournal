
export function generateRandomStringWithNumbers(length: number): string {
  let randomString: string = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charStringLength: number = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charStringLength);
    randomString += characters[randomIndex]
  }

  return randomString;
}