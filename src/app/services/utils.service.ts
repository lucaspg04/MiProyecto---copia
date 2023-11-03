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

}
