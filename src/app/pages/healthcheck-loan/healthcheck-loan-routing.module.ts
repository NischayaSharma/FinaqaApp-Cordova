import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthcheckLoanPage } from './healthcheck-loan.page';

const routes: Routes = [
  {
    path: '',
    component: HealthcheckLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthcheckLoanPageRoutingModule {}
