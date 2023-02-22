import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ForgotComponent} from "./forgot.component";

const routes: Routes = [
  {
    path: '',
    component: ForgotComponent
  }
]

@NgModule({
  declarations: [
    ForgotComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class ForgotModule { }
