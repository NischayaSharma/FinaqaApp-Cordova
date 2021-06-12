import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussionPageRoutingModule } from './discussion-routing.module';

import { DiscussionPage } from './discussion.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FileUploadModule,
    DiscussionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DiscussionPage]
})
export class DiscussionPageModule {}
