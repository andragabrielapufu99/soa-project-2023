import { NgModule } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Route, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RegisterComponent} from "./register.component";

export const routes: Route[] = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgIf,
    MatButtonModule
  ]
})
export class RegisterModule { }
