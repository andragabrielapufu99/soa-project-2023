import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {environment} from "../environments/environment";
import {FileType, MfeUtil} from "../../projects/utils/src/lib/mfe.utils";

export const mfe = new MfeUtil();

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadChildren: () => mfe.loadRemoteFile({
      remoteName: "dashboard",
      remoteEntry: `${environment.moduleFederationUrl.app3}remoteDashboard.js`,
      exposedFile: "DashboardModule",
      exposeFileType: FileType.Module
    }).then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => mfe.loadRemoteFile({
      remoteName: "login",
      remoteEntry: `${environment.moduleFederationUrl.app2}remoteLogin.js`,
      exposedFile: "LoginModule",
      exposeFileType: FileType.Module
    }).then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => mfe.loadRemoteFile({
      remoteName: "register",
      remoteEntry: `${environment.moduleFederationUrl.app2}remoteRegister.js`,
      exposedFile: "RegisterModule",
      exposeFileType: FileType.Module
    }).then(m => m.RegisterModule) },
  { path: 'forgot', loadChildren: () => mfe.loadRemoteFile({
      remoteName: "forgot",
      remoteEntry: `${environment.moduleFederationUrl.app2}remoteForgot.js`,
      exposedFile: "ForgotModule",
      exposeFileType: FileType.Module
    }).then(m => m.ForgotModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
