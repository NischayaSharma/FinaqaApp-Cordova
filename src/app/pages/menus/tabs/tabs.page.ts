import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  activeTabName: string;
  activeTab: HTMLElement;

  constructor(private router:Router, public dataService:DataService, public auth:AuthService) { }

  tabsChange(tabsRef: IonTabs) {
    this.activeTabName = tabsRef.outlet.activatedView.stackId;
    this.activeTab = tabsRef.outlet.activatedView.element;
    console.log("Active Tab ==> ",this.activeTab);
  }

  ionViewWillLeave() {
    this.propagateToActiveTab('ionViewWillLeave');
  }

  ionViewDidLeave() {
    this.propagateToActiveTab('ionViewDidLeave');
  }

  ionViewWillEnter() {
    this.propagateToActiveTab('ionViewWillEnter');
  }

  ionViewDidEnter() {
    this.propagateToActiveTab('ionViewDidEnter');
  }

  private propagateToActiveTab(eventName: string) {
    if (this.activeTab) {
      this.activeTab.dispatchEvent(new CustomEvent(eventName));
    }
  }

  ngOnInit() { }

}
