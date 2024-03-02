import {IFileSystemDataAccess} from "../dataAccess/IFileSystemDataAccess";

export class JsonFileReaderService implements IFileReader<string>{
  private fileSystemDataAccess: IFileSystemDataAccess;

  constructor(fileSystemDataAccess: IFileSystemDataAccess) {
    this.fileSystemDataAccess = fileSystemDataAccess;
  }
  public async readFilesFromDirectoryAsync(path: string): Promise<string[]> {
    const allowRelativePath: boolean = true;
    if (!this.fileSystemDataAccess.isValidPath(path, allowRelativePath)){
      throw new Error(`Invalid path, ${path}`);
    }

    if (!this.fileSystemDataAccess.doesDirectoryExist(path)){
      // Consider other return type to ask if the app should create a folder
      // at destination.
      throw new Error(`Not directory found at ${path}`);
    }

    try {
      const fileNames: string[] = await this.fileSystemDataAccess.getFilesAsync(path);

      const jsonFiles: string[] = fileNames.filter(fileName => fileName.endsWith('.json'));

      const fileContentsPromises: Promise<string>[] = jsonFiles.map(fileName => this.fileSystemDataAccess.readFileAsync(`${path}/${fileName}`));

      return await Promise.all(fileContentsPromises);
    } catch (error){
      // TODO: Better error handling
      throw new Error(`Error getting files in directory ${path}`);
    }
  }
}
