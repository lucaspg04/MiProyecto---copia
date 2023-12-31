import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, Viaje } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  viajesModel : Viaje[];
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }

  //================ Autenticación=========================

  //===== Acceder======
  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }


  //===== Agregar usuario======

  async signUp(user: User) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);

      // Actualizar el perfil del usuario con el nombre
      await this.updateUser(user.name, user.telefono);

      return userCredential; // Devuelve el userCredential en caso de éxito
    } catch (error) {
      // Manejar errores aquí
      console.error(error);
      throw error; // Lanza el error para que sea manejado por el código que llama a signUp
    }
  }

  //===== Actualizar usuario======
  UpdateUser(displayName: string, ) {
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

  updateUser(displayName: string,  phoneNumber: string) {
    return this.afAuth.currentUser.then((user) => {
      console.log('fono'+user.phoneNumber)
      if (user) {
        const profile = {
          displayName,
          phoneNumber,
        };

        return user.updateProfile(profile);
      } else {
        return Promise.reject("No hay un usuario autenticado.");
      }
    }).catch((error) => {
      console.error(error);
      return Promise.reject(error);
    });
  }




  //===== enviar email para restablecer contraseña==========
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email)

  }

  //============================ Base de Datos=======================

  //===== setear un documento======

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }

  //===== obtener un documento=========
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();

  }

  //==== agregar un documento====
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);

  }

  obtenerViajesPorPasajero(viaje_uid: string) {
    return this.firestore.collection('viajes', ref =>
      ref.where(`pasajeros.${viaje_uid}`, '==', true)
    ).valueChanges();
  }

  getViajesDePasajero(idPasajero: string): Observable<Viaje[]> {
    this.firestore
            .collection('viajes')
            .valueChanges()
            .subscribe((viajesFirestore: any) => {
              console.log('viajes: ')
              console.log()
            });
    return null;
  }

}
