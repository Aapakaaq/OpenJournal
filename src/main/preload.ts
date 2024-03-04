// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import {SAVE_JOURNAL_DISK} from "./Processes/ProcessTypes";

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    async saveJournal( jsonString: string): Promise<boolean> {

      console.log(`From preload: ${jsonString}`);
      return await ipcRenderer.invoke(SAVE_JOURNAL_DISK, jsonString);
    }
  },
  JournalService: {


  }

};

const serviceProcesses = {

}

contextBridge.exposeInMainWorld('electron', electronHandler);


export type ElectronHandler = typeof electronHandler;
