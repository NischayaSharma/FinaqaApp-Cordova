import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { FeedbackRatingComponent } from 'src/app/components/feedback-rating/feedback-rating.component';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.page.html',
  styleUrls: ['./answer.page.scss'],
})
export class AnswerPage implements OnInit {

  dataLoaded = false;
  answerCards = []

  getQueries() {
    console.log("in answer Page");
    this.answerCards = [];
    this.apiService.listQueries()
      .subscribe(response => {
        console.log(response);
        if (response['errorCode'] == 0) {
          var data = JSON.parse(response['data'])
          console.log(data);
          data.forEach(element => {
            this.answerCards.push({
              title: element.title,
              date: moment(element.lastUpdated).format('MMM DD, YYYY'),
              consultant: "Consultant",
              question: element.shortAnswer,
              subCategory: element.subCategory,
              closed: element.isClosed,
              closeAllowed: element.isCloseAllowed,
              feedback: element.feedbackPending,
              myTurn: element.isMyTurn,
              skipAllowed: element.isSkipable,
              id: element.queryId
            })
          });
          this.dataLoaded = true
        }
      })
  }

  queryClicked(query) {
    this.router.navigate(['/sidebar/discussion'], { queryParams: { queryId: query.id } });
  }

  constructor(
    private router:Router,
    private apiService:ApiService,
    public auth:AuthService,
    private popover:PopoverController,
    private alert:AlertController,
    private util: UtilService,
    ) { }

  async provideFeedback(item){

    var createdPopver = await this.popover.create({
      component: FeedbackRatingComponent,
      cssClass: "popovercss"
    })
    await createdPopver.present();
    await createdPopver.onDidDismiss()
      .then( async (data) => {
        console.log(data);
        if (data.data != undefined){
          this.apiService.submitFeedback(item.id, data)
            .subscribe( async response => {
              console.log(response);
              if (response['errorCode']==0) {
                this.answerCards = []
                this.getQueries()
                var toast = await this.util.showToast('Feedback submitted successfully.')
              } else {
                var pop = await this.popover.create({
                  component: PopoverComponent,
                  componentProps: {
                    title:'Error ' + response['errorCode'],
                    content: response['message']
                  },
                  cssClass: "popovercss"
                })
                await pop.present();
              }
            })
        }
      })
  }

  checkUrl(message: string) {
    return message.split('###').length > 1 ? message.split('###')[0] + " " + message.split('###')[1] : message.split('###')
  }

  async closeQuery(item) {
    const alert = await this.alert.create({
      header: 'Close',
      message: 'Are you Sure, You want to close the query?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("closed");
            this.apiService.closeQuery(item.id)
              .subscribe(async response => {
                if (response['errorCode'] == 0 ){
                  this.answerCards = []
                  this.getQueries();
                  var toast = await this.util.showToast('Query has been Successfully closed.')
                } else {
                  const successAlert = await this.alert.create({
                    header:'Error ' + response['errorCode'],
                    message: response['message'],
                    buttons: []
                  });
                  await successAlert.present();
                }
              })
          }
        }
      ]
    });

    await alert.present();
  }

  async skip(item) {
    const alert = await this.alert.create({
      header: 'Skip',
      message: 'Are you Sure, You want to skip the query forever?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("skipped");
            this.apiService.skipQuery(item.id)
              .subscribe(async response => {
                if (response['errorCode'] == 0) {
                  this.answerCards = []
                  this.getQueries();
                  var toast = await this.util.showToast('Question Skipped Successfully')
                } else {
                  const successAlert = await this.alert.create({
                    header: 'Error ' + response['errorCode'],
                    message: response['message'],
                    buttons: [{ text: 'Okay' }]
                  });
                  await successAlert.present();
                }
              })
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
  }

  ionViewDidEnter() {
    this.answerCards = []
    this.dataLoaded = false;
    this.getQueries();
    console.log("ionViewDidEnter");
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave");
  }

  ionViewDidLeave() {
    console.log("ionViewDidLeave")
  }
}
