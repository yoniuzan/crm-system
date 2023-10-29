export namespace Enums {
    export enum Language {
        Hebrew = 1,
        English = 2
    }

    export enum FormFieldType {
        Text = 1,
        Password = 2,
        Email = 3
    }

    export enum DialogType {
        Alert = 1
    }

    export enum AlertType { Success = 1, Warning = 2, Error = 3, Prompt = 4, PromptWithPrice = 5, Help = 6, Activation = 7, General }

    export enum AlertResponses { Yes = 1, No = 2, Other = 3, CloseWithoutAction = 4 }
}
