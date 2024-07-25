import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTarefasPage } from './add-tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: AddTarefasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTarefasPageRoutingModule {}
