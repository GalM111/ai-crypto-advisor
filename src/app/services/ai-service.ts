import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) { }

  public generateAiContentByPrompt(prompt: string): Observable<any[]> {
    console.log(prompt);

    return this.http.post<any>(`${environment.dashboardUrl}/ai`, { prompt })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
