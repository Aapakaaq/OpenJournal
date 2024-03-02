import '@testing-library/jest-dom';
import { DuplicateKeyError} from '../../errors/DuplicateKeyError'
import { SetWithContentEquality } from '../utils/SetWithContentEquality'

describe('SetWithContentEquality', () => {
    // Setup
    type FakePerson = {
        name: string
        age: number,
    }

    let fakeSet: SetWithContentEquality<string, FakePerson>;
    beforeEach(() => {
        fakeSet = new SetWithContentEquality<string, FakePerson>(person => person.name);
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
        const expectedResult: boolean = false;
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

