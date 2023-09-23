import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConductortrackeoPageRoutingModule } from './conductortrackeo-routing.module';

import { ConductortrackeoPage } from './conductortrackeo.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConductortrackeoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ConductortrackeoPage]
})
export class ConductortrackeoPageModule {}
