import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss'],
})
export class SidebarPage implements OnInit {

  companyInfo = [
    {
      title: 'About Us',
      url: '/sidebar/about-us',
      icon: 'information-circle-outline'
    },
    {
      title: 'Contact Us',
      url: '/sidebar/contact-us',
      icon: 'call-outline'
    },
  ]

  profile=[
    {
      title: 'Home',
      url: '/sidebar/tabs/tabs/answer',
      icon: 'home-outline'
    },
    {
      title: 'Change Password',
      url: '/sidebar/change-password',
      icon: 'key-outline'
    },
    {
      title: 'My Profile',
      url: '/sidebar/my-profile',
      icon: 'person-circle-outline'
    },
    this.auth.$isClient? null:{
      title: 'Bank Details',
      url: '/sidebar/bank-details',
      icon: 'wallet-outline'
    }
  ]

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you Sure, You want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        { 
          text: 'Yes',
          handler: () => {
            this.auth.$isClient = true;
            this.auth.$isLoggedIn = false;
            this.auth.$loginDetails = { loginType: 2, password: "", userId: 0}
            this.router.navigateByUrl('/')
          }
        }
      ]
    });

    await alert.present();
  }

  selectedPath = '';

  constructor(private router:Router, public auth: AuthService, private alertController:AlertController) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url
      };
    });
  }

  ngOnInit() {
  }

}
