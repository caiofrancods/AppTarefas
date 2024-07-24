import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DadosPageRoutingModule } from './dados-routing.module';

import { ReactiveFormsModule } from '@angular/forms';

import { DadosPage } from './dados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DadosPageRoutingModule
  ],
  declarations: [DadosPage]
})
export class DadosPageModule {}
