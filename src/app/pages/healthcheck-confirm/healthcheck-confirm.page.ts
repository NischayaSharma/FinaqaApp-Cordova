import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Healthcheck } from 'src/app/services/dtos.service';
import 'capacitor-razorpay';
import { Plugins } from '@capacitor/core';
import { UtilService } from 'src/app/services/util.service';

const { Checkout } = Plugins;


@Component({
  selector: 'app-healthcheck-confirm',
  templateUrl: './healthcheck-confirm.page.html',
  styleUrls: ['./healthcheck-confirm.page.scss'],
})
export class HealthcheckConfirmPage implements OnInit {


  userProfile = {
    userName: "",
    photoUrl: "",
    phone: "",
    skypeId: "",
    emailId: "",
  }

  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private router: Router,
    private apiService:ApiService,
    private util:UtilService) {
    this.healthcheckData = dataService.$healthcheck;
  }
  healthcheckData: Healthcheck ;


  async getProfile() {
    this.userProfile = this.dataService.$userProfile;
  }

  async save() {
    console.log(this.healthcheckData);

    var modal = await this.util.loadingModal();
    await this.getProfile();
    await this.apiService.submitHealthCheck(this.healthcheckData)
      .subscribe( async response => {
        console.log(response);
        modal.dismiss();
        if (response['errorCode']==0) {
          var data = JSON.parse(response['data'])
          const alert = await this.util.paymentAlert(data.amount, data.queryId, this.userProfile, data.transId)
        }
      })
  }

  ngOnInit() {
  }

}
