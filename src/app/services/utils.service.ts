import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  router = inject(Router)


  //======loading=========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })

  }


  //======guarda en localStorage=========
  saveInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));

  }

  //======obtiene un elemento desde localStorage=========
  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));

  }

  getrol(){
    const rol =  this.getFromLocalStorage('rol')
    return rol
  }

  getId() {
    // Obtén los datos del viaje desde el Local Storage
    const viajeData = this.getFromLocalStorage('viaje');
  
    // Comprueba si los datos del viaje y el campo 'id' existen
    if (viajeData && viajeData.id) {
      // Obtiene el ID del viaje
      const viajeId = viajeData.id;
      return viajeId;
    } else {
      // Maneja el caso en el que no se encontró un ID válido en el Local Storage
      console.log('No se encontró un ID válido del viaje en el Local Storage.');
      return null; // Puedes devolver null u otro valor predeterminado en caso de que no se encuentre un ID válido.
    }
  }
  

}
