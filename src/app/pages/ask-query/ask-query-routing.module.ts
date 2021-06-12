import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskQueryPage } from './ask-query.page';

const routes: Routes = [
  {
    path: '',
    component: AskQueryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQueryPageRoutingModule {}
