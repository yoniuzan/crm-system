/* eslint-disable */
import { ArraySorter } from '../crm-common/models/structures/array/array-sorter';
import { Dictionary } from '../crm-common/models/structures/dictionary/dictionary';

// for later retrun this 2 lines
//import { environment } from '../../environments/environment';
//import { ServerSyncTime } from './server-sync-time';

export { };

declare global {
    interface String {
        isValidEmail(this: string): boolean;
        minLength(this: string, len: number): boolean;
        onlyLetters(this: string): string
        replaceAll(this: string, search: any, replacement: string): string;
        titleCase(this: string): string;
        toVersion(this: string): number;
    }

    interface Date {
        addMonths(this: Date, months: number): Date;
        addDays(this: Date, days: number): Date;
        addMilliseconds(this: Date, miliSeconds: number): Date;
        diffFromNow(this: Date): number;
        getWeekNumber(this:Date):number;
        WeekandYear(this: Date): string;
        LanguageVersion(this: Date): string;
        ConfigVersion(this: Date): string;
        dateToLeftConvert(this: Date, milliSecondsLeft: number): { days: number, hours: number, minutes: number, seconds: number };
    }

    interface Array<T> {
        toDictionary<T>(this: Array<T>, keyF: (T:any) => string): Dictionary<T>;
        toDictionaryWithVal<T, E>(this: Array<T>, keyF: (T:any) => string, valueF: (T:any) => E): Dictionary<E>;
        contains<T>(this: Array<T>, item: T): boolean;
        notContains<T>(this: Array<T>, item: T): boolean;
        exists<T>(this: Array<T>, accept: (item: T) => boolean): boolean;
        notExists<T>(this: Array<T>, accept: (item: T) => boolean): boolean;
        count<T>(this: Array<T>, filter: (item: T) => boolean): number;
        deleteFirst<T>(this: Array<T>, filter: (item: T) => boolean): void;
        deleteLast<T>(this: Array<T>, filter: (item: T) => boolean): void;
        firstOrNull<T>(this: Array<T>, filter: (item: T) => boolean): T | null;
        sum(this: Array<number>): number;
        mapSum<T>(this: Array<T>, map: (item: T) => number): number;
        max<T>(this: Array<T>, filter: (item: T) => number): T | null;
        min<T>(this: Array<T>, filter: (item: T) => number | Date): T | null;
        minIndex<T>(this: Array<T>, filter: (item: T) => number | Date): number;
        groupBy<T>(this: Array<T>, groupBy: (item: T) => string | number): Dictionary<Array<T>>;
        countBy<T>(this: Array<T>, groupBy: (item: T) => string | number): Dictionary<number>;
        skip<T>(this: Array<T>, skip: number): Array<T>;
        take<T>(this: Array<T>, take: number): Array<T>;
        shuffle<T>(this: Array<T>): Array<T>;
        shuffleWithExclude<T>(this: Array<T>, reservedIndexes: Array<number>): Array<T>;
        takeLast<T>(this: Array<T>, take: number): Array<T>;
        takeAround<T>(this: Array<T>, take: number, index: number): Array<T>;
        page<T>(this: Array<T>, page: number, entries: number): Array<T>;
        findLastIndex<T>(this: Array<T>, filter: (item: T) => boolean): number;
        sortWithSorter<T>(this: Array<T>, sorter: ArraySorter<T>): Array<T>;
        intersect<T>(a: Array<T>): Array<T>;
        distinct<T>(this: Array<T>, mappingFunc: (item: T) => string): Array<T>;
        randomCell<T>(this: Array<T>): { item: T, index: number };
    }

    interface Promise<T> {
        until<T>(this: Promise<T>, timeout: number): Promise<T | null>;
    }

    function isEmpty(...args: any[]): boolean;
    function isNotEmpty(obj: any | null | undefined): boolean;
    function foreach(obj: any, callback: (key: any, value: any, ix: number) => any): any;
    function DateFromServer(timestamp: number): Date;
    function debugAlert(text: string): void;
    function uuid(length: number): string;
}

const _global = (window) as any;// || global

_global.isEmpty = function (...args: any[]): boolean {
    for (const object of args) {
        if (
            object == null ||
            object === undefined ||
            (typeof object === 'object' && Object.keys(object).length === 0) ||
            (typeof object === 'string' && object.trim().length === 0)
        ) {
            return true;
        }
    }

    return false;
};

// _global.debugAlert = function (text): void {
//     if (!environment.production)
//         alert(text);
// };

// _global.DateFromServer = function (timestamp: number): Date {
//     return ServerSyncTime.syncDate(new Date(Date.now() + timestamp));
// };

_global.isNotEmpty = function (object: any | null | undefined): boolean {
    return !isEmpty(object);
};

_global.foreach = function (obj: any, callback: (key: any, value: any, ix: number) => any): any {
    let ix = 0;
    for (const i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i))
            continue;

        callback(i, obj[i], ix);
        ix++;
    }
};

_global.uuid = function (length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';

    for (let i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * characters.length));

    return result;
};
