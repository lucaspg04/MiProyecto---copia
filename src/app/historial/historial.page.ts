import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historialViajes: any[] = [];

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService) { }

  ngOnInit() {
    
  }

}

