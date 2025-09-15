import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() creationDate: Date = new Date();
  @Input() duration: number = 0;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() editCourse: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteCourse: EventEmitter<void> = new EventEmitter<void>();

  onShowCourse() {
    this.showCourse.emit();
  }
  
  onEditCourse() {
    this.editCourse.emit();
  }
  
  onDeleteCourse() {
    this.deleteCourse.emit();
  }
}
