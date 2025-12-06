import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { UserManagerService } from './user-manager.service';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  // private readonly API_URL = 'https://your-auth-server.com/api';
  private readonly API_URL = 'http://localhost:5000/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, userManagerService: UserManagerService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get accessToken(): string {
    return this.currentUserValue?.accessToken;
  }

  public get refreshToken(): string {
    return this.currentUserValue?.refreshToken;
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, { username, email, password })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password })
      .pipe(
        map(user => {
          // store user details and tokens in local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/refresh-token`, {
      refreshToken: this.refreshToken
    }).pipe(
      tap((tokens) => {
        const user = {
          ...this.currentUserValue,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserData');
    this.currentUserSubject.next(null);
  }



  isTokenExpired(token?: string): boolean {
    if (!token) token = this.accessToken;
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(token: string): Date | undefined {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp === undefined) return undefined;

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (Error) {
      return undefined;
    }
  }
}
