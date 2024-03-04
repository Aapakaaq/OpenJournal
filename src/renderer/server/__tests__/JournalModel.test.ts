import {JSONObject} from "../../Shared/types/Json";
import {JournalMapToModel, JournalModel} from "../../Shared/models/JournalModel"; // Update 'yourFile' with the correct path

describe('mapToModel function', () => {
  it('should map JSON object to JournalModel with populated fields', () => {
    // Arrange
    const fakeJsonObject: JSONObject = {
      filePath: '/path/to/file',
      metaData: {
        foo: 'metaDataValue1',
        bar: 'metaDataValue2'
      },
      components: {
        ACTION_COMPONENT: {value: 'mario'},
        INPUT_COMPONENT: {value: 'luigi'}
      }

    };

    // Act
    const actualResult: JournalModel = JournalMapToModel(fakeJsonObject);

    // Assert
    expect(actualResult.filePath).toEqual(fakeJsonObject['filePath']);
    expect(actualResult.metaData).toEqual(fakeJsonObject['metaData']);
    expect(actualResult.components).toEqual(fakeJsonObject['components']);
  });

  it('should map empty JSON object to JournalModel with empty fields', () => {
    // Arrange
    const emptyJsonObject: JSONObject = {
      filePath: '/path/to/file',
      metaData: {},
      components: {}
    };


    // Act
    const actualResult: JournalModel = JournalMapToModel(emptyJsonObject);

    // Assert
    expect(actualResult.filePath).toEqual(emptyJsonObject['filePath']);
    expect(actualResult.metaData).toEqual(emptyJsonObject['metaData']);
    expect(actualResult.components).toEqual(emptyJsonObject['components']);
  });
});
