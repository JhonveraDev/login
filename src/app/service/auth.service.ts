import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
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

  registerData(user: User): Observable<any> {
    try {
      const addRegister = collection(this._firestore, 'clients');
      return from(addDoc(addRegister, user)).pipe(
        map(response => ({ success: true, message: 'Registro exitoso'})));
    } catch (error) {
      return of({
        success: false,
        message: 'Fallo al registrar al cliente. Por favor, inténtelo de nuevo más tarde o póngase en contacto con el equipo de soporte.'
      });
    }
  }
}
