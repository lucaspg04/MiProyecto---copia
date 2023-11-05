import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {

  viaje: any;

  constructor(
    private router:Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit() {
    const state = this.router.getCurrentNavigation().extras.state;
    if (state && state['viaje']) {
      const viaje = state['viaje'];
      console.log('Viaje recibido:', viaje);
      this.viaje = viaje
    } else {
      console.log('No se encontró un objeto de viaje en el estado.');
    }
  }
  
  

  onClick()
  {
    //this.router.navigate(['/'+ruta])
  }

}
