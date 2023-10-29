import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  //onsubmit() { // este es el original de aquí
  //if (this.loginForm.valid) {
  //Todos los campos están llenos, redirige a la página deseada
  //this.router.navigate(['rol']);
  //} else {
  // Muestra un mensaje de error o realiza otra acción según tus necesidades
  //console.log('Por favor, complete todos los campos.');
  //}
  //}


  //async onsubmit() {
  //if (this.loginForm.valid) {
  //try {
  //const user: User = this.loginForm.value as User;

  // Registra al usuario
  //await this.firebaseSvc.signUp( user);

  // Actualiza el perfil del usuario
  //await this.firebaseSvc.updateUser(user.name);

  // Redirige al usuario a la página deseada después del registro
  //this.router.navigate(['rol']);
  //} catch (error) {
  // Maneja errores aquí
  //console.error(error);
  //}
  //} else {
  // Muestra un mensaje de error o realiza otra acción según tus necesidades
  //console.log('Por favor, complete todos los campos.');
  //}
  //}

  async onsubmit() {
    if (this.loginForm.valid) {
      try {
        const user: User = this.loginForm.value as User;

        // Registra al usuario
        const signUpResult = await this.firebaseSvc.signUp(user);
        console.log('Registro exitoso:', signUpResult);

        // Actualiza el perfil del usuario
        const updateResult = await this.firebaseSvc.updateUser(user.name);
        console.log('Actualización del perfil exitosa:', updateResult);

        // Redirige al usuario a la página deseada después del registro
        //this.router.navigate(['rol']);
      } catch (error) {
        // Maneja errores aquí
        console.error('Error durante el registro:', error);
      }
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }

}