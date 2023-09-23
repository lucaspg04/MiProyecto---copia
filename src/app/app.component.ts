import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Mis Viajes', url: '/historial', icon: 'car-sport' },
    { title: 'Viaje Conductor', url: 'viajeconductor', icon: 'map'},
    /* { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' }, */
    { title: 'Cerrar Sesión', url: '', icon: 'exit' },
  ];
  public labels = [/* 'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders' */];
  constructor() {}
}
