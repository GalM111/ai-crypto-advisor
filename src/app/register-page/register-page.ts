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

    this.auth.register(this.name, this.email, this.password).subscribe(
      (response) => {
        alert('Registration successful!');

        const payload: CreateUserDataDto = {
          name: this.name,
          email: this.email,
          assets: [],
          investorType: null,
          contentType: []
        };

        this.userManagerService.createUserData(payload).subscribe({
          next: (res) => {
            console.log('Created:', res)
            this.userManagerService.currentUserData = res as UserData;
          },
          error: err => console.error('Create failed:', err)
        });
        this.name = '';
        this.email = '';
        this.password = '';

        this.router.navigate(['/onboarding']);

      },
      (error) => {
        alert('Registration failed: ' + error.error?.message || error.message);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
