import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthcheckLoanPageRoutingModule } from './healthcheck-loan-routing.module';

import { HealthcheckLoanPage } from './healthcheck-loan.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthcheckLoanPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [HealthcheckLoanPage]
})
export class HealthcheckLoanPageModule {}
