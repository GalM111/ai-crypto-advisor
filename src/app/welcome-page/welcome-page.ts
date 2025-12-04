import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth as AuthService } from '../services/auth';
@Component({
  selector: 'app-welcome-page',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {

  public email: string = '';
  public password: string = '';

  constructor(private authService: AuthService) { }
  public login(): void {
    console.log('Login button clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('Login successful:', user);
        // Handle successful login (e.g., navigate to dashboard)
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show error message)
      }
    });
  }



}
