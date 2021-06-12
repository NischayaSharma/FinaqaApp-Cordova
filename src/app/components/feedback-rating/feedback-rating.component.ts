import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-rating',
  templateUrl: './feedback-rating.component.html',
  styleUrls: ['./feedback-rating.component.scss'],
})
export class FeedbackRatingComponent implements OnInit {

  public rating: number = 3;

  constructor( private popover:PopoverController) { }

  logRatingChange(value) {
    this.rating = value;
    console.log(value);
  }

  submitFeedback() {
    this.popover.dismiss(this.rating)
  }

  ngOnInit() {}

}
