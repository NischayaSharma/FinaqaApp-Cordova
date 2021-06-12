import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidebarPageRoutingModule } from './sidebar-routing.module';

import { SidebarPage } from './sidebar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidebarPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SidebarPage]
})
export class SidebarPageModule {}
