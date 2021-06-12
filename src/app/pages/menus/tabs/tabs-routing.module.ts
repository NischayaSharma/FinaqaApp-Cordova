import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'query',
        loadChildren: () => import('../../query/query.module').then(m => m.QueryPageModule)
      },
      {
        path: 'answer',
        loadChildren: () => import('../../answer/answer.module').then(m => m.AnswerPageModule)
      },
      {
        path: 'payments',
        loadChildren: () => import('../../payments/payments.module').then(m => m.PaymentsPageModule)
      },
      {
        path: 'query-healthcheck',
        loadChildren: () => import('../../query-healthcheck/query-healthcheck.module').then(m => m.QueryHealthcheckPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/query',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
