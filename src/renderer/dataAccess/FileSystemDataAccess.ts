import {IFileSystemDataAccess} from './IFileSystemDataAccess';
import * as fs from 'fs';
import { injectable } from 'inversify';
import * as path from 'path';


@injectable()
export class FileSystemDataAccess implements IFileSystemDataAccess{
    public async readFileAsync(filePath: string): Promise<string> {
    try {
      filePath = path.resolve(filePath);

      if(!fs.existsSync(filePath)) {
        throw new Error(`No file found in path ${filePath}`);
      }

      return await fs.promises.readFile(filePath, 'utf-8'); // Return file content as a string
    } catch (error) {
      throw new Error (`Error reading file ${error}`);
    }
  }

  public getExtensionName(fileName: string): string {
      return path.extname(fileName);
  }

  // TODO: Needs rework
  public async writeFileAsync(filePath: string, content: string, options: fs.WriteFileOptions): Promise<boolean> {
    try {
      await fs.promises.writeFile(filePath, content, options);
      return true;
    } catch (error) {
      throw error;
    }
  }
  public isValidPath(pathToValidate: string, allowRelativePath: boolean): boolean {
    const maxPathLengthWindows: number = 260;
    if (process.platform === 'win32' && pathToValidate.length > maxPathLengthWindows) {
      return false;
    }

    if (!allowRelativePath) {
      return path.isAbsolute(pathToValidate);
    }

    return path.basename((pathToValidate)) !== undefined;


  }

  public doesDirectoryExist(path: string): boolean {
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }

  public isPathRooted(path: string): boolean {
    return path.startsWith('/');
  }

  public async getFilesAsync(pathToDirectory: string): Promise<string[]> {
    try {
      return await fs.promises.readdir(pathToDirectory);
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  }

  public getDirectories(path: string): readonly string[] {
    if (!this.doesDirectoryExist(path)) {
      throw new Error(`Directory ${path} does not exist.`);
    }
    return fs.readdirSync(path).filter(item => fs.lstatSync(item).isDirectory());
  }
}
