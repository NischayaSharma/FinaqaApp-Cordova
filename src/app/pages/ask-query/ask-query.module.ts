import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskQueryPageRoutingModule } from './ask-query-routing.module';

import { AskQueryPage } from './ask-query.page';
import { compileNgModule } from '@angular/compiler';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AskQueryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AskQueryPage]
})
export class AskQueryPageModule {}
