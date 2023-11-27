import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuhrPageRoutingModule } from './menuhr-routing.module';

import { MenuhrPage } from './menuhr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuhrPageRoutingModule
  ],
  declarations: [MenuhrPage]
})
export class MenuhrPageModule {}
