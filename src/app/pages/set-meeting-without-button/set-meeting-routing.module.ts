import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetMeetingPage } from './set-meeting.page';

const routes: Routes = [
  {
    path: '',
    component: SetMeetingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetMeetingPageRoutingModule {}
