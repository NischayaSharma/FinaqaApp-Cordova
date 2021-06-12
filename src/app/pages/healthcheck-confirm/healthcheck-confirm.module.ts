import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthcheckConfirmPageRoutingModule } from './healthcheck-confirm-routing.module';

import { HealthcheckConfirmPage } from './healthcheck-confirm.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthcheckConfirmPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HealthcheckConfirmPage]
})
export class HealthcheckConfirmPageModule {}
