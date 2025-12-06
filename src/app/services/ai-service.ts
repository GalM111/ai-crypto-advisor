import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private API_URL = `${environment.dashboardUrl}`
  constructor(private http: HttpClient) { }

  public generateAiContentByPrompt(prompt: string): Observable<any[]> {
    console.log(prompt);

    return this.http.post<any>(`${this.API_URL}/ai`, { prompt })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }


  public generateInsights(payload: UserData): Observable<any> {
    return this.http.post<UserData>(`${this.API_URL}/aiInsights`, payload);
  }
}
