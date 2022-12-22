export class EnumsUtils {

    public static getEnumValues(enumType: any): Array<number> {
        const arr: any = [],
            values: any = Object.values(enumType).filter(x => typeof x == 'number');

        const len = values.length;

        for (let i = 0; i < len; i++)
            arr.push(values[i]);

        return arr;
    }

    public static getEnumKeys(enumType: any): Array<string> {
        const arr: any = [],
            keys: any = Object.values(enumType).filter(x => typeof x != 'number');

        const len = keys.length;

        for (let i = 0; i < len; i++)
            arr.push(keys[i]);

        return arr;
    }

    public static getEnumKeysAndValues(enumType: any): Array<{ Key: string, Value: number }> {
        const arr: any = [],
            values = EnumsUtils.getEnumValues(enumType),
            keys = EnumsUtils.getEnumKeys(enumType);

        const len = keys.length;

        for (let i = 0; i < len; i++)
            arr.push({ Key: keys[i], Value: values[i] });

        return arr;
    }
}