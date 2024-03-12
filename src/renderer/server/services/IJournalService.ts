import {JournalModel} from "../../Shared/models/JournalModel";

export interface IJournalService {
  saveJournalJONString(jsonString: string): Promise<boolean>;

  getAllJournalsFromDirectory(pathToDirectory: string): Promise<JournalModel[]>;
}
