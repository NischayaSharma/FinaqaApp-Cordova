import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryHealthcheckPage } from './query-healthcheck.page';

const routes: Routes = [
  {
    path: '',
    component: QueryHealthcheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueryHealthcheckPageRoutingModule {}
