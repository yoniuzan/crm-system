import {PromiseUtils} from "../promise-utils";

Promise.prototype.until = function<T>(this: Promise<T>, timeout: number): Promise<T | null> {

    return Promise.race([PromiseUtils.getTimeoutPromise<T>(timeout, true), this]);
};