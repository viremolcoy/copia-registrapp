import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroHorarioPage } from './registro-horario.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroHorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroHorarioPageRoutingModule {}
