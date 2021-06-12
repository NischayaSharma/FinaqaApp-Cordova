import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Dropdown, FormFields, Loan } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-healthcheck-loan-modal',
  templateUrl: './healthcheck-loan-modal.component.html',
  styleUrls: ['./healthcheck-loan-modal.component.scss'],
})
export class HealthcheckLoanModalComponent implements OnInit {

  constructor(
    private route:Router,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private modalController: ModalController,
    public dataService:DataService) { 
    this.healthcheckModalForm = this.util.formFieldsToFormGroup(this.formBuilder, this.modalFields, this.healthcheckModalForm)
  }

  loanTypeDropdown: Dropdown[] = [
    {
      value: 1,
      text: "Home Loan"
    },
    {
      value: 2,
      text: "Car Loan"
    },
    {
      value: 3,
      text: "Personal Loan"
    },
    {
      value: 4,
      text: "Education Loan"
    },
    {
      value: 5,
      text: "Credit Card Loan"
    },
  ]
  tenureDropdown: Dropdown[] = [
    {
      value: "1",
      text: "1"
    },
    {
      value: "2",
      text: "2"
    },
    {
      value: "3",
      text: "3"
    },
    {
      value: "4",
      text: "4"
    },
    {
      value: "5",
      text: "5"
    },
    {
      value: "6",
      text: "6"
    },
    {
      value: "7",
      text: "7"
    },
    {
      value: "8",
      text: "8"
    },
    {
      value: "9",
      text: "9"
    },
    {
      value: "10",
      text: "10"
    },
    {
      value: "11",
      text: "11"
    },
    {
      value: "12",
      text: "12"
    },
    {
      value: "13",
      text: "13"
    },
    {
      value: "14",
      text: "14"
    },
    {
      value: "15",
      text: "15"
    },
    {
      value: "16",
      text: "16"
    },
    {
      value: "17",
      text: "17"
    },
    {
      value: "18",
      text: "18"
    },
    {
      value: "19",
      text: "19"
    },
    {
      value: "20",
      text: "20"
    },
  ]
  loanTypeActionSheetOptions: any = {
    header: "Select the Loan type",
    cssClass: "action-sheet-class"
  }
  tenureActionSheetOptions: any = {
    header: "Select the Tenure of your Loan",
    cssClass: "action-sheet-class"
  }
  healthcheckModalForm: FormGroup;

  modalFields: FormFields[] = [
    {
      label: "Loan Type",
      labelPosition:"floating",
      controlName: "loanType",
      type:"dropdown",
      required: true,
      validators:[Validators.required],
      data: this.loanTypeDropdown,
      interface: "action-sheet",
      interfaceOptions: this.loanTypeActionSheetOptions
    },
    {
      label:"Outstanding Balance",
      labelPosition: "floating",
      placeholder: "Today's Outstanding balance in Rs.",
      controlName: "balance",
      type: "input",
      inputType: "number",
      required: true,
      validators: [Validators.required]
    },
    {
      label: "Rate of Interest",
      labelPosition: "floating",
      placeholder: "Per Annum interest rate",
      controlName: "rate",
      type: "input",
      inputType: "number",
      required: true,
      validators: [Validators.required, Validators.max(100)]
    },
    {
      label: "Tenure in Yrs.",
      labelPosition: "floating",
      controlName: "tenure",
      type: "dropdown",
      required: true,
      validators: [Validators.required],
      data: this.tenureDropdown,
      interface: "action-sheet",
      interfaceOptions: this.tenureActionSheetOptions
    },
    {
      label: "EMI in Rs.",
      labelPosition: "floating",
      placeholder: "Enter your EMI",
      controlName: "emi",
      type: "input",
      inputType: "number",
      required: true,
      validators: [Validators.required]
    },
  ]

  ngOnInit() {}

  async saveButton() {
    var data: Loan;
    var formData = this.healthcheckModalForm.value;
    data = {
      balance: formData.balance,
      emi: formData.emi,
      loanType: formData.loanType,
      rate: formData.rate,
      tenure: formData.tenure
    }
    console.log(data);

    this.dataService.$healthcheck = { assets: this.dataService.$healthcheck.assets, loan: [...this.dataService.$healthcheck.loan, data] }
    await this.modalController.dismiss(data);
  }

  async cancel() {
    await this.modalController.dismiss();
    if (!(this.dataService.$healthcheck.loan.length>0)) {
      this.route.navigateByUrl('/sidebar/healthcheck')
    }
  }

  async skip() {
    this.route.navigateByUrl('/sidebar/healthcheck-confirm')
    await this.modalController.dismiss();
  }

}