import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-perfilconductor',
  templateUrl: './perfilconductor.page.html',
  styleUrls: ['./perfilconductor.page.scss'],
})
export class PerfilconductorPage implements OnInit {

  constructor(private router:Router, public utilsSvc: UtilsService) { }

  ngOnInit() {
  }

}
