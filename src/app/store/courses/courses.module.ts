import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CoursesRoutingModule } from './courses-routing.module'; 

import { CourseCardComponent } from '../../shared/components/course-card/course-card.component'; 
import { CourseComponent } from '../../shared/components/course-form/course-form.component'; 
import { CourseInfoComponent } from '../../features/course-info/course-info.component'; 

@NgModule({
  declarations: [
    CourseCardComponent,
    CourseComponent,
    CourseInfoComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CourseCardComponent 
  ]
})
export class CoursesModule { }
