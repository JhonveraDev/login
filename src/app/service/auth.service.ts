import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

import { Observable, from, map, of, switchMap } from 'rxjs';
import User from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _firestore: Firestore, private _authFire: AngularFireAuth) { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("token") ? true : false;
  }

  login (email: string, password: any): Observable<any> {
    return from(this._authFire.signInWithEmailAndPassword(email, password));
  }

  loggedOut() {
    sessionStorage.removeItem("token");
  }

  registerData(user: User): Observable<any> {
    try {
      const addRegister = collection(this._firestore, 'clients');
      return from(addDoc(addRegister, user)).pipe(map(() => ({ success: true, message: 'Registro exitoso'})));
    } catch (error) {
      return of({
        success: false,
        message: 'Fallo al registrar al cliente. Por favor, inténtelo de nuevo más tarde o póngase en contacto con el equipo de soporte.'
      });
    }
  }

  registerUser(email: string, password: any): Observable<any> {
    return from(this._authFire.createUserWithEmailAndPassword(email, password));
  }
}
