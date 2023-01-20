import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from './baseUrl'
import { User } from '../shared/user'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  getAccessToken() {
    return JSON.parse(localStorage.getItem('User') || 'null');
  }

  isLoggedIn(): boolean {
    let user = JSON.parse(localStorage.getItem('User') || 'null');
    return user !== null ? true : false;
  }

  logout() {
    if (localStorage.removeItem('User') == null) {
      this.router.navigate(['login']);
    }
  }

  LoginByEmail(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + "user")
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }

  signupUser(user: User): Observable<User> {
    return this.http.post<User>(baseURL + "user", user)
      .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
  }
  
}
