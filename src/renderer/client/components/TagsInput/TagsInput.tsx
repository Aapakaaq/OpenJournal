import {ChangeEvent, useState } from "react";
import "./TagsInput.css"
import {useJournal} from "../../contexts/JournalContext";

export default function TagsInput() {
  const {updateMetaData} = useJournal()
  const fieldKey: string = 'tags';

  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const tagSeperationKey: string = ',';
  const placeHolderText: string = 'Enter a tag';

  // @ts-ignore
  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const {key} = event;
    const trimmedInput = input.trim();

    if (key === tagSeperationKey && trimmedInput.length && !tags.includes(trimmedInput)) {
      event.preventDefault();
      const newValue = [...tags, trimmedInput];
      setTags(prevState => newValue);
      setInput('');
      updateMetaData(fieldKey, newValue);
    }

    // isKeyReleased prevents unwanted deletes when holding down Backspace
    const isInputEmptyAndTagsPresent: boolean = input.length== 0 && tags.length > 0;
    if (key === "Backspace" && isInputEmptyAndTagsPresent && isKeyReleased) {
      event.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      // @ts-ignore
      setInput(poppedTag);
      setIsKeyReleased(false);
      updateMetaData(fieldKey, tagsCopy);
    }
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const value  = event.target.value;
    setInput(value);
  }

  function onKeyUpHandler(): void {
    setIsKeyReleased(true);
  }

  function deleteTag(index: number): void {
    const filteredTags: string[] = tags.filter((tag: string, i: number): boolean =>
      i !== index);
    setTags(filteredTags);

    updateMetaData(fieldKey, filteredTags);
  }

  function onFocusHandler(event: FocusEvent<HTMLInputElement>): void{
    event.target.placeholder = ""
  }

  function onBlurHandler(event: FocusEvent<HTMLInputElement>): void{
    event.target.placeholder = placeHolderText;
  }

  return (
    <div className={"tags-container"}>
      {tags.map(createTags)}
      <input
        className={"tags-input"}
        value={input}
        placeholder={placeHolderText}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
      />
    </div>
  );

  function createTags(tag: string, index: number) {
    if (tag === '') return;
    return (
      <div className="tag">
        {tag}
      <button onClick={() => deleteTag(index)}>x</button>
    </div>
    );
  }
}
