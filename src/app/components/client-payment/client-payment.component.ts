import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Payment } from 'src/app/services/dtos.service';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientPaymentComponent implements OnInit {

  @Input() payments: Payment[];
  @Input() noPayments: boolean;
  gotPayments = false;

  constructor( private data:DataService ) {
    this.data.gotPayments
      .subscribe( value => {
        this.gotPayments = value
      })
  }

  ngOnInit() {}

}
