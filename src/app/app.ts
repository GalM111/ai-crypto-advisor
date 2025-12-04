import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomePage } from "./welcome-page/welcome-page";
import { RegisterPage } from "./register-page/register-page";
import { OnboardingPage } from "./onboarding-page/onboarding-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomePage, RegisterPage, OnboardingPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-crypto-advisor');
}
