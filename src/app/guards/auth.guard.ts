import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firebaseService: FirebaseService,  private afAuth: AngularFireAuth) {}

  async canActivate(): Promise<boolean> {
    // Verificar la autenticación usando el servicio de Firebase
    const user = await this.afAuth.currentUser;

    if (user) {
      // El usuario está autenticado, permite el acceso
      return true;
    } else {
      // El usuario no está autenticado, redirige a la página de inicio de sesión
      this.router.navigate(['/inicio-sesion']);
      return false;
    }
  }
}
