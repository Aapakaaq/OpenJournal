import {JournalModel, JournalMapToModel} from "../../Shared/models/JournalModel";
import {IJournalService} from "./IJournalService";
import {IFileWriter} from "./IFileWriter";
import {ServiceTypes} from "../ServiceTypes";
import { inject, injectable } from "inversify";
import {JSONObject, JSONValue} from "../../Shared/types/Json";
import {JournalComponentType} from "../../Shared/types/JournalComponent";

@injectable()
export class JournalService implements IJournalService {
  private fileWriter: IFileWriter;
  private fileReader: IFileReader<JSONObject>

  constructor(
    @inject(ServiceTypes.IFileWriter) fileWriter: IFileWriter,
    @inject(ServiceTypes.IFileReader) fileReader: IFileReader<JSONObject>) {
    this.fileWriter = fileWriter;
    this.fileReader = fileReader;
  }

  public async saveJournalJONString(jsonString: string): Promise<boolean> {
    if (!jsonString || jsonString.trim() === '') {
      throw new Error('JSON string is null or empty');
    }

    // TODO: Need to validate json
    const {filePath, metaData, components } = JSON.parse(jsonString) as JournalModel;
    if (!filePath || filePath.trim() === ""){
      throw new Error('Missing path in journal');
    }

    const dataToSave = { metaData, components};
    const stringyfiedData: string = JSON.stringify(dataToSave);
    const isWritten: boolean = await this.fileWriter.writeFile(filePath, stringyfiedData);

    // TODO: Better error handling and return
    return isWritten;
  }
  public async getAllJournalsFromDirectory(pathToDirectory: string): Promise<JournalModel[]> {
    if (!pathToDirectory || pathToDirectory.trim() === '') {
      throw new Error('JSON string is null or empty');
    }
    // TODO: Error handling
    const fileContents: JSONObject[] = await this.fileReader.readFilesFromDirectoryAsync(pathToDirectory);
    const journalModels: JournalModel[] = fileContents.map(content => JournalMapToModel(content))

    return journalModels;
    }
}
