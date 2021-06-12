import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidebarPage } from './sidebar.page';

const routes: Routes = [
  {
    path: '',
    component: SidebarPage,
    children: [
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../../about-us/about-us.module').then(m => m.AboutUsPageModule)
      },
      {
        path: 'ask-query',
        loadChildren: () => import('../../ask-query/ask-query.module').then(m => m.AskQueryPageModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../../change-password/change-password.module').then(m => m.ChangePasswordPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../../contact-us/contact-us.module').then(m => m.ContactUsPageModule)
      },
      {
        path: 'discussion',
        loadChildren: () => import('../../discussion/discussion.module').then(m => m.DiscussionPageModule)
      },
      {
        path: 'healthcheck',
        loadChildren: () => import('../../healthcheck/healthcheck.module').then(m => m.HealthcheckPageModule)
      },
      {
        path: 'healthcheck-confirm',
        loadChildren: () => import('../../healthcheck-confirm/healthcheck-confirm.module').then(m => m.HealthcheckConfirmPageModule)
      },
      {
        path: 'healthcheck-loan',
        loadChildren: () => import('../../healthcheck-loan/healthcheck-loan.module').then(m => m.HealthcheckLoanPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('../../my-profile/my-profile.module').then(m => m.MyProfilePageModule)
      },
      {
        path: 'bank-details',
        loadChildren: () => import('../../bank-details/bank-details.module').then(m => m.BankDetailsPageModule)
      },
      {
        path: 'file-upload',
        loadChildren: () => import('../../file-upload/file-upload.module').then(m => m.FileUploadPageModule)
      },
      {
        path: 'set-meeting',
        loadChildren: () => import('../../set-meeting/set-meeting.module').then(m => m.SetMeetingPageModule)
      },
      // {
      //   path: 'set-meeting',
      //   loadChildren: () => import('../../set-meeting-without-button/set-meeting.module').then(m => m.SetMeetingPageModule)
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidebarPageRoutingModule {}
