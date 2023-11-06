import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-detalleconductor',
  templateUrl: './detalleconductor.page.html',
  styleUrls: ['./detalleconductor.page.scss'],
})
export class DetalleconductorPage implements OnInit {

  viaje: any

  pasajeros: any[] = [];

  constructor(private afs: AngularFirestore, private router:Router) {}

  ngOnInit() {
    this.viaje = this.utilsSvc.getFromLocalStorage('viaje');

    const viajeId = this.utilsSvc.getId()

    if (this.viaje) {
      // Obtén la subcolección "pasajeros" del documento de viaje actual
      this.afs
        .collection(`viajes/${viajeId}/pasajeros`)
        .valueChanges()
        .subscribe((pasajeros: any[]) => {
          this.pasajeros = pasajeros;
        });
    }
  }

  utilsSvc = inject(UtilsService);

  
  
  onClick(){

    const viajelocale = this.utilsSvc.getId()

    const viajeRef = this.afs.collection('viajes').doc(viajelocale);

// Realiza la actualización para cambiar 'viaje_disponible' a false.
  this.router.navigate(['folder/folder']);
  viajeRef.update({ viaje_disponible: true })
  
  .then(() => {
    console.log('Viaje finalizado con éxito.');
    // Realiza cualquier otra acción después de finalizar el viaje.
  })
  .catch((error) => {
    console.error('Error al finalizar el viaje: ', error);
  });

  }

}
