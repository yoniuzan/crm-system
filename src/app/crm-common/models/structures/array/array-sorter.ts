type SortData<T> = {field: (item: T) => number | string, direction: number}

export class ArraySorter<T> {
    
    public Sorts: Array<SortData<T>>;

    constructor() {
        this.Sorts = [];
        
    }

    public ascending(field: (item: T) => number | string): ArraySorter<T> {
        this.Sorts.push({field: field, direction: 1});
        
        return this;
    }

    public descending(field: (item: T) => number | string): ArraySorter<T> {
        this.Sorts.push({field: field, direction: -1});
        
        return this;
    }

    public sort(array: T[]): T[] {
        return array.sortWithSorter(this);
    }

}