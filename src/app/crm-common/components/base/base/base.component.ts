/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constants } from "src/app/crm-common/constants/languages/contstans";

export class BaseComponent {

    public constants = Constants;

    public trackByIndex(index: number): number {
        return index;
    }

    public trackById(obj: any): string {
        return obj.Id;
    }
}
