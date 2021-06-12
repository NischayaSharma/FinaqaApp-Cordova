import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueryHealthcheckPageRoutingModule } from './query-healthcheck-routing.module';

import { QueryHealthcheckPage } from './query-healthcheck.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueryHealthcheckPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [QueryHealthcheckPage]
})
export class QueryHealthcheckPageModule {}
