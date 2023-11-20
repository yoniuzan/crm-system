import { EMPTY_STRING } from "../../constants/generalConstants";
import { Enums } from "../../enums";

export class Customer {
    public Id: number;
    public FirstName: string;
    public LastName: string;
    public Email: string;
    public Gender: Enums.Gender;
    public PhoneNumber: string;

    /**
     *
     */
    constructor() {
        this.FirstName = EMPTY_STRING;
        this.LastName = EMPTY_STRING;
        this.Email = EMPTY_STRING;
        this.Gender = Enums.Gender.Man;
        this.PhoneNumber = '0';
    }


}