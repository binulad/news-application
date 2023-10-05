import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}

  setIdToken(token: string | undefined) {
    if (token) {
      localStorage.setItem('IdToken', token);
    }
  }

  getIdToken() {
    return localStorage.getItem('IdToken');
  }

  clearSession() {
    localStorage.clear();
  }
}
