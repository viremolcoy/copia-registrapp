import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroHorarioPageRoutingModule } from './registro-horario-routing.module';

import { RegistroHorarioPage } from './registro-horario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroHorarioPageRoutingModule
  ],
  declarations: [RegistroHorarioPage]
})
export class RegistroHorarioPageModule {}
