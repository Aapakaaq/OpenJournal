import {JournalComponentType} from "../../Shared/types/JournalComponent";
import {JSONObject} from "../../Shared/types/Json";
import {JournalModel, JournalMapToModel} from "../../Shared/models/JournalModel"; // Update 'yourFile' with the correct path

describe('mapToModel function', () => {
  it('should map JSON object to JournalModel with populated fields', () => {
    // Arrange
    const fakeJsonObject: JSONObject = {
      filePath: '/path/to/file',
      metaData_foo1: { foo: 'metaDataValue1' },
      metaData_bar2: { bar: 'metaDataValue2' },
      ACTION_COMPONENT: { value: 'mario' },
      INPUT_COMPONENT: { value: 'luigi' }
    };


    const expectedFilePath: string = '/path/to/file';
    const expectedMetaData: Map<string, JSONObject> = new Map<string, JSONObject>([
      ['foo1', { foo: 'metaDataValue1' }],
      ['bar2', { bar: 'metaDataValue2' }]
    ]);
    const expectedComponents = new Map<JournalComponentType, JSONObject>([
      ['ACTION_COMPONENT', { value: 'mario' }],
      ['INPUT_COMPONENT', { value: 'luigi' }]
    ]);

    // Act
    const actualResult: JournalModel = JournalMapToModel(fakeJsonObject);

    // Assert
    expect(actualResult.filePath).toEqual(expectedFilePath);
    expect(actualResult.metaData).toEqual(expectedMetaData);
    expect(actualResult.components).toEqual(expectedComponents);
  });

  it('should map empty JSON object to JournalModel with empty fields', () => {
    // Arrange
    const emptyJsonObject: JSONObject = {
      filePath: '/path/to/file',
    };
    const expectedFilePath: string = '/path/to/file';
    const expectedMetaData: Map<string, JSONObject> = new Map<string, JSONObject>();
    const expectedComponents: Map<JournalComponentType, JSONObject> = new Map<JournalComponentType, JSONObject>();

    // Act
    const result: JournalModel = JournalMapToModel(emptyJsonObject);

    // Assert
    expect(result.filePath).toEqual(expectedFilePath);
    expect(result.metaData).toEqual(expectedMetaData);
    expect(result.components).toEqual(expectedComponents);
  });
});
