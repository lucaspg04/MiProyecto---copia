import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afAuth: AngularFireAuth) { }




  //===== Autenticación======

  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }




}
