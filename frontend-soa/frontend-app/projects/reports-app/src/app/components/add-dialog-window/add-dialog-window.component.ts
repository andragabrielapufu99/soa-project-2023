import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ReportRequest, ReportRequestType, RequestStatusType} from "../../entities/report-request";
import {DialogConfirmationComponent} from "../dialog-confirmation/dialog-confirmation.component";
import {DatePipe} from "@angular/common";

interface Option {
  name: string;
  value: string;
}

@Component({
  selector: 'app-add-dialog-window',
  templateUrl: './add-dialog-window.component.html',
  styleUrls: ['./add-dialog-window.component.scss']
})
export class AddDialogWindowComponent {
  selectOptions: Option[] = [
    {value: ReportRequestType.SONG.toString(), name: 'SONG'},
    {value: ReportRequestType.PLAYLIST.toString(), name: 'PLAYLIST'}
  ];

  selected: string = '';

  requestResult: ReportRequest = {
    id: -1,
    link: '',
    type: null,
    pathFile: '',
    status: RequestStatusType.UNPROCESSED,
    spectrograms: [],
    results: [],
    date: '',
    email: ''
  }

  errorLink: string = '';
  errorType: string = '';

  valid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public requests: ReportRequest[],
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    let unparsed = localStorage.getItem('token');
    if(unparsed !== null){
      let token = JSON.parse(unparsed);
      this.requestResult.email = token.email;
      let date = new Date();
      this.requestResult.date = <string>this.datePipe.transform(date, 'dd-MM-yyyy HH:mm:ss');
    }else {
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  clickOK() {
    this.openConfirmationDialog();
  }

  private clearErrors() {
    this.errorLink = '';
    this.errorType = '';
  }

  private checkIsValid() {
    this.clearErrors();
    this.valid = true;

    if(this.requestResult.type === null) {
      this.errorType = '*Required';
      this.valid = false;
    }else {
      if(this.requestResult.type === ReportRequestType.SONG || this.requestResult.type === ReportRequestType.PLAYLIST){
        if(this.requestResult.link === '') {
          this.errorLink = '*Required';
          this.valid = false;
        }
      }
    }

  }

  ngDoCheck() {
    this.checkIsValid();
  }

  openConfirmationDialog(): void {
    let confDialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '30vh',
      data: {title: 'Add New Request', message: 'Are you sure you want to finish the operation?'}
    });
    confDialogRef.afterClosed().subscribe(response => {
      if(response === 'yes'){
        this.dialogRef.close(this.requestResult);
      }else if(response === 'no'){
        this.dialogRef.close();
      }
    });
  }

  changeType() {
    if(this.selected !== '') {
      switch (Number(this.selected)){
        case ReportRequestType.HISTORY:
          this.requestResult.type = ReportRequestType.HISTORY;
          break;
        case ReportRequestType.SONG:
          this.requestResult.type = ReportRequestType.SONG;
          break;
        case ReportRequestType.PLAYLIST:
          this.requestResult.type = ReportRequestType.PLAYLIST;
          break;
        default:
          break;
      }
    }
  }
}
