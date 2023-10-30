import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      uid: [''],
      name: ['', [Validators.required, Validators.minLength(4)]],
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
        await this.firebaseSvc.signUp(user);

        // Actualizar el perfil del usuario
        await this.firebaseSvc.updateUser(user.name);

        // Obtener el UID del usuario después del registro
        const userCredential = await this.firebaseSvc.signIn(user);
        const uid = userCredential.user?.uid;

        if (uid) {
          // Establecer el UID en el formulario
          this.loginForm.get('uid').setValue(uid);

          // Llamar a la función setUserInfo
          await this.setUserInfo(uid);

          // Redirigir al usuario a la página deseada después del registro
          this.router.navigate(['rol']);
        } else {
          console.error('Error durante el registro: No se pudo obtener el UID del usuario.');
        }
      } catch (error) {
        console.error('Error durante el registro:', error);
      } finally {
        loading.dismiss();
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
      delete this.loginForm.value.password;

      this.firebaseSvc.setDocument(path, this.loginForm.value).then(res => {

        this.utilsSvc.saveInLocalStorage('user', this.loginForm.value)

      }).catch(error => {
        console.log(error);
      }).finally(() => {
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