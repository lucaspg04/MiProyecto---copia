import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
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

  constructor(private afs: AngularFirestore, private router: Router) { }

  async ngOnInit() {

    const viaje = this.utilsSvc.getFromLocalStorage('viaje')

    this.viaje = viaje

    const viajeId = this.utilsSvc.getId()

    const db = getFirestore();


    const viajesCollection = collection(db, 'viajes');

    const unsubscribe = onSnapshot(viajesCollection, (querySnapshot) => {
      let viajesData = undefined;
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        if (data['uid'] === viajeId) {
          viajesData = data;
        }
      });
      this.viaje = viajesData;
    });

    if (this.viaje) {
      this.afs
        .collection(`viajes/${viajeId}/pasajeros`)
        .valueChanges()
        .subscribe((pasajeros: any[]) => {
          this.pasajeros = pasajeros;
        });
    }
  }


  utilsSvc = inject(UtilsService);



  onClick() {

    const viajelocale = this.utilsSvc.getId()

    const viajeRef = this.afs.collection('viajes').doc(viajelocale);

    this.router.navigate(['folder/folder']);
    viajeRef.update({ viaje_disponible: false })

      .then(() => {
        console.log();
      })
      .catch((error) => {
        console.error('Error al finalizar el viaje: ', error);
      });
  }

  recargarDatos(event: any) {
    // Verificar si el gesto fue un deslizamiento hacia abajo
    if (event.direction === 2) {  // 2 representa hacia abajo
      // Realizar la recarga de datos aquí
      location.reload(); // O la lógica de recarga específica que necesitas
    }
  }

  recargardatos() {
    // Puedes realizar la recarga de datos aquí
    location.reload(); // Esto recargará toda la página
  }
}
