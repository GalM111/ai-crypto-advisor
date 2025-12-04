// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class User {
  private readonly API_URL = 'https://your-api-server.com/api';

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(`${this.API_URL}/profile`);
  }

  // Add other user-related methods here
}
