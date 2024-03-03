import { JournalModel } from "../models/JournalModel";
import {IJournalService} from "./IJournalService";
import {IFileWriter} from "./IFileWriter";
import {ServiceTypes} from "../ServiceTypes";
import { inject, injectable } from "inversify";
import {JSONObject, JSONValue} from "../../Shared/types/Json";

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
    const stringyfiedData = JSON.stringify(dataToSave);
    const isWritten = await this.fileWriter.writeFile(filePath, stringyfiedData);

    // TODO: Better error handling and return
    return isWritten;
  }
  getAllJournalsFromDirectory(pathToDirectory: string): Promise<JournalModel[]> {
        throw new Error("Method not implemented.");
    }


}
