import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize } from "rxjs";
import { CoursesService } from "./courses.service";

interface Author {
  id: string;
  name: string;
}
interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}
interface CourseUpdateData {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private authors$$ = new BehaviorSubject<Author[]>([]);

  public courses$: Observable<Course[]> = this.courses$$.asObservable();
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  private setLoading(value: boolean): void {
    this.isLoading$$.next(value);
  }

  getAll(): void {
    this.setLoading(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (courses) => this.courses$$.next(courses),
        error: (err) => console.error("Error loading courses:", err),
      });
  }

  createCourse(courseData: CourseUpdateData): void {
    this.setLoading(true);
    this.coursesService
      .createCourse(courseData)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (newCourse) => {
          this.courses$$.next([...this.courses$$.value, newCourse]);
        },
        error: (err) => console.error("Error creating course:", err),
      });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, courseData: CourseUpdateData): void {
    this.setLoading(true);
    this.coursesService
      .editCourse(id, courseData)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (updatedCourse) => {
          const updatedCourses = this.courses$$.value.map((course) =>
            course.id === id ? updatedCourse : course
          );
          this.courses$$.next(updatedCourses);
        },
        error: (err) => console.error("Error editing course:", err),
      });
  }

  deleteCourse(id: string): void {
    this.setLoading(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: () => {
          const filteredCourses = this.courses$$.value.filter(
            (course) => course.id !== id
          );
          this.courses$$.next(filteredCourses);
        },
        error: (err) => console.error("Error deleting course:", err),
      });
  }

  filterCourses(textFragment: string): void {
    this.setLoading(true);
    this.coursesService
      .filterCourses(textFragment)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (filteredCourses) => this.courses$$.next(filteredCourses),
        error: (err) => console.error("Error filtering courses:", err),
      });
  }

  getAllAuthors(): void {
    this.setLoading(true);
    this.coursesService
      .getAllAuthors()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (authors) => this.authors$$.next(authors),
        error: (err) => console.error("Error loading authors:", err),
      });
  }

  createAuthor(name: string): void {
    this.setLoading(true);
    this.coursesService
      .createAuthor(name)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (newAuthor) => {
          this.authors$$.next([...this.authors$$.value, newAuthor]);
        },
        error: (err) => console.error("Error creating author:", err),
      });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }
}
