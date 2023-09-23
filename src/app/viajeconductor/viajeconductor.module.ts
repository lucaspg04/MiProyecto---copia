import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeconductorPageRoutingModule } from './viajeconductor-routing.module';

import { ViajeconductorPage } from './viajeconductor.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeconductorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViajeconductorPage]
})
export class ViajeconductorPageModule {}
