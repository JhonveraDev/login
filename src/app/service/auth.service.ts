import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';

import { Observable, from, map, of, switchMap } from 'rxjs';
import User from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  fakeName = 'test@gmail.com';
  fakePassword = '123456';

  constructor(private _firestore: Firestore, private _authFire: AngularFireAuth) { }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("token") ? true : false;
  }

  // Login(name: string, password: string): Observable<boolean> {
  //   // const auth = getAuth
  //   if (name === this.fakeName && password === this.fakePassword) {
  //     sessionStorage.setItem("token", "true");
  //     return of(true);
  //   } else {
  //     this.loggedOut();
  //     return of(false);
  //   }
  // }

  login (email: string, password: string): Observable<any> {
    try {
      return from(this._authFire.signInWithEmailAndPassword(email, password));
    } catch (error) {
      return of({
        success: false,
        message: 'Su usuario o contraseña son incorrectos'
      });
    }
  }

  loggedOut() {
    sessionStorage.removeItem("token");
  }

  getUsers(): Observable<any> {
    const conexion = collection(this._firestore, 'clients');
    return collectionData(conexion) as Observable<any>;
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

  registerUser(email: string, password: any): Observable<any> {
    try {
      return from(this._authFire.createUserWithEmailAndPassword(email, password));
    } catch (error) {
      return of({
        success: false,
        message: 'Error al crear el usuario'
      });
    }
  }
}
