/* eslint-disable */
import { ArraySorter } from 'src/app/crm-common/models/structures/array/array-sorter';
import { Dictionary } from 'src/app/crm-common/models/structures/dictionary/dictionary';

Array.prototype.toDictionary = function <T>(this: Array<T>, keyF: (arg0: T) => string): Dictionary<T> {
    const dict = new Dictionary<T>();

    for (let i = 0; i < this.length; i++) {
        const item = this[i];

        const key = keyF(item);

        dict.put(key, item);
    }

    return dict;
};

Array.prototype.intersect = function (...a) {
    return [this, ...a].reduce((p, c) => p.filter(e => c.includes(e)));
};

Array.prototype.toDictionaryWithVal = function <T, E>(this: Array<T>, keyF: (arg0: T) => string, valueF: (arg0: T) => E): Dictionary<E> {
    const dict = new Dictionary<E>();

    for (let i = 0; i < this.length; i++) {
        const item = this[i];

        const key = keyF(item);
        const value = valueF(item);

        dict.put(key, value);
    }

    return dict;
};

Array.prototype.contains = function <T>(this: Array<T>, item: T): boolean {
    return this.indexOf(item) > -1;
};

Array.prototype.notContains = function <T>(this: Array<T>, item: T): boolean {
    return !this.contains(item);
};

Array.prototype.exists = function <T>(this: Array<T>, accept: (item: T) => boolean): boolean {

    for (let i = 0; i < this.length; i++) {
        if (accept(this[i]))
            return true;
    }

    return false;
};

Array.prototype.notExists = function <T>(this: Array<T>, accept: (item: T) => boolean): boolean {
    return !this.exists(accept);
};

Array.prototype.count = function <T>(this: Array<T>, filter: (item: T) => boolean): number {
    return this.filter(x => filter(x)).length;
};

Array.prototype.deleteLast = function <T>(this: Array<T>, filter: (item: T) => boolean): void {

    let ix = -1;
    for (let i = this.length - 1; i >= 0; i--) {
        if (filter(this[i])) {
            ix = i;
            break;
        }
    }

    if (ix >= 0)
        this.splice(ix, 1);

};

Array.prototype.deleteFirst = function <T>(this: Array<T>, filter: (item: T) => boolean): void {
    const ix = this.findIndex(filter);
    if (ix > -1)
        this.splice(ix, 1);
};

Array.prototype.firstOrNull = function <T>(this: Array<T>, filter: (item: T) => boolean): T | null {

    for (let i = 0; i < this.length; i++) {
        if (filter(this[i]))
            return this[i];
    }

    return null;
};

Array.prototype.max = function <T>(this: Array<T>, projection: (item: T) => number): T | null {
    if (this.length == 0)
        return null;

    let max = this[0],
        maxValue = projection(max);

    for (let i = 1; i < this.length; i++) {
        const current = this[i];
        const currentValue = projection(current);
        if (currentValue > maxValue) {
            max = current;
            maxValue = currentValue;
        }
    }

    return max;
};

Array.prototype.min = function <T>(this: Array<T>, projection: (item: T) => number | Date): T | null {
    if (this.length == 0)
        return null;

    let min = this[0],
        minValue = projection(min);

    for (let i = 1; i < this.length; i++) {
        const current = this[i];
        const currentValue = projection(current);
        if (currentValue < minValue) {
            min = current;
            minValue = currentValue;
        }
    }

    return min;
};

Array.prototype.minIndex = function <T>(this: Array<T>, projection: (item: T) => number | Date): number {
    if (this.length == 0)
        return -1;

    let minValue = projection(this[0]),
        minIndex = 0;

    for (let i = 1; i < this.length; i++) {
        const currentValue = projection(this[i]);
        if (currentValue < minValue) {
            minValue = currentValue;
            minIndex = i;
        }
    }

    return minIndex;
};

Array.prototype.sum = function (this: Array<number>): number {
    return this.reduce((x, y) => x + y, 0);
};

Array.prototype.mapSum = function <T>(this: Array<T>, map: (item: T) => number): number {
    return this.reduce((x, y) => x + map(y), 0);
};

Array.prototype.groupBy = function <T>(this: Array<T>, groupBy: (item: T) => string | number): Dictionary<Array<T>> {

    const red = this.reduce(function (prev: any, current) {
        const key = groupBy(current);

        // get previous array or create another one and push the value
        (prev[key] = prev[key] || []).push(current);

        return prev; // return updated object
    }, {});

    return new Dictionary<Array<T>>(red);
};

Array.prototype.countBy = function <T>(this: Array<T>, groupBy: (item: T) => string | number): Dictionary<number> {

    const red = this.reduce(function (prev: any, current) {
        const key = groupBy(current);

        // get previous array or create another one and push the value
        prev[key] = prev[key] || 0;
        prev[key]++;

        return prev; // return updated object
    }, {});

    return new Dictionary<number>(red);
};

Array.prototype.skip = function <T>(this: Array<T>, skip: number): Array<T> {
    return this.slice(skip);
};

Array.prototype.shuffle = function <T>(this: Array<T>): Array<T> {
    return this.sort(() => Math.random() - 0.5);
};

Array.prototype.shuffleWithExclude = function <T>(this: Array<T>, reservedIndexes: Array<number>): Array<T> {
    const items = this.filter((_, i) => reservedIndexes.contains(i));
    const sorted: any = this.filter((_, i) => !reservedIndexes.contains(i)).sort(() => Math.random() - 0.5);
    reservedIndexes.sort((a, b) => a - b);
    const sortedLength = sorted.length;

    if (sorted.length !== 16) // config length
    {
        for (let i = 0; i < reservedIndexes.length; i++)
            sorted.push(null);
    }

    items.forEach((item, index) => {
        const newIndex = reservedIndexes[index];
        if (sorted[newIndex] === null)
            sorted[newIndex] = item;

        else {
            sorted[sortedLength + index] = sorted[newIndex];
            sorted[newIndex] = item;
        }
    });

    return sorted;

};

Array.prototype.take = function <T>(this: Array<T>, take: number): Array<T> {
    return this.slice(0, take);
};

Array.prototype.takeAround = function <T>(this: Array<T>, take: number, index: number): Array<T> {
    const arr = [...this.slice(Math.max(index - take, 0), index), ...this.slice(index, index), ...this.slice(index, index + take + 1)];

    return arr;//[...this.slice(index - take, index),...this.slice(index, index + take+1)];
};

Array.prototype.takeLast = function <T>(this: Array<T>, take: number): Array<T> {
    const start = Math.max(0, this.length - take);

    return this.slice(start, this.length);
};

Array.prototype.page = function <T>(this: Array<T>, page: number, entries: number): Array<T> {
    const start = page * entries;

    return this.slice(start, start + entries);
};

Array.prototype.findLastIndex = function <T>(this: Array<T>, filter: (item: T) => boolean): number {
    for (let i = this.length - 1; i >= 0; i--) {
        if (filter(this[i]))
            return i;

    }

    return -1;
};

Array.prototype.sortWithSorter = function <T>(this: Array<T>, sorter: ArraySorter<T>): Array<T> {
    return this.sort((a, b) => {

        for (let sortIx = 0; sortIx < sorter.Sorts.length; sortIx++) {

            const valA = sorter.Sorts[sortIx].field(a);
            const valB = sorter.Sorts[sortIx].field(b);

            if (valA > valB)
                return sorter.Sorts[sortIx].direction;
            else if (valB > valA)
                return -sorter.Sorts[sortIx].direction;

            continue;
        }

        return 0;
    });
};

Array.prototype.distinct = function <T>(this: Array<T>, mappingFunc: (item: T) => string): Array<T> {
    const result: T[] = [];
    const keys: any = {};

    for (let i = 0; i < this.length; i++) {
        const mappedValue = mappingFunc(this[i]);
        if (keys[mappedValue])
            continue; // exists

        result.push(this[i]);
        keys[mappedValue] = true;
    }

    return result;
};

Array.prototype.randomCell = function <T>(this: Array<T>): { item: T, index: number } {
    const index = Math.floor(Math.random() * this.length);

    return { item: this[index], index };
};
