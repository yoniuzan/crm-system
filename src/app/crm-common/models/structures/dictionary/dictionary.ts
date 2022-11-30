import { KeyValue } from './key-value';

export class Dictionary<Tvalue> {

    private _dict: { [key: string]: Tvalue };

    constructor(data?: any) {
        this._dict = {};

        // populate
        if (isNotEmpty(data))
            foreach(data, (k, v) => this.put(k, v));
    }

    public clear(): void {
        this._dict = {};
    }

    public put(key: number | string, value: Tvalue): void {
        this._dict[key] = value;
    }

    public getOrNull(key: number | string): Tvalue | null {
        if (this._dict.hasOwnProperty(key))
            return this._dict[key];

        return null;
    }

    public getOrDefault(key: string | number, defaultValue: Tvalue): Tvalue | null {
        const v = this.getOrNull(key);

        return v != null ? v : defaultValue;
    }

    public get(key: number | string): Tvalue {
        if (this._dict.hasOwnProperty(key))
            return this._dict[key];

        throw new Error(`KeyNotFound: Could not find key(${key.toString()}} in dictionary`);
    }

    public containsKey(key: string | number): boolean {
        return this.getOrNull(key) != null;
    }

    public remove(key: string | number): void {
        delete this._dict[key];
    }

    public filter(filter: (k: string | number, v: Tvalue) => boolean): Dictionary<Tvalue> {
        const keys = this.keys().filter(x => filter(x, this.get(x)));

        // new dict
        const dict = new Dictionary<Tvalue>();

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            dict.put(key, this.get(key));
        }

        return dict;
    }

    public forEach(iterate: (k: string | number, v: Tvalue) => void): void {
        this.keys().forEach(key => {
            iterate(key, this.get(key));
        });
    }

    public values(): Array<Tvalue> {
        return Object.values(this._dict);
    }

    public keys(): Array<string> {
        return Object.keys(this._dict);
    }

    public get length(): number {
        return this.keys().length;
    }

    public asKeyValueArray(): Array<KeyValue<string | number, Tvalue>> {
        const arr: Array<KeyValue<string | number, Tvalue>> = [];
        this.forEach((k, v) => arr.push(new KeyValue(k, v)));

        return arr;
    }

    public getSortedKeys(sort: (key1: string | number, value1: Tvalue, key2: string | number, value2: Tvalue) => number): Array<string | number> {

        let arr = this.asKeyValueArray();
        arr = arr.sort((i1, i2) => sort(i1.Key, i1.Value, i2.Key, i2.Value));

        return arr.map(x => x.Key);
    }

    public map<T>(map: ((key: string | number, value: Tvalue) => T)): Array<T> {
        return this.keys().map(key => map(key, this.get(key)));
    }

    public getObject(): any {
        const dictObj: any = {};
        this.keys().forEach(key => {
            dictObj[key] = this._dict[key];
        });

        return dictObj;
    }
}
