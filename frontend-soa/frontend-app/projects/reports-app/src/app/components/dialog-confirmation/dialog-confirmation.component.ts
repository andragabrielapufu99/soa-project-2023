import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent {
  title: string = '';
  message: string = '';
  response: string = '';

  constructor(public dialogRef: MatDialogRef<DialogConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data) {
      this.title = data['title'];
      this.message = data['message'];
    }
  }

  ngOnInit(): void {}


  onOk() {
    this.response = 'yes';
    this.dialogRef.close(this.response);
  }

  onCancel() {
    this.response = 'no';
    this.dialogRef.close(this.response);
  }
}
