import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from 'firebase/auth';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private afAuth: AngularFireAuth) { 
    
  }




  //===== Autenticación======


   //===== Acceder======

  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }


  signUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // Actualizar el perfil del usuario con el nombre
        return this.updateUser(user.name);
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error(error);
      });
  }


  updateUser(displayName: string) {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return user.updateProfile({ displayName });
      } else {
        // Manejar el caso en el que no haya un usuario autenticado
        // Por ejemplo, mostrar un mensaje de error o redirigir al usuario a la página de inicio de sesión.
        return Promise.reject("No hay un usuario autenticado.");
      }
    }).catch((error) => {
      // Manejar errores aquí
      console.error(error);
      return Promise.reject(error);
    });
  }





}
