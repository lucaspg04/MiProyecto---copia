import { Component, OnInit } from '@angular/core';
//import { NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {


constructor(private navCtrl: NavController) { }

ngOnInit() {
  setTimeout(() => {
    this.navCtrl.navigateForward('/inicio-sesion');
  }, 3000); // Redirige después de 3 segundos

}
}