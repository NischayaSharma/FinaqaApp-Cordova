import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-query-healthcheck',
  templateUrl: './query-healthcheck.page.html',
  styleUrls: ['./query-healthcheck.page.scss'],
})
export class QueryHealthcheckPage implements OnInit {

  constructor(public auth: AuthService, private data:DataService) { }

  ngOnInit() {
  }

  goingTo(place:string) {
    this.data.$queryType = place
  }

}
