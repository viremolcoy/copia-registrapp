import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Importa el módulo de escáner
import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZXingScannerModule, // Agrega este módulo
    CamaraPageRoutingModule
  ],
  declarations: [CamaraPage]
})
export class CamaraPageModule {}
