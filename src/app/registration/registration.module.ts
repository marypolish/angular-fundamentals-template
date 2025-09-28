import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationFormComponent } from '../shared/components/registration-form/registration-form.component';

const routes: Routes = [
  { path: '', component: RegistrationFormComponent }
];

@NgModule({
  declarations: [
    RegistrationFormComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class RegistrationModule { }
