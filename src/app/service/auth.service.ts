import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';

import { Observable, from, map, of, switchMap } from 'rxjs';
import User from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User = {
    id: '',
    name: '',
    surname: '',
    bornDate: '',
    documentType: '',
    documentNumber: 0,
    address: '',
    email: '',
    salary: 0,
    password: '',
    confirmPassword: ''
  };

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

  registerData(user: User, uid: any): Observable<any> {
    try {
      const addRegister = setDoc(doc(this._firestore, 'clients', uid), {...user});
      return from(addRegister).pipe(map(() => ({ success: true, message: 'Registro exitoso'})));
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

  getDataById(uid: any): Observable<any> {
    const docRef = doc(this._firestore, 'clients', uid);
    return from(getDoc(docRef));
  }

  writeDataById(uid: any): Observable<any> {
    return this.getDataById(uid).pipe(
      map((response) => {
        this.user = response.data();
        return { login: true };
      })
    );
  }

  getUser() {
    return this.user;
  }
}
