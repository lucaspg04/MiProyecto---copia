import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async onClick(ruta: string) {
    // Crea una alerta
    const alert = await this.alertController.create({
      header: 'Pago Realizado',
      message: 'El pago se ha realizado exitosamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Redirige a la página 'folder' después de que se presione 'Aceptar'
            this.router.navigate(['/' + ruta]);
          }
        }
      ]
    });

    // Muestra la alerta
    await alert.present();
  }
}
