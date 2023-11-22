import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeName = 'Anderson';
  fakePassword = 'Hola123!';

  constructor() { }

  isLoggedIn():boolean {
    return sessionStorage.getItem("token") ? true : false;
  }

  Login(name: string, password: string): Observable<boolean> {
    if (name === this.fakeName && password === this.fakePassword) {
      sessionStorage.setItem("token", "true");
      return of(true);
    } else {
      this.loggedOut();
      return of(false);
    }
  }

  loggedOut() {
    sessionStorage.removeItem("token");
  }
}
