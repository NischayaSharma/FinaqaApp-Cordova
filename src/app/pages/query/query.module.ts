import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueryPageRoutingModule } from './query-routing.module';

import { QueryPage } from './query.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [QueryPage]
})
export class QueryPageModule {}
