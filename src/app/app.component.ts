import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { UtilService } from './services/util.service';
import { PreviousRouteService } from './services/previous-route.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router:Router,
    private auth:AuthService,
    private util:UtilService,
    private plt:Platform,
    private data: DataService,
    private prevRoute: PreviousRouteService,
    private zone:NgZone,
    private screenOrientation: ScreenOrientation,
  ) {
    this.plt.ready().then(() => {
      this.data.getCountries();
      this.data.getCategories();
      this.util.checkNetwork();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
      this.zone.run(() => {
        this.plt.backButton.subscribeWithPriority(5, () => {
          console.log("Back button Clicked")
          var backRoute = this.prevRoute.getPreviousUrl();
          console.log("Previous Route ==>", this.prevRoute.getPreviousUrl());
          if (backRoute == '/network-error') {
            this.router.navigateByUrl('/home')
          } else if (this.auth.$isLoggedIn && backRoute == '/login') {
            navigator['app'].exitApp();
          } else {
            this.router.navigateByUrl(backRoute)
          }
        })
      })
    })
  }

}
