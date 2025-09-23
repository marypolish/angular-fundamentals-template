import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  authorsList: { id: number; name: string }[] = [];
  courseAuthors: { id: number; name: string }[] = [];

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      author: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],
      authors: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Ініціалізація форми за допомогою FormBuilder
    this.authorsList = [
      { id: 1, name: "Author One" },
      { id: 2, name: "Author Two" },
    ];
  }

  addAuthor(author: { id: number; name: string }): void {
    this.courseAuthors.push(author);
    this.authorsList = this.authorsList.filter((a) => a.id !== author.id);
    (this.courseForm.get("authors") as FormArray).push(
      new FormControl(author.id)
    );
  }

  removeAuthor(author: { id: number; name: string }): void {
    this.authorsList.push(author);
    this.courseAuthors = this.courseAuthors.filter((a) => a.id !== author.id);

    const authorsArray = this.courseForm.get("authors") as FormArray;
    const index = authorsArray.controls.findIndex((c) => c.value === author.id);
    if (index !== -1) {
      authorsArray.removeAt(index);
    }
  }

  createAuthor(): void {
    const newAuthorName = this.courseForm.get("author")?.value;
    if (newAuthorName) {
      const newAuthor = {
        id: Math.floor(Math.random() * 1000),
        name: newAuthorName,
      };
      this.authorsList.push(newAuthor);
      this.courseForm.get("author")?.reset();
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log("Form Submitted!", this.courseForm.value);
    }
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
