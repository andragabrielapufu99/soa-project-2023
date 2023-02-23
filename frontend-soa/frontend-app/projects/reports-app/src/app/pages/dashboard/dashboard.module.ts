import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {ReportRequestService} from "../../services/request/report-request.service";
import {CommonModule, DatePipe} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {httpInterceptorProviders} from "../../services/interceptor";
import {MatButtonModule} from "@angular/material/button";
import {AddDialogWindowComponent} from "../../components/add-dialog-window/add-dialog-window.component";
import {DialogConfirmationComponent} from "../../components/dialog-confirmation/dialog-confirmation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {WebsocketService} from "../../services/websocket/websocket.service";
// import {PieChartModule} from "@swimlane/ngx-charts";
// import {NgxChartsModule} from "@swimlane/ngx-charts";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    AddDialogWindowComponent,
    DialogConfirmationComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
    // PieChartModule,
    // NgxChartsModule
  ],
  providers: [
    ReportRequestService,
    httpInterceptorProviders,
    DatePipe,
    WebsocketService
  ]
})
export class DashboardModule { }
