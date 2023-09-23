import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajeconductor',
  templateUrl: './viajeconductor.page.html',
  styleUrls: ['./viajeconductor.page.scss'],
})
export class ViajeconductorPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  onClick(ruta:string)
  {
    this.router.navigate(['/'+ruta])
  }

}
