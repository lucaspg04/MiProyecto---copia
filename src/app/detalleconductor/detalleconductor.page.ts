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

  constructor(private afs: AngularFirestore, private router:Router) { }

  ngOnInit() {
  }

  utilsSvc = inject(UtilsService);
  
  onClick(){

    const viajelocale = this.utilsSvc.getId()
    // Supongamos que tienes el ID del viaje que deseas finalizar en una variable llamada 'viajeId'.
    const viajeRef = this.afs.collection('viajes').doc(viajelocale);

// Realiza la actualización para cambiar 'viaje_disponible' a false.
  this.router.navigate(['folder/folder']);
  viajeRef.update({ viaje_disponible: false })
  
  .then(() => {
    console.log('Viaje finalizado con éxito.');
    // Realiza cualquier otra acción después de finalizar el viaje.
  })
  .catch((error) => {
    console.error('Error al finalizar el viaje: ', error);
  });

  }

}
