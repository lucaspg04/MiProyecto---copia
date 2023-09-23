import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-conductortrackeo',
  templateUrl: './conductortrackeo.page.html',
  styleUrls: ['./conductortrackeo.page.scss'],
})
export class ConductortrackeoPage implements OnInit {

  constructor(private router:Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  async onClick(ruta: string) {
    // Crea una alerta
    const alert = await this.alertController.create({
      header: 'Pago Recibido',
      message: 'El pago se ha recibido exitosamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/' + ruta]);
          }
        }
      ]
    });

    await alert.present();
  }
}
