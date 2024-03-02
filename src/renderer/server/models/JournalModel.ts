import {JournalComponentType} from "../../Shared/types/JournalComponent";
import {JSONObject} from "../../Shared/types/Json";

export interface JournalModel {
  filePath: string;
  metaData: Map<string, JSONObject>;
  // For unknown fields
  components: Map<JournalComponentType, JSONObject>;
}
