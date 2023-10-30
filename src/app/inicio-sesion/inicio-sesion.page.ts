import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña


  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastController: ToastController,) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  navegarARegistro() {
    this.router.navigate(['/registro']);
  }

  navegarARecuperar() {
    this.router.navigate(['/recuperar-contrasenia']);
  }

  async onsubmit() {
    if (this.loginForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      try {
        const userCredential = await this.firebaseSvc.signIn(this.loginForm.value as User);
        const user = userCredential.user;

        // Almacena el resultado en el almacenamiento local para futuras sesiones
        this.utilsSvc.saveInLocalStorage('userName', user.displayName); // Almacena el nombre

        console.log('Inicio de sesión exitoso:', user.displayName); // Muestra el nombre en la consola

        loading.dismiss();
        this.router.navigate(['folder/inbox']);
      } catch (error) {
        console.log('Error durante el inicio de sesión:', error);

        // Muestra un toast de error
        const toast = await this.toastController.create({
          message: 'Inicio de sesión fallido. Por favor, verifica tus credenciales.',
          duration: 3000,
          position: 'top',
          color: 'danger',
        });

        await toast.present();

        // Restablecer el formulario para borrar los valores
        this.loginForm.reset();

        loading.dismiss();
      }
    } else {
      console.log('Por favor, complete todos los campos.');
    }
  }

}