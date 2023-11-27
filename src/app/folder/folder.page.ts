import { Component, inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  viajes: Observable<any[]>;

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  searchTerm: string = '';
  suggestions: string[] = ['Concepcion', 'Chiguayante', 'Talcahuano', 'Hualqui', 'San Pedro', 'Coronel'];
  showSuggestions: boolean = false;
  filteredSuggestions: string[] = [];
  showNoResults: boolean = false;


  constructor(
    private router:Router,
    private firestore:AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    
    const db = getFirestore();

    const viajesCollection = collection(db, 'viajes');

    const unsubscribe = onSnapshot(viajesCollection, (querySnapshot) => {
      const viajesData = [];
      querySnapshot.forEach((doc) => {
        // Maneja los datos actualizados aquí (doc.data())
        if (doc.data()["viaje_disponible"]) {
          viajesData.push(doc.data());
          this.viajes = of(viajesData);
        }else{
          this.viajes
        }
      });
      
    });
  }
  searchItems() {
    // Aquí puedes realizar la lógica de búsqueda y filtrar los elementos según 'searchTerm'
    // Por ejemplo, puedes actualizar una lista de elementos que coincidan con la búsqueda.
    // this.filteredItems = this.items.filter(item => item.includes(this.searchTerm));
  }

  updateSuggestions() {
    const lowercaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(lowercaseSearchTerm)
    );
  
    // Mostrar "No hay resultados" si no se encuentran sugerencias
    this.showNoResults = this.filteredSuggestions.length === 0;
  
    // Mostrar sugerencias en tiempo real a medida que el usuario escribe
    this.showSuggestions = this.searchTerm !== '';
  }

  

  selectSuggestion(suggestion: string) {
    this.searchTerm = suggestion;
    this.showSuggestions = false;
    this.showNoResults = false;
  }

  Viajeseleccionado(viaje){
    if (viaje) {
      this.navCtrl.navigateForward('/detalle-viaje', {
        state: { viaje: viaje }
      });
    } else {
      console.log("El objeto 'viaje' es nulo o indefinido.");
    }
  }

  onClick(ruta:string)
  {
    this.router.navigate(['/'+ruta])
  }

}

