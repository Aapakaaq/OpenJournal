import {JSONObject} from "../../Shared/types/Json";
import {journalMapToModel, JournalModel} from "../../Shared/models/JournalModel"; // Update 'yourFile' with the correct path

describe('mapToModel function', () => {
  it('UNIT TEST should map JSON object to JournalModel with populated fields', () => {
    // Arrange
    const fakeJsonObject: JSONObject = {
      filePath: "/path/to/file",
      metaData: {
        key1: "value1",
        key2: 123,
        key3: true,
        key4: {
          nestedKey: "nestedValue",
        },
        key5: [1, 2, 3],
      },
      textContent: "making\nmy way down town",
      actions: {
        walkingSpeed: "fast",
        faces: "pass"
      }
    };

    // Act
    const actualResult: JournalModel = journalMapToModel(fakeJsonObject);
    // Assert
    expect(actualResult.filePath).toEqual(fakeJsonObject['filePath']);
    expect(actualResult.metaData).toEqual(fakeJsonObject['metaData']);
    expect(actualResult.textContent).toEqual(fakeJsonObject['textContent']);
    expect(actualResult.actions).toEqual(fakeJsonObject['actions']);
  });

  // TODO:
  /*
  it('UNIT TEST should not map invalid component fields', () => {
    // Arrange
    const fakeInvalidJsonObject: JSONObject = {
      filePath: "/path/to/file",
      metaData: {
        key1: "value1",
        key2: 123,
        key3: true,
        key4: {
          nestedKey: "nestedValue",
        },
        key5: [1, 2, 3],
      },
      components: {
        InvalidComponent: {
          data: "bowser",
        },
      },
    };
    // Act
    const actualResult: JournalModel = JournalMapToModel(fakeInvalidJsonObject);
    console.log(actualResult.components);
  })
*/
  it('should map empty JSON object to JournalModel with empty fields', () => {
    // Arrange
    const emptyJsonObject: JSONObject = {
      filePath: '/path/to/file',
      metaData: {},
      textArea: ""
    };

    // Act
    const actualResult: JournalModel = journalMapToModel(emptyJsonObject);

    // Assert
    expect(actualResult.filePath).toEqual(emptyJsonObject['filePath']);
    expect(actualResult.metaData).toEqual(emptyJsonObject['metaData']);
    expect(actualResult.textContent).toEqual(emptyJsonObject['components']);
    expect(actualResult.actions).toBeNull;
  });
});
