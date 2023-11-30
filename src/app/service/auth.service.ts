import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import User from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeName = 'test@gmail.com';
  fakePassword = '123456';

  constructor(private _firestore: Firestore) { }

  isLoggedIn(): boolean {
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

  registerData(user: User) {
    const addRegister = collection(this._firestore, 'clients');
    return addDoc(addRegister, user);
  }
}
