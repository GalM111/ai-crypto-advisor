import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemeService {
  constructor(private http: HttpClient) { }

  getMeme(title: string): Observable<any[]> {
    console.log(title);

    return this.http.post<any[]>(`${environment.dashboardUrl}/meme`, { params: { title } });
  }

  // getMeme(title?: string) {
  //   let params = new HttpParams();
  //   if (title) {
  //     params = params.set('title', title); // requires controller to read req.query.title
  //   }
  //   return this.http.get<any>(`${environment.dashboardUrl}/meme`, { params });
  // }
}
