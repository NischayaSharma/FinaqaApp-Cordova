import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PaymentsComponentsModule } from 'src/app/components/payments.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentsPageRoutingModule,
    ComponentsModule,
    PaymentsComponentsModule ,
  ],
  declarations: [PaymentsPage]
})
export class PaymentsPageModule {}
