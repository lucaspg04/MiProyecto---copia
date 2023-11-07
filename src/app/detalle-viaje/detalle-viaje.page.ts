import { Component, OnInit, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from '@angular/fire/firestore';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';
//import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  viaje: any;
  user: any; // Almacena la información del usuario actual (pasajero). esto agregué al último

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private afs:AngularFirestore,
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private toastController: ToastController
  ) { }

  utilsSvc = inject(UtilsService);

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state && state['viaje']) {
      this.viaje = state['viaje'];
      console.log('Viaje recibido:', this.viaje );
    } else {
      console.log('No se encontró un objeto de viaje en el estado.');
    }

    // Obtener el usuario actual (pasajero)
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }
  

  confirmado: boolean = false;

  //async onClick() {
    //if (!this.confirmado) {
      //this.viaje.asientos -= 1;
    
      //const viajeDocRef = this.afs.collection('viajes').doc(this.viaje.uid);
  //esto es lo que tenia el ++++++++++++
      //const pasajeroData = {
       // nombre: this.utilsSvc.getFromLocalStorage('name'),
        //apellido: this.utilsSvc.getFromLocalStorage('apellido'),
        //email: this.utilsSvc.getFromLocalStorage('email'),
        //telefono: this.utilsSvc.getFromLocalStorage('telefono')
      //}++++++++++++++++++++++++++++++++++++++++++++++++++++++

      //const pasajeroData = {
        //nombre: this.user.displayName,
        //apellido: this.user.apellido, // Asegúrate de que phoneNumber sea el campo correcto
       // email: this.user.email,
        //telefono: this.user.phoneNumber,
      //};//////esto es lo que hice yo+++++++++
  
      //try {
        //await viajeDocRef.update({ asientos: this.viaje.asientos });
  
        //const pasajerosCollectionRef = viajeDocRef.collection('pasajeros');
        
        //await pasajerosCollectionRef.add(pasajeroData);
        //this.confirmado = true;
      //} catch (error) {
        //console.error('Error al actualizar el número de asientos disponibles en Firestore:', error);
      //}
    //}
  //}




  async onClick() {
    if (!this.confirmado) {
      this.viaje.asientos -= 1;

      const viajeDocRef = this.afs.collection('viajes').doc(this.viaje.uid);

      if (this.user) {
        //const newUID = uuidv4();
        // El usuario está autenticado, ahora puedes actualizar su perfil
        const pasajeroData = {
          nombre: this.user.displayName, // Actualiza el nombre a displayName
          apellido: this.utilsSvc.getFromLocalStorage('apellido'),
          email: this.user.email,
          telefono: this.utilsSvc.getFromLocalStorage('telefono'),
          viaje_uid: this.viaje.uid, // Almacena el ID del viaje relacionado
          //uid: newUID,
        };

        try {
          await viajeDocRef.update({ asientos: this.viaje.asientos });

          const pasajerosCollectionRef = viajeDocRef.collection('pasajeros');

          await pasajerosCollectionRef.add(pasajeroData);

           // Mostrar un mensaje de éxito con un Toast
        const toast = await this.toastController.create({
          message: 'Viaje reservado con éxito',
          duration: 3000, // Duración del Toast en milisegundos
          position: 'top', // Posición del Toast
          cssClass: 'green-toast', // Agrega la clase CSS personalizada
        });
        toast.present(); // Muestra el Toast
          this.confirmado = true;
        } catch (error) {
          console.error('Error al actualizar el número de asientos disponibles en Firestore:', error);
        }
      } else {
        // Manejar el caso en el que no haya un usuario autenticado
        // Por ejemplo, mostrar un mensaje de error o redirigir al usuario a la página de inicio de sesión.
        console.error("No hay un usuario autenticado.");
      }
    }
  }
}
