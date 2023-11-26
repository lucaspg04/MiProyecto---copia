import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilsService } from '../services/utils.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Rolpermiso2Guard implements CanActivate {

  constructor(private utilsSvc: UtilsService, private firestore: AngularFirestore) {
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.permiso();
  }

  permiso(){

    let rol = this.utilsSvc.getrol()

    if (rol === 'pasajero') {
      return true;
    } else {
      // En caso contrario, redirige a una página de acceso no autorizado o retorna false

      return false;
    }
  }
  
  
}
