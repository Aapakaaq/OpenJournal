import {IFileWriter} from "./IFileWriter";
import {IFileSystemDataAccess} from "../dataAccess/IFileSystemDataAccess";
import {inject, injectable } from "inversify";
import {ServiceTypes} from "../ServiceTypes";

// TODO: How to handle already existing files?
@injectable()
export class JsonFileWriterService implements  IFileWriter {
    private fileSystemDataAccess : IFileSystemDataAccess;
    constructor(
      @inject(ServiceTypes.IFileSystemDataAccess) fileSystemDataAccess: IFileSystemDataAccess) {
      this.fileSystemDataAccess = fileSystemDataAccess;
    }
    public async writeFile(path: string, content: string): Promise<boolean> {
      const allowRelativePath: boolean = true;
      if (!this.fileSystemDataAccess.isValidPath(path, allowRelativePath)){
        throw new Error(`Invalid path ${path}`);
      }

      const space: number = 2;
      const replacer = null;
      const jsonObject = JSON.parse(content);
      const formattedJsonString: string = JSON.stringify(jsonObject,  replacer, space);

      const hasWritten: boolean = await this.fileSystemDataAccess.writeFileAsync(path, formattedJsonString,
        { encoding: 'utf8', flag: 'w' });
      return hasWritten;
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
