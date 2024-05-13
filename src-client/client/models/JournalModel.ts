import {JSONObject} from "../types/Json.ts";

export type JournalAction = {
  description: string,
  completed: boolean,
  reflection?: string
}

export type JournalModel = {
  content: string,
  tags: string[],
  actions: JournalAction[],
  createdAt?: string
}

// TODO: validation check
export function journalMapToModel(jsonObject: JSONObject): JournalModel {
  const tags: string[] = jsonObject['tags'] as string[];
  const textContent: string = jsonObject['content'] as string;
  const createdAt: string = jsonObject['createdAt'] as string;
  const actions: JournalAction[] | null  = jsonObject['actions'] as JournalAction[];

  const journalModel: JournalModel = {
    tags: tags,
    content: textContent,
    actions: actions,
    createdAt: createdAt
  };

  return journalModel;
}
