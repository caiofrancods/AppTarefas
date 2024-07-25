import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RelatoriosPageRoutingModule } from './relatorios-routing.module';
import { RelatoriosPage } from './relatorios.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RelatoriosPageRoutingModule
  ],
  declarations: [RelatoriosPage]
})
export class RelatoriosPageModule {}
