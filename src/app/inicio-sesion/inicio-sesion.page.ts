import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  userModel: User;
  loginForm: FormGroup;
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña


  constructor(
    private formBuilder: FormBuilder, private router: Router, private toastController: ToastController,private afAuth: AngularFireAuth, private firestore: AngularFirestore) {
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

        const user = await this.afAuth.currentUser;

        if (user) {
          this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges()
            .subscribe((userFirestore: User) => {
              this.userModel = userFirestore;
              console.log('Datos del usuario model:', this.userModel);
              this.utilsSvc.saveInLocalStorage('name',this.userModel.name); // Almacena el nombre
              this.utilsSvc.saveInLocalStorage('apellido',this.userModel.apellido); // Almacena el nombre
              this.utilsSvc.saveInLocalStorage('email', this.userModel.email); // Almacena el nombre
              this.utilsSvc.saveInLocalStorage('telefono', this.userModel.telefono); // Recupera el teléfono
              this.utilsSvc.saveInLocalStorage('rol', this.userModel.rol); 
            });
        } else {
          console.log('No hay usuario autenticado.');
        }

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