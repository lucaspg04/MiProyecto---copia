import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaconductorPageRoutingModule } from './paginaconductor-routing.module';

import { PaginaconductorPage } from './paginaconductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaginaconductorPageRoutingModule
  ],
  declarations: [PaginaconductorPage]
})
export class PaginaconductorPageModule {}
