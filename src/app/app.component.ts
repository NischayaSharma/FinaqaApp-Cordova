import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Platform } from '@ionic/angular';
// import { Network } from '@capacitor/network';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { UtilService } from './services/util.service';

const { Network } = Plugins
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
  ) {
    this.plt.ready().then(() => {
      this.data.getCountries();
      this.data.getCategories();
      // this.util.checkNetwork();
    })
  }

}
