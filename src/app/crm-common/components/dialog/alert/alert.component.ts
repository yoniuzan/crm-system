import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'alert',
  standalone: true,
  imports: [ MatDialogModule ], 
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
