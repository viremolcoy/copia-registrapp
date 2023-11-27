import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuhrPage } from './menuhr.page';

const routes: Routes = [
  {
    path: '',
    component: MenuhrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuhrPageRoutingModule {}
