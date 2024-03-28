import React, {ChangeEvent, useState} from "react";
import "./TagsInput.css"
import {useJournal} from "../../contexts/JournalContext";

export default function TagsInput() {
  const {updateTags, journalEntry} = useJournal()
  let tags: string[] = journalEntry.tags;

  const [input, setInput] = useState('');
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const tagSeparationKey: string = ',';
  const placeHolderText: string = 'Enter a tag';


  function addTag(tag: string){
    if (tags.includes(tag)) return;

    const newValue: string[] = [...tags, tag];
    console.log(`addTag newValue: ${newValue}`);
    setInput('');
    updateTags(newValue);
  }

  // @ts-ignore
  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>): void {
    const {key} = event;
    const trimmedInput: string = input.trim();

    // Add tag
    const isValidSeparationKey: boolean = (key === tagSeparationKey || key === "Enter")
    if (isValidSeparationKey && trimmedInput.length) {
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
      updateTags(tagsCopy)
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
    const value: string = event.target.value;
    setInput(value);
  }

  function onKeyUpHandler(): void {
    setIsKeyReleased(true);
  }

  function deleteTag(event: React.MouseEvent<HTMLButtonElement>, index: number): void {
    const filteredTags: string[] = tags.filter((_, i: number): boolean =>
      i !== index);

    updateTags(filteredTags);
    event.preventDefault();
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
    const values: string[] = journalEntry.tags;
    if (!values) return;
    return values.map(createTags);
  }

  function createTags(tag: string, index: number): JSX.Element {
    return (
      <div className="tag">
        {tag}
        <button onClick={(event) => deleteTag(event, index)}>x</button>
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
