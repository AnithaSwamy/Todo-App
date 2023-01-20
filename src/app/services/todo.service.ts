import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../shared/todo'
import { baseURL } from './baseUrl'

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(baseURL + "todo")
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  addTodoItem(todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Todo>(baseURL + "todo", todo, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.message)));
  }

  deleteTodoById(id: number): Observable<Todo> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete<Todo>(baseURL + "todo" + '/' + id, options)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.message)));
  }

  updateTodoById(id: number, todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Todo>(baseURL + "todo" + '/' + id, todo, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.message)));
  }

  editTodoById(id: number, todo: Todo): Observable<Todo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Todo>(baseURL + "todo" + '/' + id, todo, httpOptions)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error.message)));
  }
}
