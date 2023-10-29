import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Enums } from 'src/app/crm-common/enums';
import { BaseComponent } from '../../base/base/base.component';
import { TranslatePipe } from "../../../../pipes/translate/translate.pipe";

export interface IAlertComponentInput {
    Type: Enums.AlertType,
    Message: {
        Title: string,
        Content: string,
        AcceptButton?: string,
        CancelButton?: string,
        CloseWithoutAction?: boolean,
        Buttons?: {
            Danger?: boolean,
            Warning?: boolean,
            Success?: boolean,
            Help: boolean
        }
    },
    
    // AcceptColor?: Enums.ButtonType,
    // CancelColor?: Enums.ButtonType,
}

export interface IAlertComponentOutput {
    response: Enums.AlertResponses;
}

@Component({
    selector: 'alert',
    standalone: true,
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    imports: [MatDialogModule, CommonModule, TranslatePipe]
})
export class AlertComponent extends BaseComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public alert: IAlertComponentInput) { 
        super();
        console.log('AlertComponent', alert);
    }
}
