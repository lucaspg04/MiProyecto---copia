import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaconductorPage } from './paginaconductor.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaconductorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaconductorPageRoutingModule {}
