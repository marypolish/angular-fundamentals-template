import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() description: string = '';
  @Input() creationDate: Date | string = '';
  @Input() duration: number = 0;
  @Input() authors: string[] = [];

  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();
  @Output() clickOnEdit = new EventEmitter<void>();
  @Output() clickOnDelete = new EventEmitter<void>();

  onShowClick(): void {
    this.clickOnShow.emit();
  }

   onEditClick(): void {
    this.clickOnEdit.emit();
  }
  
  onDeleteClick(): void {
    this.clickOnDelete.emit();
  }
}
