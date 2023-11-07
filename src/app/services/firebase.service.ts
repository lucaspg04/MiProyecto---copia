import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';
import { sendPasswordResetEmail, getAuth } from 'firebase/auth';




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

  //=====obtiene el rol de la colección usera del usuario autenticado en firebase no funciona
  async getUserRole() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const userDoc = await this.firestore.collection('users').doc(user.uid).get().toPromise();
        if (userDoc.exists) {
          const userData: any = userDoc.data(); // Anotación de tipo como "any"
          const userRole = userData?.rol; // Asumiendo que el campo se llama "rol"
          return userRole || null; // Devuelve el rol o null si no se encuentra
        } else {
          return null; // Documento de usuario no encontrado
        }
      }
      return null; // Usuario no autenticado
    } catch (error) {
      console.error('Error al obtener el rol del usuario:', error);
      return null;
    }
  }






}
