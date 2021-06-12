import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Loan } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-healthcheck-loan-table',
  templateUrl: './healthcheck-loan-table.component.html',
  styleUrls: ['./healthcheck-loan-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthcheckLoanTableComponent implements OnInit {

  @Input() loanData: Loan[];
  @Input() deleteBtn: boolean = true;
  loanType = { 1: "Home Loan", 2: "Car Loan", 3: "Personal Loan", 4: "Education Loan", 5: "Credit Card Loan", }

  delete(item) {
    this.util.arrDelete(this.loanData, item, null)
    this.dataService.$healthcheck = { assets: this.dataService.$healthcheck.assets, loan: this.loanData }
  }

  constructor(private util: UtilService, private dataService:DataService) { }

  ngOnInit() {}

}
