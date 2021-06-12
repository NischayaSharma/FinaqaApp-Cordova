import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankDetailsPage } from './bank-details.page';

const routes: Routes = [
  {
    path: '',
    component: BankDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankDetailsPageRoutingModule {}
