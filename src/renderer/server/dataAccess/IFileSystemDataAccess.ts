import {ReadFileCallback} from "../../Shared/types/ReadFileCallback";
import * as fs from 'fs';

// For improving testability
export interface IFileSystemDataAccess {
  readFileAsync(filePath: string): Promise<string>;

  getExtensionName(fileName: string): string

  writeFileAsync(filePath: string, content: string, options: fs.WriteFileOptions): Promise<boolean>;

  isValidPath(pathToValidate: string, allowRelativePath: boolean): boolean;

  doesDirectoryExist(path: string): boolean;

  isPathRooted(path: string): boolean;

  getFilesAsync(pathToDirectory: string): Promise<string[]>;

  getDirectories(path: string): readonly string[];

}
