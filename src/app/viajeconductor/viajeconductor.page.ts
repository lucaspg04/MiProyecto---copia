import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { viaje } from '../models/user.model';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-viajeconductor',
  templateUrl: './viajeconductor.page.html',
  styleUrls: ['./viajeconductor.page.scss'],
})
export class ViajeconductorPage implements OnInit {
  viajeform: FormGroup; // Define el formulario

  

  constructor(private router: Router, private formBuilder: FormBuilder, private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    // Inicializa el formulario y agrega las validaciones necesarias
    this.viajeform = this.formBuilder.group({
      destino: ['', Validators.required],
      fechaHora: ['', this.fechaNoAnteriorValidator],
      numPasajeros : [''],
      valorPorPasajero: ['', Validators.required],
      asientos: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

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

  
  async onSubmit() {
    if (this.viajeform.valid) {
      this.afAuth.authState.subscribe(async (user) => {
        if (user) {
          const conductorData = {
            uid: user.uid,
            email: user.email,
            // Otros campos del usuario que necesitas
          };
  
          const viajeData = { ...this.viajeform.value, conductor: conductorData, viaje_disponible: true };
  
          try {
            const docRef = await this.afs.collection('viajes').add(viajeData);
            console.log('Documento guardado con ID: ', docRef.id);
            // Realiza cualquier otra acción después de guardar
          } catch (error) {
            console.error('Error al guardar el documento: ', error);
          }
        } else {
          console.error('No hay usuario autenticado.');
        }
      });
    }
  }
  
  
}
