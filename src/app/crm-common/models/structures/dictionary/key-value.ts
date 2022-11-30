export class KeyValue<T, TE> {

    public Key: T;
    public Value: TE;

    constructor (key: T, value: TE) {
        this.Key = key;
        this.Value = value;
    }
}
