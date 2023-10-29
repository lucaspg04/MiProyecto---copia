import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña


    constructor(
    private formBuilder: FormBuilder,private router: Router) {
      this.loginForm = this.formBuilder.group({
        user:['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]], 
      }); 
    }

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


  onsubmit() {
    if (this.loginForm.valid) {
      // Todos los campos están llenos, redirige a la página deseada
      this.router.navigate(['folder/inbox']);
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }
}