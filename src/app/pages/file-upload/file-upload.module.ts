import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileUploadPageRoutingModule } from './file-upload-routing.module';

import { FileUploadPage } from './file-upload.page';
import { FileUploadModule } from 'ng2-file-upload';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadPageRoutingModule,
    ComponentsModule,
    FileUploadModule,
  ],
  declarations: [FileUploadPage]
})
export class FileUploadPageModule {}
