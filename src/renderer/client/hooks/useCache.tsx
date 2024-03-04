import {Dispatch, SetStateAction, useEffect, useState} from 'react';

export function useCache<T>(storageKey: NonNullable<string>,
                            fallbackState: T): [T, Dispatch<SetStateAction<T>>] {

  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(storageKey);
    return storedValue ? JSON.parse(storedValue) : fallbackState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
}
