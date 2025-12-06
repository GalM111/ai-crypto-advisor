import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UpdateUserDataDto } from '../models/updateUserData.interface';
import { UserData } from '../models/user-data';

export interface CreateUserDataDto {
  name: string;
  email: string;
  assets: string[];
  investorType: string | null;
  contentType: string[];
}

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  private readonly API_URL = `${environment.userManagerServiceUrl}/api`;
  public currentUserData: UserData;

  constructor(private http: HttpClient) {
    this.currentUserData = (
      JSON.parse(localStorage.getItem('currentUserData') || '{}')
    );
  }


  public getUserDataByEmail(email: string) {

    const params = new HttpParams().set('email', email.trim());
    this.http.get<any>(`${this.API_URL}/userdata/email`, { params }).subscribe({
      next: (res) => {
        localStorage.setItem('currentUserData', JSON.stringify(res));
        console.log(res);

      },
      error: (err) => {
        console.error('Error loading user:', err);
      }
    });
    // return
  }

  // public postNewUserData(id: string) {

  //   // const params = new HttpParams().set('email', email.trim());
  //   this.http.post<any>(`${this.API_URL}/userdata`, { params }).subscribe({
  //     next: (res) => {
  //       localStorage.setItem('currentUserData', JSON.stringify(res));
  //       console.log(res);

  //     },
  //     error: (err) => {
  //       console.error('Error loading user:', err);
  //     }
  //   });
  //   // return
  // }

  public createUserData(body: CreateUserDataDto): Observable<any> {
    return this.http.post(`${this.API_URL}/userdata`, body);
  }

  public updateUserData(id: string, patch: UpdateUserDataDto): Observable<any> {
    return this.http.put(`${this.API_URL}/userdata/${id}`, patch);
  }



}
