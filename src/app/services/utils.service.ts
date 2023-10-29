import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController,  } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);


  //======loading=========
  loading(){
    return this.loadingCtrl.create({spinner:'crescent'})

  }
}
