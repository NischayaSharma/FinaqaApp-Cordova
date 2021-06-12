import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.page.html',
  styleUrls: ['./query.page.scss'],
})
export class QueryPage implements OnInit {

  queryCards = [
    {
      title: "Financial Health Checks (Individuals)",
      content: "A diagnostic tool, that helps you understand how well you are managing your finances and helps you to take immediate corrective measures.",
      class: "FHC"
    },
    {
      title: "Unbiased Advice (Individuals)",
      content: "Ask our experts about investments and insurances and they will give you unbiased advice best suited for you.",
      class: "UA"
    },
    {
      title: "Tax & Estate Advice",
      content: "Take an expert's guidance on tax planning or how to leave a legacy for your next generation.",
      class: "TAEA"
    },
    {
      title: "Startups",
      content: "Guiding advice from experts to plan out your business and smooth out the teething troubles.",
      class: "STRT"
    },
    {
      title: "Proprietary Business Owner",
      content: "Know what corrective steps to take your business in the right direction with the help of experienced professionals.",
      class: "PBO"
    },
    {
      title: "Micro Small Medium Enterprises",
      content: "From Accounts or Taxation to Mergers & Acquisitions get your queries answered in a time bound manner from experts with more than 20 years experience.",
      class: "MSME"
    },
    {
      title: "Premium Services (Individuals)",
      content: "Know the best investment opprtunity in either of the countries considering source & destination od income and tax levies in respective countries.",
      class: "PS"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
