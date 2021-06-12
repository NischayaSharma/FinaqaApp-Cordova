import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileUploadPage } from './file-upload.page';

const routes: Routes = [
  {
    path: '',
    component: FileUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileUploadPageRoutingModule {}
