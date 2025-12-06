import { Component } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../services/auth';
import { CreateUserDataDto, UserManagerService } from '../services/user-manager.service';

@Component({
  selector: 'app-register-page',
  imports: [MatFormField, MatLabel, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})


export class RegisterPage {

  public name: string = '';
  public email: string = '';
  public password: string = '';




  constructor(private auth: Auth, private userManagerService: UserManagerService) { }

  public onRegister(): void {
    if (!this.name || !this.email || !this.password) {
      alert('Please fill in all fields');
      return;
    }

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
          next: res => console.log('Created:', res),
          error: err => console.error('Create failed:', err)
        });
        this.name = '';
        this.email = '';
        this.password = '';

      },
      (error) => {
        alert('Registration failed: ' + error.error?.message || error.message);
      }
    );
  }
}
