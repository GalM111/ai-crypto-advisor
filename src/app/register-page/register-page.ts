import { Component } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../services/auth';
import { CreateUserDataDto, UserManagerService } from '../services/user-manager.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { UserData } from '../models/user-data';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})


export class RegisterPage {

  public name: string = '';
  public email: string = '';
  public password: string = '';

  hidePassword = true;
  isLoading = false;



  constructor(private auth: Auth, private userManagerService: UserManagerService, private router: Router) { }

  public onRegister(): void {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }
    this.isLoading = true;

    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Auth registered:', response);
        this.registerUserDataAndReRoute(response?.email || this.email, response?.username || this.name);
      },
      error: (error) => {
        this.isLoading = false;
        alert('Registration failed: ' + (error.error?.message || error.message));
      },
    });
  }
  public registerUserDataAndReRoute(email: any, name: any) {
    const payload = {
      // _id: (response.data._id) as string,
      name,
      email,
      assets: [],
      investorType: null,
      contentType: []
    };

    this.userManagerService.createUserData(payload).subscribe({
      next: (res) => {
        console.log('Created:', res)
        this.userManagerService.currentUserData = res as UserData;
        localStorage.setItem('currentUserData', JSON.stringify(this.userManagerService.currentUserData));
        this.name = '';
        this.email = '';
        this.password = '';
        this.isLoading = false;
        this.router.navigate(['/onboarding']);
      },
      error: err => {
        this.isLoading = false;
        console.error('Create failed:', err);
        alert('Failed to create user profile');
      }
    });



  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
