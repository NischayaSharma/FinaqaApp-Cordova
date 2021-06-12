import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { LoadingModalComponent } from '../components/loading-modal/loading-modal.component';
import { ApiService } from './api.service';
import { FormFields, UserProfile } from './dtos.service';
import 'capacitor-razorpay';
import { Plugins, NetworkStatus } from '@capacitor/core';
import { AuthService } from './auth.service';

const { Checkout } = Plugins;
const { Network } = Plugins;



@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private alertController: AlertController,
    private apiService:ApiService,
    private router:Router,
    private auth:AuthService,
  ) { }

  public formFieldsToFormGroup(formBuilder:FormBuilder, fields: FormFields[], group: FormGroup): FormGroup {
    let fg = {}
    fields.forEach(element => {
      fg[element.controlName] = new FormControl({value: element.defaultValue, disabled: element.disabled? element.disabled:false}, element.validators)
    });
    group = formBuilder.group(fg)
    return group
  }

  public async checkNetwork (successUrl?:string) {
    var networkListener = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", JSON.stringify(status));
      if (!status.connected) {
        this.router.navigateByUrl('/network-error')
        this.auth.$isClient = true;
        this.auth.$isLoggedIn = false;
        this.auth.$loginDetails = { loginType: 2, password: "", userId: 0 }
      } else {
        if (successUrl) {
          this.router.navigateByUrl(successUrl)
        } else {
          this.router.navigateByUrl('/home')
        }
      }
    });
    var networkStatus: NetworkStatus = await Network.getStatus();
    console.log(networkStatus);
    if (networkStatus.connected) {
      if (successUrl) {
        this.router.navigateByUrl(successUrl)
      } else {
        this.router.navigateByUrl('/home')
      }
    }
  }

  orderId = "";
  async handlePayment(amount: number, userProfile:UserProfile, transactionId: string) {
    const orderOptions = {
      amount: (amount * 100),  // amount in the smallest currency unit
      currency: "INR",
      receipt: transactionId,
    }
    await this.apiService.getOrderId(orderOptions)
      .then( response => {
        console.log( "Order Id => ", (response.data));
        console.log( "Id ==> ", JSON.parse(response.data).id);
        this.orderId = JSON.parse(response.data).id;
      })
    const options = {
      key: 'rzp_test_RYec9ctuWSnty6',
      order_id: this.orderId,
      amount: (amount * 100).toString(),
      description: 'Credits towards consultation',
      image: userProfile.photoUrl,
      currency: 'INR',
      name: userProfile.userName,
      prefill: {
        email: userProfile.emailId,
        contact: userProfile.phone,
        name: userProfile.userName,
      },
      theme: {
        color: '#eb0023'
      }
    }
    console.log(JSON.stringify(options));
    console.log(this.orderId);
    try {
      let data = (await Checkout.open(options));
      console.log(data.response);
      return ({ success: true, response: data })
    } catch (error) {
      console.log(error);
      return ({ success: false, response: error })
    }
  }


  public async loadingModal() {
    const modal = await this.modalController.create({
      component: LoadingModalComponent,
      cssClass: "loadingModal",
      backdropDismiss: false,
    })

    modal.present();
    return modal;
  }

  public async paymentAlert(amount: number, queryId: number, userProfile: UserProfile, transactionId: string) {
     var alert = await this.alertController.create({
      header: 'Payment of Rs.' + amount,
      message: 'You may have to pay Rs.' + amount,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Skip',
          handler: () => {
            this.router.navigateByUrl('/sidebar/tabs/tabs/answer')
          }
        },
        {
          text: 'Proceed',
          handler: async () => {
            const result = await this.handlePayment(amount, userProfile, transactionId);
            if (result.success) {
              this.apiService.payment(queryId)
                .subscribe(async response => {
                  console.log(response);
                  if (response['skipped']) {
                    this.router.navigateByUrl('/sidebar/tabs/tabs/answer')
                    this.showToast('Query Successfully Submitted')
                  }
                })
            }
          }
        }
      ]
    });
    alert.present()
    return alert;
  }

  public async showToast(message:string) {
    var toast = await this.toastController.create({
      message: message,
      duration: 2000,
      cssClass: 'toast-css',
    })
    toast.present()
    return toast;
  }

  public arrDelete(arr, elmnt?: any, indx?: number){
    arr.forEach((element, index) => {
      if(elmnt){
          if(element==elmnt){
          arr.splice(index, 1)
        }
      }
      if(indx){
        arr.splice(indx,1)
      }
    });
    return arr;
  }
}
