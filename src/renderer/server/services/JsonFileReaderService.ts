import {inject, injectable } from "inversify";
import {IFileSystemDataAccess} from "../dataAccess/IFileSystemDataAccess";
import {TYPES} from "../../Shared/types/types";
import {JSONObject, JSONValue} from "../../Shared/types/Json";

@injectable()
export class JsonFileReaderService implements IFileReader<JSONObject>{
  private fileSystemDataAccess: IFileSystemDataAccess;

  constructor(
    @inject(TYPES.IFileSystemDataAccess) fileSystemDataAccess: IFileSystemDataAccess) {
    this.fileSystemDataAccess = fileSystemDataAccess;
  }
  public async readFilesFromDirectoryAsync(path: string): Promise<JSONObject[]> {
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

      const fileContentsPromises: Promise<string>[] = jsonFiles.map(fileName =>
        this.fileSystemDataAccess.readFileAsync(`${path}/${fileName}`));

      const fileContents: string[] = await Promise.all(fileContentsPromises);
      const contentAsJSONObjects: JSONObject[] =  fileContents.map(content =>
        this.parseStringToJSONObject(content));

      return contentAsJSONObjects;

    } catch (error){
      // TODO: Better error handling
      throw new Error(`Error getting files in directory ${path}`);
    }
  }


  private parseStringToJSONObject(jsonString: string): JSONObject {
    try {
      const parsedObject: JSONValue = JSON.parse(jsonString);

      if (typeof parsedObject === 'object' && parsedObject !== null && !Array.isArray(parsedObject)) {
        return parsedObject as JSONObject;
      } else {
        throw new Error('Invalid JSON format: Expected an object.');
      }
    } catch (error) {
      throw new Error(`Error parsing JSON: ${error}`);

    }
  }

}
