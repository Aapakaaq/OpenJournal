export interface IFileWriter {
  writeFile(path: string, content: string): Promise<boolean>;
}
