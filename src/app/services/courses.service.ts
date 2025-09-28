import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
export class CoursesService {
  private apiUrl = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}
  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/all`);
  }

  createCourse(courseData: CourseUpdateData): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrl}/courses/add`, courseData);
  }

  editCourse(id: string, courseData: CourseUpdateData): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, courseData);
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(textFragment: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/all`, {
      params: { title: textFragment },
    });
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }
}
