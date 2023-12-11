import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalleconductor',
  templateUrl: './detalleconductor.page.html',
  styleUrls: ['./detalleconductor.page.scss'],
})
export class DetalleconductorPage implements OnInit {

  viaje: any

  pasajeros: any[] = [];

  constructor(private afs: AngularFirestore, private router: Router, private toastController: ToastController) { }

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



  onClick() {

    const viajelocale = this.utilsSvc.getId()

    const viajeRef = this.afs.collection('viajes').doc(viajelocale);

    
    viajeRef.update({ viaje_disponible: false })

      .then(() => {
        console.log('Viaje finalizado con éxito.');
        this.presentToast('Viaje finalizado con éxito');
        this.router.navigate(['viajeconductor']);
      })
      .catch((error) => {
        console.error('Error al finalizar el viaje: ', error);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración en milisegundos
      position: 'bottom' // Posición del toast
    });
    toast.present();
  }

  recargar() {
    location.reload();
  }

}
