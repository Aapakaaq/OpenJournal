import {JournalModel} from "../models/JournalModel";
import {JSONArray} from "../../Shared/types/Json";

export interface IJournalService {
  saveJournalJONString(jsonString: string): JournalModel;
  getAllJournalsFromDirectory(pathToDirectory: string): JournalModel[];
}
