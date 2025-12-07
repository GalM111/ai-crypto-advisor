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

  public email = '';
  public password = '';
  public hidePassword = true;
  public isLoading = false

  constructor(private authService: AuthService, private userManagerService: UserManagerService, private router: Router) { }
  public login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: async (user) => {
        console.log('Login successful:', user);
        this.userManagerService.getUserDataByEmail(this.email);
        this.router.navigate(['/dashboards']);

      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  public goToRegister() {
    this.router.navigate(['/register']);
  }
}
