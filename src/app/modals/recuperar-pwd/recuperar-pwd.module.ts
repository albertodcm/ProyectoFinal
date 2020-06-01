import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecuperarPWDPageRoutingModule } from './recuperar-pwd-routing.module';
import { RecuperarPWDPage } from './recuperar-pwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarPWDPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RecuperarPWDPage]
})
export class RecuperarPWDPageModule {}
