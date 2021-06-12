import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { Payment } from 'src/app/services/dtos.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  clientPayments: Payment[] = []
  consPayments: any = [];
  noPayments = false;

  getPayments() {
    console.log("in payemnts Page");
      if (this.auth.$isClient) {
        this.apiService.getClientPayment()
          .subscribe(data => {
            console.log("Payments ==>", data);
            if (data["errorCode"] == 0) {
              var payments = JSON.parse(data['data'])
              console.log(payments);
              payments.forEach(element => {
                var payment: Payment = {
                  queryTitle: element.queryTitle,
                  queryDesc: element.queryDesc,
                  paid: element.paid,
                  paymentDate: moment(element.paymentDate).format('MMM DD, YYYY'),
                  paymentStatus: element.paymentStatus,
                  queryId: element.queryId,
                  queryType: element.queryType,
                  isFree: element.isFree,
                  amount: element.amount,
                }
                this.clientPayments = [...this.clientPayments, payment]
              });
              this.data.gotPayments.next(true)
            }
            if (data['errorCode']==223) {
              this.noPayments = true;
              this.data.gotPayments.next(true)
            }
          })
      } else {
        this.apiService.getConsultantPayment()
          .subscribe(data => {
            console.log(data);
            if (data['errorCode'] == 0) {
              var payments = JSON.parse(data['data'])
              this.consPayments = payments
              console.log(this.consPayments);
              this.data.gotPayments.next(true)
            }
            if (data['errorCode'] == 223) {
              this.noPayments = true;
              this.data.gotPayments.next(true)
            }

          })
      }
  }

  constructor( private apiService:ApiService, public auth:AuthService, private data:DataService) {
    console.log("loggedin ==>", this.auth.$isLoggedIn);
    console.log("client ==>", this.auth.$isClient);
    console.log("Payments ==>", this.consPayments);
  }

  ionViewDidEnter() {
    this.consPayments = []
    this.clientPayments = []
    this.data.gotPayments.next(false);
    this.noPayments = false;
    this.getPayments();
  }

  ngOnInit() {
  }

}
