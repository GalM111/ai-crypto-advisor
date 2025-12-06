import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth as AuthService } from '../services/auth';
import { environment } from '../../environments/environment';
import { UserManagerService } from '../services/user-manager.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome-page',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {

  email = '';
  password = '';
  hidePassword = true;
  isLoading = false

  constructor(private authService: AuthService, private userManagerService: UserManagerService, private router: Router) { }
  public login(): void {
    console.log(environment.dashboardUrl);

    console.log('Login button clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log(this.authService.currentUser)

    this.authService.login(this.email, this.password).subscribe({
      next: async (user) => {
        console.log('Login successful:', user);
        this.userManagerService.getUserDataByEmail(this.email);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show error message)
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }



}
