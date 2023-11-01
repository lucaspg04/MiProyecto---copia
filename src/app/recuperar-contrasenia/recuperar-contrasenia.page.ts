import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {
  loginForm: FormGroup;



  constructor(private formBuilder: FormBuilder, private router: Router, private toastController: ToastController,) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    }, {
      validators: this.passwordsMatchValidator // Agregar la validación personalizada
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const password2 = formGroup.get('password2')?.value;

    if (password === password2) {
      formGroup.get('password2')?.setErrors(null);
    } else {
      formGroup.get('password2')?.setErrors({ passwordMismatch: true }); // Contraseñas no coinciden
    }
  }

  async onsubmit() { // Marca la función como async
    if (this.loginForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();
  
      try {
        await this.firebaseSvc.sendRecoveryEmail(this.loginForm.value.email);
  
        // Restablecer el formulario para borrar los valores
        this.loginForm.reset();
  
        // Muestra un toast de éxito
        const successToast = await this.toastController.create({
          message: 'Correo de recuperación de contraseña enviado!.',
          duration: 3000,
          position: 'top',
          color: 'success',
        });
  
        await successToast.present();
      } catch (error) {
        console.log('Error durante la recuperación de contraseña:', error);
  
        let errorMessage = 'Ocurrió un error al enviar el correo de recuperación de contraseña.';
  
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'El correo electrónico proporcionado no es válido.';
        }
  
        // Muestra un toast de error
        const errorToast = await this.toastController.create({
          message: errorMessage,
          duration: 3000,
          position: 'top',
          color: 'danger',
        });
  
        await errorToast.present();
  
        // Restablecer el formulario para borrar los valores
        this.loginForm.reset();
      } finally {
        loading.dismiss();
      }
    }
  }

}
