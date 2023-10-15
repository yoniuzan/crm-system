import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Enums } from 'src/app/crm-common/enums';
import { AlertComponent } from '../alert/alert.component';

@Component({
    selector: 'dialog',
    standalone: true,
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    @Input('open-dialog') public _openDialog: boolean;
    @Input('dialog-type') public _dialogType: Enums.DialogType;

    public animal: string;
    public name: string;

    constructor(public dialog: MatDialog) { }

    public ngOnInit(): void {
        if (this._openDialog)
            this.openDialog();
    }

    private openDialog(): void {
        switch (this._dialogType) {
            case Enums.DialogType.Alert:
                this.openAlert();
                break;
            default:
                break;
        }
    }

    private openAlert(): void {
        const dialogRef = this.dialog.open(AlertComponent, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;

        });
    }
}
