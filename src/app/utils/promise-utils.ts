export class PromiseUtils {

    public static getTimeoutPromise<T>(timeout: number, useReject = false): Promise<T | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => useReject ? reject(null) : resolve(null), timeout);
        });
    }
}
