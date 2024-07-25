import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddTarefasPageRoutingModule } from './add-tarefas-routing.module';

import { AddTarefasPage } from './add-tarefas.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddTarefasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddTarefasPage]
})
export class AddTarefasPageModule {}
