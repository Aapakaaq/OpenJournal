import { useCallback, useRef } from "react";
import { IJournal } from "../types/Journal";
import { JournalComponentEntity, JournalComponent } from "../types/JournalComponent";
import { SetWithContentEquality } from "../utils/SetWithContentEquality";
import { useCache } from "./useCache";



const initialState: IJournal = {
    id: 0,
    componentSet: new SetWithContentEquality<JournalComponentEntity, JournalComponent>
        (component => component.type),
}

const storageKey: string = 'journal';

export function useJournal(initialJournal: IJournal = initialState){
    const[journal, setJournal] = useCache<IJournal>(storageKey, initialState);

    const reset = useCallback(() => {
            setJournal(initialJournal)
    }, [initialJournal])


    return {
        journal,
        setJournal,
        reset,
    }
}
