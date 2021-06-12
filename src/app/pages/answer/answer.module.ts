import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnswerPageRoutingModule } from './answer-routing.module';

import { AnswerPage } from './answer.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnswerPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnswerPage]
})
export class AnswerPageModule {}
