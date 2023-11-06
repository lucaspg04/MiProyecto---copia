import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from '@angular/fire/firestore';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  viaje: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private afs:AngularFirestore
  ) { }

  utilsSvc = inject(UtilsService);

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state && state['viaje']) {
      this.viaje = state['viaje'];
      console.log('Viaje recibido:', this.viaje );
    } else {
      console.log('No se encontró un objeto de viaje en el estado.');
    }
  }
  

  async onClick() {
    // Reducir el número de asientos disponibles en 1
    this.viaje.asientos -= 1;
  
    // Actualizar Firestore con el nuevo número de asientos disponibles
    const viajeDocRef = this.afs.collection('viajes').doc(this.viaje.uid);

    

    const pasajeroData = {
      nombre: this.utilsSvc.getFromLocalStorage('name'),
      apellido: this.utilsSvc.getFromLocalStorage('apellido'),
      email: this.utilsSvc.getFromLocalStorage('email'),
      telefono: this.utilsSvc.getFromLocalStorage('telefono')
  }
  
    try {
      await viajeDocRef.update({ asientos: this.viaje.asientos });

      const pasajerosCollectionRef = viajeDocRef.collection('pasajeros');
      
      
      await pasajerosCollectionRef.add(pasajeroData);
      //this.router.navigate(['tu-siguiente-pagina']);
    } catch (error) {
      console.error('Error al actualizar el número de asientos disponibles en Firestore:', error);
    }
  }
}
