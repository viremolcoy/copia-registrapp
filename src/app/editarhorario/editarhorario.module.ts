import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarhorarioPageRoutingModule } from './editarhorario-routing.module';

import { EditarhorarioPage } from './editarhorario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarhorarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditarhorarioPage]
})
export class EditarhorarioPageModule {}
