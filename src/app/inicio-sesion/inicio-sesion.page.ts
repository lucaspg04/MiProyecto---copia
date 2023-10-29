import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña


  constructor(
    private formBuilder: FormBuilder, private router: Router) {
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
      // Todos los campos están llenos, redirige a la página deseada
      const loading = await this.utilsSvc.loading();
      await loading.present();
      this.firebaseSvc.signIn(this.loginForm.value as User).then(res =>{
        console.log(res);
      }).catch(error =>{
        console.log(error);
      }).finally(()=>{
        loading.dismiss();
      }
      )
      //this.router.navigate(['folder/inbox']);
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }
}