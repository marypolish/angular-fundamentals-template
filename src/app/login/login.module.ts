import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginFormComponent } from '../shared/components/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent }
];

@NgModule({
  declarations: [
    LoginFormComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
})
export class LoginModule { }
