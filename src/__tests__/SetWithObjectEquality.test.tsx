import '@testing-library/jest-dom';
import { DuplicateKeyError} from './../renderer/Errors/DuplicateKeyError'
import { SetWithContentEquality } from './../renderer/utils/SetWithContentEquality'

describe('SetWithContentEquality', () => {
    // Setup
    type FakePerson = {
        name: string
        age: number,
    }

    let fakeSet: SetWithContentEquality<FakePerson, string>;
    beforeEach(() => {
        fakeSet = new SetWithContentEquality<FakePerson, string>(person => person.name);
    })

    it('should add items correctly', () => {
        // Arrange
        const fakeFakePersonA: FakePerson = {name: 'Mario', age: 1};
        const fakeFakePersonB: FakePerson = {name: 'Luigi', age: 1};
        const expectedSize: number = 2;

        // Act
        fakeSet.add(fakeFakePersonA);
        fakeSet.add(fakeFakePersonB);

        // Assert
        const actualSize = fakeSet.size();
        expect(actualSize).toBe(expectedSize);
    });

    it('should throw error when adding duplicate item', () => {
        // Arrange
        const fakeFakePersonA : FakePerson = {name: 'Mario', age: 1};

        // Act
        fakeSet.add(fakeFakePersonA);

        // Assert
        expect(() => fakeSet.add(fakeFakePersonA)).toThrow(DuplicateKeyError);
    });

    it('should return true if an item with the same key exists', () => {
        // Arrange
        const fakeFakePersonA: FakePerson = {name: 'Mario', age: 1};
        const fakeFakePersonB: FakePerson = {name: 'Luigi', age: 1};
        const expectedResult: boolean = true

        // Act
        fakeSet.add(fakeFakePersonA);
        fakeSet.add(fakeFakePersonB);

        // Assert
        expect(fakeSet.has(fakeFakePersonA.name)).toBe(expectedResult);
    });

    it('should return false if an item with the same key does not exist', () => {
        // Arrange
        const fakeFakePersonA: FakePerson = {name: 'Mario', age: 1};
        const key: string = 'Not Mario';
        const expectedResult: boolean = true;
        fakeSet.add(fakeFakePersonA);

        // Act
        const actualResult: boolean = fakeSet.has(key);

        // Assert
        expect(actualResult).toBe(expectedResult);
    });

    it('should return the correct item by key', () => {
        // Arrange
        const fakeFakePersonA: FakePerson = {name: 'Mario', age: 1};
        const fakeFakePersonB: FakePerson = {name: 'Luigi', age: 1};

        // Act
        fakeSet.add(fakeFakePersonA);
        fakeSet.add(fakeFakePersonB);

        // Assert
        expect(fakeSet.getValueByKey(fakeFakePersonA.name)).toBe(fakeFakePersonA);
    });

    it('should return undefined if the key does not exist', () => {
        // Arrange
        const fakeFakePersonA: FakePerson = {name: 'Mario', age: 1};
        const key: string = 'Not Mario';

        // Act
        fakeSet.add(fakeFakePersonA);

        // Assert
        expect(fakeSet.getValueByKey(key)).toBe(undefined);
    });
});

