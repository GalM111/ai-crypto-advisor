import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UpdateUserDataDto } from '../models/updateUserData.interface';
import { UserData } from '../models/user-data';

export interface CreateUserDataDto {
  _id?: string,
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
  private readonly API_URL = `${environment.userManagerServiceUrl}`;
  public currentUserData: UserData;

  constructor(private http: HttpClient) {
    this.currentUserData = (
      JSON.parse(localStorage.getItem('currentUserData') || '{}')
    );
  }


  public getUserDataByEmail(email: string): Observable<UserData> {
    const params = new HttpParams().set('email', email.trim());
    return this.http.get<UserData>(`${this.API_URL}/userdata/email`, { params }).pipe(
      tap((res) => {
        this.currentUserData = res;
        localStorage.setItem('currentUserData', JSON.stringify(res));
      })
    );
  }

  public createUserData(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/userdata`, body);
  }

  public updateUserData(id: string, patch: UpdateUserDataDto): Observable<any> {
    return this.http.put(`${this.API_URL}/userdata/${id}`, patch);
  }



}
