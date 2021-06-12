import { Component, OnInit } from '@angular/core';
import { Dropdown, Meeting, QueryResponse } from 'src/app/services/dtos.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { PopoverController } from '@ionic/angular';
const TODAY = moment().format()

@Component({
  selector: 'app-set-meeting',
  templateUrl: './set-meeting.page.html',
  styleUrls: ['./set-meeting.page.scss'],
})
export class SetMeetingPage implements OnInit {

  today = TODAY;
  slotList: {
    index: number,
    meetings: Meeting
  }[] = [];
  durationVal: string = 'A'
  duration: Dropdown[] = [
    {
      value: 'A',
      text: 'Select Time'
    },
    {
      value: '0.5',
      text: '30 Minutes'
    },
    {
      value: '1',
      text: '1 Hour'
    },
    {
      value: '1.5',
      text: '1:30 Hours'
    },
    {
      value: '2',
      text: '2 Hours'
    },
    {
      value: '2.5',
      text: '2:30 Hours'
    },
  ]
  queryData: QueryResponse

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private popover: PopoverController
  ) { }

  ngOnInit() {
    for (let index = 1; index < 4; index++) {
      this.slotList.push({ index: index + 1, meetings: { meetingDate: TODAY, meetingTime: TODAY, durationMin: (parseInt(this.durationVal) * 60).toString() } })
    }

    this.route.queryParams
      .subscribe(params => {
        console.log(params)
        this.queryData = JSON.parse(params.queryData);
        console.log(this.queryData);
      });
  }

  addTime() {
    var len = this.slotList.length
    this.slotList.push({ index: len + 1, meetings: { meetingDate: TODAY, meetingTime: TODAY, durationMin: (parseInt(this.durationVal) * 60).toString() } })
  }

  submit() {
    this.queryData.meetings = []
    this.slotList.forEach(element => {
      element.meetings.durationMin = (parseFloat(this.durationVal) * 60).toString()
      this.queryData.meetings.push({meetingDate: moment(element.meetings.meetingDate).format('DD-MM-YYYY'), durationMin:element.meetings.durationMin,  meetingTime: moment(element.meetings.meetingTime).format('HH:MM') })
    })
    console.log("Final Slot List to submit", this.queryData);
    console.log(this.queryData);
    this.apiService.askQuery(this.queryData)
      .subscribe(async response => {
        console.log(response);
        if (response['errorCode'] == 0) {
          var data = JSON.parse(response['data'])
          this.router.navigate(['/sidebar/file-upload'], { queryParams: { queryId: data.queryId, amount: data.amount, transId: data.transId } })
        } else {
          var createdPopver = await this.popover.create({
            component: PopoverComponent,
            componentProps: {
              title: 'Error',
              content: response['message']
            },
            cssClass: "popovercss"
          })
          await createdPopver.present();
        }
      })
  }

}
