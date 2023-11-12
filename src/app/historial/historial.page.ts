import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Viaje, User } from '../models/user.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  viajes: Viaje[];
  usuariosPorViaje: User[];
  viajesDelUsuario: Viaje[] = [];
  viajeConsulta: Viaje;
  idPasajeroActual: string;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private utilScv: UtilsService, private afAuth: AngularFireAuth, private firestore: AngularFirestore ) { }


  ngOnInit() {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const correoUsuarioLogeado = user.email; // Utiliza el UID del usuario autenticado

        /*this.firebaseService.getViajesDePasajero(idPasajero).subscribe((viajes) => {
          //this.viajes = viajes;
          // Haz algo con los viajes obtenidos...
        }); */

        this.firestore
            .collection('viajes')
            .valueChanges()
            .subscribe((viajesFirestore: Viaje[]) => {
              this.viajes = viajesFirestore;
              console.log("viajes: ",this.viajes);
              this.viajes.forEach(viaje => {
                //this.viajeConsulta = viaje;
                this.firestore.collection(`viajes/${viaje.uid}/pasajeros`).valueChanges().subscribe((pasajeros: any) => {
                  this.usuariosPorViaje = pasajeros;
                  //console.log("usuarios por viaje: ",viaje.uid)
                  //console.log(this.usuariosPorViaje)
                  if(this.usuariosPorViaje.length > 0){
                    this.usuariosPorViaje.forEach(usuario => {
                      //console.log("correo logeado: "+user.email)
                      if(usuario.email == correoUsuarioLogeado && this.validarUidViaje(viaje.uid)){
                        //console.log("super if")
                        this.viajesDelUsuario.push(viaje)
                      }
                    });
                  }
                });
              });
            });

      }

    });
    console.log("viajes del user list: ",this.viajesDelUsuario);
    
  }

  validarUidViaje(uidViaje: string): boolean {
    // Devuelve true si no hay viajes en la lista del usuario con el mismo uidViaje
    return !this.viajesDelUsuario.some((viaje) => viaje.uid === uidViaje);
  }
    
  }



