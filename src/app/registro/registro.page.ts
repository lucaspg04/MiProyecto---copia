import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) { 
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    }); 
  }

  ngOnInit() {
  }

  onsubmit() {
    if (this.loginForm.valid) {
      // Todos los campos están llenos, redirige a la página deseada
      this.router.navigate(['rol']);
    } else {
      // Muestra un mensaje de error o realiza otra acción según tus necesidades
      console.log('Por favor, complete todos los campos.');
    }
  }

}