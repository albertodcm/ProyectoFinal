import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPWDPage } from './recuperar-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarPWDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPWDPageRoutingModule {}
