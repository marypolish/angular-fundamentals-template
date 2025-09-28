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

  getAllCourses(): void {
    this.setLoading(true);
    this.coursesService
      .getAllCourses()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (courses: Course[]) => this.courses$$.next(courses),
        error: (err: any) => console.error("Error loading courses:", err),
      });
  }

  createCourse(courseData: CourseUpdateData): void {
    this.setLoading(true);

    const newCourse: Course = {
      ...courseData,
      id: "temp-id-for-service", 
      creationDate: new Date().toISOString(), 
    };

    this.coursesService
      .createCourse(newCourse)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (newCourseFromServer: Course) => {
          this.courses$$.next([...this.courses$$.value, newCourseFromServer]);
        },
        error: (err: any) => console.error("Error creating course:", err),
      });
  }

  getCourseById(id: string): Observable<Course> {
    return this.coursesService.getCourseById(id);
  }

  editCourse(id: string, courseData: CourseUpdateData): void {
    this.setLoading(true);
    
    const updatedCourse: Course = {
      ...courseData,
      id: id,
      creationDate: new Date().toISOString(), 
    };

    this.coursesService
      .editCourse(id, updatedCourse)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (updatedCourseFromServer: Course) => {
          const updatedCourses = this.courses$$.value.map((course) =>
            course.id === id ? updatedCourseFromServer : course
          );
          this.courses$$.next(updatedCourses);
        },
        error: (err: any) => console.error("Error editing course:", err),
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
        error: (err: any) => console.error("Error deleting course:", err),
      });
  }

  filterCourses(textFragment: string): void {
    this.setLoading(true);
    this.coursesService
      .filterCourses(textFragment)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (filteredCourses: Course[]) =>
          this.courses$$.next(filteredCourses),
        error: (err: any) => console.error("Error filtering courses:", err),
      });
  }

  getAuthors(): void {
    this.setLoading(true);
    this.coursesService
      .getAuthors()
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        // Виправлено: додано явний тип Author[]
        next: (authors: Author[]) => this.authors$$.next(authors),
        // Виправлено: додано явний тип any для err
        error: (err: any) => console.error("Error loading authors:", err),
      });
  }

  createAuthor(author: Author): void {
    this.setLoading(true);
    this.coursesService
      .createAuthor(author)
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (newAuthor: Author) => {
          this.authors$$.next([...this.authors$$.value, newAuthor]);
        },
        error: (err: any) => console.error("Error creating author:", err),
      });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }
}
