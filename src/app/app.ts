import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnboardingPage } from "./onboarding-page/onboarding-page";
import { RegisterPage } from "./register-page/register-page";
import { WelcomePage } from "./welcome-page/welcome-page";
import { DashboardPage } from "./dashboard-page/dashboard-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomePage, RegisterPage, OnboardingPage, DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-crypto-advisor');
}
