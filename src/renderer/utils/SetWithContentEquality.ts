import {DuplicateKeyError} from '../errors/DuplicateKeyError'

/*
 * Set data structure with content equality
 * @param getKey - Compare object by their key
 */

export class SetWithContentEquality<TKey,TItem> {
    private readonly getKey: (item: TItem) => TKey;
    private items: TItem[]

    constructor(getKey: (item: TItem) => TKey, items: TItem[] = []) {
        this.getKey = getKey;
        this.items = items;
    }

    /*
     * @throws {DuplicateKeyError} If an object is added with existing key
     */
    public add(value: TItem): this {
        const key = this.getKey(value);
        if (this.has(key)){
            throw new DuplicateKeyError("${item} already exists.");
        }

        this.items.push(value);
        return this;
    }

    public has(key: TKey): boolean {
        return this.items.some(existing => this.getKey(existing) === key);
    }

    public getValueByKey(key: TKey): TItem | undefined {
        for (const item of this.items) {
            if (this.getKey(item) === key) {
                return item;
            }
        }
        return undefined;
    }

    public remove(key: TKey): void {
        const filteredArray = this.items.filter(item => this.getKey(item) !== key);
        this.items = filteredArray;
    }

    public size(): number {
        return this.items.length;
    }

    public values(): TItem[] {
        return this.items;
    }
}
