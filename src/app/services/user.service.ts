import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.userManagerServiceUrl}`;

  constructor(private http: HttpClient) { }
  //todo delete this!

}
