import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Enums } from 'src/app/crm-common/enums';
import { AlertComponent, IAlertComponentInput } from '../alert/alert.component';

@Component({
    selector: 'dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    @Input('dialog-type') public _dialogType: Enums.DialogType;
    @Input('alert-data') public _alertData: IAlertComponentInput;

    constructor(public dialog: MatDialog) { }

    public ngOnInit(): void {
        this.openDialog();
    }

    private openDialog(): void {
        switch (this._dialogType) {
            case Enums.DialogType.Alert:
                if (this._alertData)
                    this.openAlert(this._alertData);
                break;
            default:
                break;
        }
    }

    private openAlert(alertData: IAlertComponentInput): void {
        const dialogRef = this.dialog.open(AlertComponent, {
            width: '250px',
            data: alertData
        });

        dialogRef.afterClosed().subscribe((result: Enums.AlertResponses) => {
            console.log('The dialog was closed', result);
        });
    }
}
