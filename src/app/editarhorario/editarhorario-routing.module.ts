import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarhorarioPage } from './editarhorario.page';

const routes: Routes = [
  {
    path: '',
    component: EditarhorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarhorarioPageRoutingModule {}
