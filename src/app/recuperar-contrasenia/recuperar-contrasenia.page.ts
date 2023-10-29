import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage {
  loginForm: FormGroup; 
  


  constructor(private formBuilder: FormBuilder,private router: Router) { 
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', [Validators.required, Validators.minLength(4)]],
    }, {
      validators: this.passwordsMatchValidator // Agregar la validación personalizada
    });
  }

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

  

  onsubmit() {
    if (this.loginForm.valid) {
      // Todos los campos están llenos, redirige a la página deseada
      this.router.navigate(['']);
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }

}
