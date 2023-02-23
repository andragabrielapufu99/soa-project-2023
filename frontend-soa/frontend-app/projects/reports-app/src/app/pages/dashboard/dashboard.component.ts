import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReportRequestService} from "../../services/request/report-request.service";
import {ReportRequest, ReportRequestType, RequestStatusType} from "../../entities/report-request";
import {AddDialogWindowComponent} from "../../components/add-dialog-window/add-dialog-window.component";
import {MatDialog} from "@angular/material/dialog";
import {WebsocketService} from "../../services/websocket/websocket.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  requests: ReportRequest[][] = [];
  pieChartsData: any = {};
  constructor(
    private router: Router,
    private service: ReportRequestService,
    public dialog: MatDialog,
    private ws: WebsocketService
  ) {}

  ngOnInit(): void {
    if(!this.checkAuthenticated()) {
      this.router.navigate(['/login']);
    }else {
      let unparsed = localStorage.getItem('token');
      if(unparsed !== null){
        let token = JSON.parse(unparsed);
        this.service.getAllByEmail(token.email).subscribe(result => {
          let row: ReportRequest[] = [];
          for(var j=1; j<=result.length; j++){
            if(j % 4 === 0){
              row.push(result[j-1]);
              if(result[j-1].status === RequestStatusType.PROCESSED){
                this.pieChartsData[result[j-1].id.toString()] = this.getPieResults(result[j-1]);
              }
              this.requests.push(row);
              row = [];
            }else{
              row.push(result[j-1]);
              if(result[j-1].status === RequestStatusType.PROCESSED){
                this.pieChartsData[result[j-1].id.toString()] = this.getPieResults(result[j-1]);
              }
              if(j === result.length) {
                this.requests.push(row);
              }
            }
          }
        });
        this.ws.listen('message').subscribe((data) => {
          if (typeof data === "string") {
            let parsedData = JSON.parse(data);
            if (parsedData.event === 'update-requests') {
              parsedData.payload.forEach((request: ReportRequest) => {
                for(var i=0; i<this.requests.length; i++){
                  for(var j=0; j<this.requests[i].length; j++){
                    if(request.id === this.requests[i][j].id){
                      this.requests[i][j] = request;
                      break;
                    }
                  }
                }
              });
            }
          }
        })
      }
    }
  }

  private checkAuthenticated(): boolean {
    let unparsed = localStorage.getItem('token');
    if(unparsed !== null) {
      try{
        let token = JSON.parse(unparsed);
        return true;
      }catch (e) {
        return false;
      }
    }
    return false;
  }

  getRequestTypeText(type: ReportRequestType | null): string {
    let text: string = '';
    switch(type){
      case ReportRequestType.HISTORY:
        text = 'HISTORY';
        break;
      case ReportRequestType.SONG:
        text = 'SONG';
        break;
      case ReportRequestType.PLAYLIST:
        text = 'PLAYLIST';
        break;
      default:
        break;
    }
    return text;
  }

  getPieResults(request: ReportRequest): any[] {
    let result: any[] = [];
    request.results.forEach(r => {
      let idx = result.findIndex(x => x.name === r.emotion);
      if(idx !== -1) {
        result[idx].value += r.count;
      }else {
        result.push({
          name: r.emotion,
          value: r.count
        });
      }
    });
    return result;
  }

  private addRequest(request: ReportRequest) {
    this.service.addRequest(request).subscribe(result => {
      if(this.requests.length > 0) {
        this.requests[0].splice(0, 0, result);
        for(var j=1; j<this.requests.length; j++){
          this.requests[j].splice(0,0, this.requests[j-1][this.requests[j-1].length - 1]);
          this.requests[j-1].splice(this.requests[j-1].length - 1, 1);
        }
        if(this.requests[this.requests.length - 1].length > 4){
          this.requests.push([this.requests[this.requests.length - 1][3]]);
          this.requests[this.requests.length - 2].splice(3, 1);
        }

      }else {
        this.requests.push([request]);
      }
    });
  }


  openAddRequestDialog() {
    let dialogRef = this.dialog.open(AddDialogWindowComponent, {
      data: null,
      width: '35%', // 100vh
      height: 'fit-content'
    });

    dialogRef.afterClosed().subscribe(request => {
      if(request){
        this.addRequest(request);
      }
    });
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onAdd() {
    this.openAddRequestDialog();
  }
}
