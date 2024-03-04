import {JournalModel} from "../../Shared/models/JournalModel";
import {JSONArray} from "../../Shared/types/Json";

export interface IJournalService {
  saveJournalJONString(jsonString: string): Promise<boolean>;
  getAllJournalsFromDirectory(pathToDirectory: string): Promise<JournalModel[]>;
}
