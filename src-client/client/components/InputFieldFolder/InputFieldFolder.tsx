import { Dispatch, SetStateAction } from 'react';
import { open } from '@tauri-apps/api/dialog';
import '../../global CSS/OneLineInput.css'

interface SelectFolderProps {
  savePath : string,
  setSavePath: Dispatch<SetStateAction<string>>;
}
export default function InputFieldFolder({savePath, setSavePath} : SelectFolderProps) {
  async function selectFolder() {
    const path: string | null = await open({
      directory: true,
      multiple: false,
    }) as string | null;

    if (path) {
      // Should never be string[] due to multiple: false
      setSavePath(path);

    }
  }

  return (
    <input className={'one-line-input'}
           onFocus={selectFolder}
           value={savePath}
           onChange={e => setSavePath(e.target.value)}

    />
  )
}