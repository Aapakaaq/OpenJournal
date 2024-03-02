import { JournalModel } from "../models/JournalModel";
import {IJournalService} from "./IJournalService";
import {IFileWriter} from "./IFileWriter";
import {TYPES} from "../../Shared/types/types";
import { inject } from "inversify";
import {JSONObject} from "../../Shared/types/Json";

export class JournalService implements IJournalService {
  private fileWriter: IFileWriter;
  private fileReader: IFileReader<JSONObject>

  constructor(
    @inject(TYPES.IFileWriter) fileWriter: IFileWriter,
    @inject(TYPES.IFileReader) fileReader: IFileReader<JSONObject>) {
    this.fileWriter = fileWriter;
    this.fileReader = fileReader;
  }

  saveJournalJONString(jsonString: string): JournalModel {

      throw new Error("Method not implemented.");
  }
  getAllJournalsFromDirectory(pathToDirectory: string): JournalModel[] {
        throw new Error("Method not implemented.");
    }

}
