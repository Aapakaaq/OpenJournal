import { ipcMain } from 'electron';
import {IJournalService} from "../../renderer/server/services/IJournalService";
import {serviceCollection} from "../../renderer/inversify.config";
import {ServiceTypes} from "../../renderer/server/ServiceTypes";
import {SAVE_JOURNAL_DISK, SAVE_JOURNAL_DISK_RESPONSE} from "./ProcessTypes";


const journalService: IJournalService = serviceCollection.get<IJournalService>(ServiceTypes.IJournalService);
ipcMain.handle(SAVE_JOURNAL_DISK, async (_, jsonString) => {
  console.log(`From main: ${jsonString}`);
  if (!jsonString){
    return;
  }

  const isWritten: boolean = await journalService.saveJournalJONString(jsonString);
  return isWritten;
})