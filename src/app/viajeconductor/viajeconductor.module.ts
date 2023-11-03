import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeconductorPageRoutingModule } from './viajeconductor-routing.module';

import { ViajeconductorPage } from './viajeconductor.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViajeconductorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViajeconductorPage]
})
export class ViajeconductorPageModule {}
