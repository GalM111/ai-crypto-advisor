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
    console.log(title);

    return this.http.post<any[]>(`${environment.dashboardUrl}/meme`, { params: { title } });
  }
  public getMemeAi(userData: UserData): Observable<any[]> {
    // console.log(title);
    return this.http.post<any[]>(`${environment.dashboardUrl}/memeAI`, { params: { userData } });
  }

  // getMeme(title?: string) {
  //   let params = new HttpParams();
  //   if (title) {
  //     params = params.set('title', title); // requires controller to read req.query.title
  //   }
  //   return this.http.get<any>(`${environment.dashboardUrl}/meme`, { params });
  // }
}
