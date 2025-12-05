import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) { }

  getNews(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.dashboardUrl}/news`);
  }


}
