import { Component, NgZone, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HealthcheckLoanModalComponent } from 'src/app/components/healthcheck-loan-modal/healthcheck-loan-modal.component';
import { DataService } from 'src/app/services/data.service';
import { Loan } from 'src/app/services/dtos.service';

@Component({
  selector: 'app-healthcheck-loan',
  templateUrl: './healthcheck-loan.page.html',
  styleUrls: ['./healthcheck-loan.page.scss'],
})
export class HealthcheckLoanPage implements OnInit {


  constructor(private modalController: ModalController, private dataService: DataService) {
    this.loanData = this.dataService.$healthcheck.loan
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.presentModal()
  }

  loanData: Loan[];
  async presentModal() {
    const modal = await this.modalController.create({
      component: HealthcheckLoanModalComponent,
      cssClass: "modalcss",
    })

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined && dataReturned.data !== null) {
        this.loanData = [...this.loanData, dataReturned.data]
        this.dataService.$healthcheck = { assets: this.dataService.$healthcheck.assets, loan: this.loanData }
        console.log("dataReturned ==> ", dataReturned);
        console.log("loanData ==> ", this.loanData);
      }
    });

    return await modal.present();
  }

}
