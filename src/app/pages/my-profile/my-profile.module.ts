import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilePageRoutingModule } from './my-profile-routing.module';

import { MyProfilePage } from './my-profile.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule, 
    FileUploadModule,
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
