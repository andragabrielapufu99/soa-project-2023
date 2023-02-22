import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {environment} from "../../../../src/environments/environment";
import {FileType} from "../../../utils/src/lib/mfe.utils";
import {mfe} from "../../../reports-app/src/app/app-routing.module";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => mfe.loadRemoteFile({
      remoteName: "dashboard",
      remoteEntry: `${environment.moduleFederationUrl.app3}remoteDashboard.js`,
      exposedFile: "DashboardModule",
      exposeFileType: FileType.Module
    }).then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: 'forgot', loadChildren: () => import('./pages/forgot/forgot.module').then(m => m.ForgotModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
