import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealhcheckPageRoutingModule } from './healthcheck-routing.module';

import { HealhcheckPage } from './healthcheck.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealhcheckPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  declarations: [HealhcheckPage]
})
export class HealthcheckPageModule {}
