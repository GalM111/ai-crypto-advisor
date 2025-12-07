import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  constructor(private http: HttpClient) { }

  public getMeme(title: string): Observable<any[]> {
    return this.http.post<any[]>(`${environment.dashboardUrl}/meme`, { params: { title } });
  }
  public getMemeAi(userData: UserData): Observable<any[]> {
    return this.http.post<any[]>(`${environment.dashboardUrl}/memeAI`, { params: { userData } });
  }

}
