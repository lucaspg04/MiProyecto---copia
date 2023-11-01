import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';
import { ToastController } from '@ionic/angular';
import { UserCredential } from 'firebase/auth';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,  private toastController: ToastController) {
    this.loginForm = this.formBuilder.group({
      uid: [''],
      name: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      telefono: ['+569', [Validators.pattern(/^\+569\d{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async onsubmit() {
    if (this.loginForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      try {
        const user = this.loginForm.value as User;
  
        // Use your FirebaseService to sign up the user
        const userCredential = await this.firebaseSvc.signUp(user);
  
        // Actualizar el perfil del usuario con el nombre
        await this.firebaseSvc.updateUser(user.name, user.telefono);
  
        // Obtener el UID del usuario después del registro
        const uid = userCredential.user?.uid;
  
        if (uid) {
          // Establecer el UID en el formulario
          this.loginForm.get('uid').setValue(uid);
  
          // Llamar a la función setUserInfo (if needed)
          await this.setUserInfo(uid);
  
          // Redirigir al usuario a la página deseada después del registro
          this.router.navigate(['inicio-sesion']);
  
          // Muestra un toast de registro exitoso
          const toast = await this.toastController.create({
            message: 'Registro exitoso.',
            duration: 1500,
            position: 'top',
            color: 'success',
          });
          await toast.present();
        } else {
          throw new Error('Error durante el registro: No se pudo obtener el UID del usuario.');
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
  
        // Muestra un toast de error genérico
        const toast = await this.toastController.create({
          message: 'Ups! Algo ha salido mal, inténtalo nuevamente.',
          duration: 3000,
          position: 'top',
          color: 'danger',
        });
        await toast.present();
      } finally {
        loading.dismiss();
  
        // Restablecer el formulario para borrar los valores
        this.loginForm.reset();
      }
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }

  async setUserInfo(uid: string) {
    if (this.loginForm.valid) {
      // Todos los campos están llenos, redirige a la página deseada
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      let path = `users/${uid}`;
  
      // Elimina la contraseña antes de guardarla en Local Storage
      const userData = { ...this.loginForm.value };
      delete userData.password;
  
      this.firebaseSvc.setDocument(path, userData).then(res => {
        // Guarda los datos en el Local Storage
        this.utilsSvc.saveInLocalStorage('user', userData);
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        loading.dismiss();
      });
  
      // Redirige al usuario a la página deseada después del registro
      this.router.navigate(['inicio-sesion']);
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }
  

}