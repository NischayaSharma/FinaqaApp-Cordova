import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { FormFields, Assets } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-healthcheck',
  templateUrl: './healthcheck.page.html',
  styleUrls: ['./healthcheck.page.scss'],
})
export class HealhcheckPage implements OnInit {


  healthcheckFields: FormFields[] = [
    {
      placeholder: "Enter your liquid assets",
      inputType: "number",
      type: "input",
      controlName: "cashAsset",
      required: true,
      label: "Cash Assests",
      labelPosition: "stacked",
      validators: [Validators.required],
      help: true,
      helpInfo: {
        header: "Cash Assests",
        subHeader: "What to fill?",
        info: "<p class='text'>Total Value of => Saving A/c, Fixed Deposit (term less than one yr), Recurring Deposit</p>"
      }
    },
    {
      placeholder: "Enter your equity assets",
      inputType: "number",
      type: "input",
      controlName: "equityAssets",
      required: false,
      label: " Equity",
      labelPosition: "stacked",
      validators: [],
      help: true,
      helpInfo: {
        header: " Equity",
        subHeader: "What to fill?",
        info: "<p class='text'>Total Value of => Shares, Fund Value of ULIPs, Equity Mututal Funds, Balance Funds (equity oriented), etc.</p>"
      }
    },
    {
      placeholder: "Enter your Debt assets",
      inputType: "number",
      type: "input",
      controlName: "debtAssets",
      required: false,
      label: "Debt",
      labelPosition: "stacked",
      validators: [],
      help: true,
      helpInfo: {
        header: "Debt",
        subHeader: "What to fill?",
        info: "<p class='text'>Total Value of => Bonds, Fixed Deposits(term > 1yr), Employee Provident Fund, Post office schemes, Public Provident Fund, Pension Funds, Debt Funds, etc.</p>"
      }
    },
    {
      placeholder: "Enter your real estate assets",
      inputType: "number",
      type: "input",
      controlName: "estateAsset",
      required: false,
      label: "Real Estate",
      labelPosition: "stacked",
      validators: [],
      help: true,
      helpInfo: {
        header: "Real Estate",
        subHeader: "What to fill?",
        info: "<p class='text'>Total Market Value of => 2<sup>nd</sup> House, Land, Shop, Office space, REITs, etc.</p>"
      }
    },
    {
      placeholder: "Enter your precious metals",
      inputType: "number",
      type: "input",
      controlName: "preciousMetals",
      required: false,
      label: "Precious Metals",
      labelPosition: "stacked",
      validators: [],
      help: true,
      helpInfo: {
        header: "Precious Metals",
        subHeader: "What to fill?",
        info: "<p class='text'>Total Value of => Gold Exchange Traded Funds, Bar, Rings, Silver coins/biscuits, etc.</p>"
      }
    }
  ]

  healthcheckForm: FormGroup;

  constructor(private util: UtilService, private formBuilder: FormBuilder, private dataService:DataService) {
    this.healthcheckForm = util.formFieldsToFormGroup(this.formBuilder, this.healthcheckFields, this.healthcheckForm)
    console.log(this.healthcheckForm);
  }

  submit() {
    var data: Assets;
    data = {
      cash: this.healthcheckForm.value.cashAsset==undefined || this.healthcheckForm.value.cashAsset == null ? 0 : this.healthcheckForm.value.cashAsset,
      equity: this.healthcheckForm.value.equityAssets==undefined || this.healthcheckForm.value.equityAssets == null ? 0 : this.healthcheckForm.value.equityAssets,
      realEstate: this.healthcheckForm.value.estateAsset==undefined || this.healthcheckForm.value.estateAsset == null ? 0 : this.healthcheckForm.value.estateAsset,
      preciousMetals: this.healthcheckForm.value.preciousMetals==undefined || this.healthcheckForm.value.preciousMetals == null ? 0 : this.healthcheckForm.value.preciousMetals,
      debt: this.healthcheckForm.value.debtAssets==undefined || this.healthcheckForm.value.debtAssets == null ? 0 : this.healthcheckForm.value.debtAssets,
    }

    this.dataService.$healthcheck = {assets : data, loan: this.dataService.$healthcheck.loan}
  }

  ngOnInit() {
  }

}
