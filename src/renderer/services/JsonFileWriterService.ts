import {IFileWriter} from "./IFileWriter";
import {IFileSystemDataAccess} from "../dataAccess/IFileSystemDataAccess";

export class JsonFileWriterService  {
    private fileSystemDataAccess : IFileSystemDataAccess;
    constructor(fileSystemDataAccess: IFileSystemDataAccess) {
      this.fileSystemDataAccess = fileSystemDataAccess;
    }
    public writeFile(path: string, content: string): void {
      const allowRelativePath: boolean = true;
      if (!this.fileSystemDataAccess.isValidPath(path, allowRelativePath)){
        throw new Error(`Invalid path ${path}`);
      }

      if (!this.fileSystemDataAccess.doesDirectoryExist(path)){
        throw new Error(`Directory does not exists ${path}`);
      }

      const space: number = 2;
      const replacer = null;
      const jsonContent = JSON.stringify(content,  replacer, space);

      //this.fileSystemDataAccess.writeFileAsync(path, jsonContent, { encoding: 'utf8', flag: 'w' } ,this.writeFileCallback)


    }

  writeFileCallback(err: NodeJS.ErrnoException | null): void {
    if (err) {
      // TODO
      console.error('Error writing file:', err);
    } else {

      console.log('File written successfully.');
    }
  }
}
