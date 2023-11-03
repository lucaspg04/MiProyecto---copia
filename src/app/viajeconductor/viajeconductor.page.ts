import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { viaje } from '../models/user.model';

@Component({
  selector: 'app-viajeconductor',
  templateUrl: './viajeconductor.page.html',
  styleUrls: ['./viajeconductor.page.scss'],
})
export class ViajeconductorPage implements OnInit {
  viajeform: FormGroup; // Define el formulario

  

  constructor(private router: Router, private formBuilder: FormBuilder) {
    // Inicializa el formulario y agrega las validaciones necesarias
    this.viajeform = this.formBuilder.group({
      destino: ['', Validators.required],
      fechaHora: ['', this.fechaNoAnteriorValidator],
      numPasajeros : [''],
      valorPorPasajero: ['', Validators.required],
      
    });
  }

  ngOnInit() {
  }

  fechaNoAnteriorValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaIngresada = new Date(control.value);
    const fechaActual = new Date();
  
    if (fechaIngresada < fechaActual) {
      return { 'fechaAnterior': true };
    }
  
    return null;
  }

  onClick(ruta: string) {
    this.router.navigate(['/' + ruta]);
  }
  
  onSubmit() {
    if (this.viajeform.valid) {
      console.log("si salio");
    } else {
      console.log("Formulario inválido. Realizar acciones para manejar errores aquí.");
    }
  }
}
