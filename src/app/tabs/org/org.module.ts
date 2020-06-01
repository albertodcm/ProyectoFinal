import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OrgPageRoutingModule } from './org-routing.module';
import { OrgPage } from './org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgPageRoutingModule
  ],
  declarations: [OrgPage]
})
export class OrgPageModule {}
