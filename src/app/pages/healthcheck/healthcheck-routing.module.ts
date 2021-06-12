import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealhcheckPage } from './healthcheck.page';

const routes: Routes = [
  {
    path: '',
    component: HealhcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealhcheckPageRoutingModule {}
