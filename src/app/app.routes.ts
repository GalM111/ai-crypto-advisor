import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { RegisterPage } from './register-page/register-page';
import { OnboardingPage } from './onboarding-page/onboarding-page';
import { DashboardPage } from './dashboard-page/dashboard-page';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    title: 'Welcome to Ai Crypto Advisor'
  },
  {
    path: 'register',
    component: RegisterPage,
    title: 'Register Ai Crypto Advisor'

  },
  {
    path: 'onboarding',
    component: OnboardingPage,
    title: 'onboarding Ai Crypto Advisor'

  },
  {
    path: 'dashboards',
    component: DashboardPage,
    title: 'Ai Crypto Advisor'
  }
];
