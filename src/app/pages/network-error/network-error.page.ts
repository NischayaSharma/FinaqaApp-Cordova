import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.page.html',
  styleUrls: ['./network-error.page.scss'],
})
export class NetworkErrorPage implements OnInit {

  constructor(
    private util:UtilService,
  ) { }

  ngOnInit() {
  }
}
