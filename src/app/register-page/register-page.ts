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
import { switchMap, tap } from 'rxjs';

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
  public hidePassword = true;
  public isLoading = false;



  constructor(private auth: Auth, private userManagerService: UserManagerService, private router: Router) { }

  public onRegister(): void {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

    this.isLoading = true;

    this.auth.register(this.name, this.email, this.password)
      .pipe(
        switchMap((response: any) => {
          const email = response?.email || this.email;
          const name = response?.username || this.name;
          return this.registerUserData(email, name);
        })
      )
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/onboarding']);
        },
        error: (error) => {
          this.isLoading = false;
          console.error(error);
          alert('Registration failed: ' + (error.error?.message || error.message || 'Unknown error'));
        }
      });
  }

  private registerUserData(email: string, name: string) {
    const payload = { name, email, assets: [], investorType: null, contentType: [] };
    return this.userManagerService.createUserData(payload).pipe(
      tap(res => {
        this.userManagerService.currentUserData = res as UserData;
        localStorage.setItem('currentUserData', JSON.stringify(this.userManagerService.currentUserData));
        this.name = '';
        this.email = '';
        this.password = '';
      })
    );
  }


  navigateToLogin() {
    this.router.navigate(['/']);
  }
}
