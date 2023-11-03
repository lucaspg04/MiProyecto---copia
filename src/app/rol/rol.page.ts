import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.page.html',
  styleUrls: ['./rol.page.scss'],
})
export class RolPage implements OnInit {

  constructor(
    private router:Router

  ) { }

  ngOnInit() {
  }

  onClick(ruta:string)
  {
    this.router.navigate(['/'+ruta])
  }

  guardarRol(){
    
  }
}
