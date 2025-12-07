import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) { }

  canActivate(): boolean | UrlTree {
    const isLoggedIn = !!localStorage.getItem('currentUser');
    const hasUserData = !!localStorage.getItem('currentUserData');

    if (isLoggedIn || hasUserData) {
      return true;
    }

    this.auth.logout();
    return this.router.parseUrl('');
  }
}
