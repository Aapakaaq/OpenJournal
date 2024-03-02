interface IFileReader<T> {
  readFilesFromDirectoryAsync(path: string): Promise<T[]>;
}
