import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

//import { UserCredential } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import {getFirestore, setDoc, doc, getDoc} from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { 
    
  }

//================ Autenticación=========================

   //===== Acceder======
  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }


   //===== Agregar usuario======
  signup(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
        // userCredential.user contiene el usuario recién registrado
        const newUser = userCredential.user;
        
        // newUser.uid contiene el UID del usuario
        const uid = newUser.uid;
  
        // Actualizar el perfil del usuario con el nombre
        return this.updateUser(user.name);
      })
      .catch((error) => {
        // Manejar errores aquí
        console.error(error);
        return Promise.reject(error);
      });
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

  //===== Actualizar usuario======
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


//============================ Base de Datos=======================

 //===== setear un documento======

setDocument(path: string, data: any){
  return setDoc(doc(getFirestore(),path),data);

}

 //===== obtener un documento=========
async getDocument(path: string){
  return (await getDoc(doc(getFirestore(),path))).data();

}


}
