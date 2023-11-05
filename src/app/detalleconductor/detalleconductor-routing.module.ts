import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleconductorPage } from './detalleconductor.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleconductorPageRoutingModule {}
