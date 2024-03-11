import {ChangeEvent, useEffect, useState} from "react";
import "./TagsInput.css"
import {useJournal} from "../../contexts/JournalContext";

export default function TagsInput() {
  const {updateMetaData, journalEntry} = useJournal()
  const fieldKey: string = 'tags';
  let tags: string[] = [];

  useEffect(() => {
    console.log("TagsInput mounted");
    if (!journalEntry.metaData[fieldKey]) {
      console.log(`adding the field ${fieldKey}  to metaData`);
      updateMetaData(fieldKey, '');
    }
    tags = journalEntry.metaData[fieldKey] as string[];
  }, []);

  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const tagSeperationKey: string = ',';
  const placeHolderText: string = 'Enter a tag';


  function addTag(tag: string){
    if (tags.includes(tag)) return;

    const newValue = [...tags, tag];

    setInput('');
    updateMetaData(fieldKey, newValue);
  }

  // @ts-ignore
  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const {key} = event;
    const trimmedInput = input.trim();

    // Add tag
    const isValidSeperationKey = (key === tagSeperationKey || key === "Enter")
    if (isValidSeperationKey && trimmedInput.length) {
      addTag(trimmedInput);
      event.preventDefault();
    }

    if (key === "Enter" && !trimmedInput.length) {
      event.preventDefault();
      moveToNextFormElement(event);

      return;
    }

    // Remove tag - isKeyReleased prevents unwanted deletes when holding down Backspace
    const isInputEmptyAndTagsPresent: boolean = input.length == 0 && tags.length > 0;
    if (key === "Backspace" && isInputEmptyAndTagsPresent && isKeyReleased) {
      event.preventDefault();
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      // @ts-ignore
      setInput(poppedTag);
      setIsKeyReleased(false);
      updateMetaData(fieldKey, tagsCopy);
    }
  }

  // @ts-ignore
  function moveToNextFormElement(event: KeyboardEvent<HTMLInputElement>) {
    const form = event.target.form;
    const index: number = Array.prototype.indexOf.call(form, event.target);
    const nextIndex = index + 1;

    if (form.elements[nextIndex]) {
      form.elements[nextIndex].focus();
    } else {
      form.elements[0].focus(); // Return to the first element
    }
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    setInput(value);
  }

  function onKeyUpHandler(): void {
    setIsKeyReleased(true);
  }

  function deleteTag(index: number): void {
    const filteredTags: string[] = tags.filter((tag: string, i: number): boolean =>
      i !== index);

    updateMetaData(fieldKey, filteredTags);
  }

  // @ts-ignore
  function onFocusHandler(event: FocusEvent<HTMLInputElement>): void {

    event.target.placeholder = ""
  }

  // @ts-ignore
  function onBlurHandler(event: FocusEvent<HTMLInputElement>): void {
    if (input){
      const trimmedInput: string = input.trim();
      addTag(trimmedInput);
    }
    event.target.placeholder = placeHolderText;
  }


  function renderTags() {
    const values: string[] = journalEntry.metaData[fieldKey] as string[];
    if (!values) return;
    console.log(values);

    return values.map(createTags);
  }

  function createTags(tag: string, index: number): JSX.Element {
    return (
      <div className="tag">
        {tag}
        <button onClick={() => deleteTag(index)}>x</button>
      </div>
    );
  }

  return (
    <div className={"tags-container"}>
      {renderTags()}
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


}
