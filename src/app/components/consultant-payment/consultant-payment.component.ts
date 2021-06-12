import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-consultant-payment',
  templateUrl: './consultant-payment.component.html',
  styleUrls: ['./consultant-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantPaymentComponent implements OnInit {

  @Input() payments: any;
  @Input() noPayments: boolean;
  gotPayment = false;

  constructor( private data:DataService) {
    this.data.gotPayments
      .subscribe(value => {
        this.gotPayment = value;
      });
    console.log("Consultant Payments ==>", this.payments);
  }

  ngOnInit() {}

  formatDate(date){
    return moment(date).format('MMM DD, YYYY')
  }

}
