import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ApiService } from 'src/app/services/api.service';
import { FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.page.html',
  styleUrls: ['./bank-details.page.scss'],
})
export class BankDetailsPage implements OnInit {

  bankDetailsForm: FormGroup;
  bankDetailsFields: FormFields[] = [
    {
      placeholder: "Enter name of the bank",
      type: "input",
      inputType: "text",
      controlName: "bankName",
      required: true,
      label: "Bank Name",
      labelPosition: "floating",
      validators: [Validators.required],
    },
    {
      placeholder: "Enter name of the branch",
      type: "input",
      inputType: "text",
      controlName: "bankBranch",
      required: true,
      label: "Branch Name",
      labelPosition: "floating",
      validators: [Validators.required],
    },
    {
      placeholder: "Enter your account number.",
      type: "input",
      inputType: "number",
      controlName: "bankAcNum",
      required: true,
      label: "Account Number",
      labelPosition: "floating",
      validators: [Validators.required, Validators.maxLength(12), Validators.minLength(12)],
    },
    {
      placeholder: "Enter the IFSC Code",
      type: "input",
      inputType: "text",
      controlName: "ifscCode",
      required: true,
      label: "IFSC Code",
      labelPosition: "floating",
      validators: [Validators.required],
    },
  ]

  details:any

  constructor( private popover:PopoverController, private route:Router, private apiService:ApiService, private util:UtilService, private formBuilder:FormBuilder ) {
    this.bankDetailsForm = util.formFieldsToFormGroup( this.formBuilder, this.bankDetailsFields, this.bankDetailsForm)
    this.apiService.consultantBankDetails()
      .subscribe( response => {
        console.log(response);
        if (response['errorCode']==0){
          var data = JSON.parse(response['data'])
          this.details = data
          this.bankDetailsForm.setValue({
            bankName: data.bankName,
            bankBranch: data.bankBranch,
            bankAcNum: data.bankAcNo,
            ifscCode: data.ifscCode
          })
        }
      })
  }

  submit() {
    console.log(this.bankDetailsForm.value);
    this.apiService.updateBankDetails(this.bankDetailsForm.value.bankName,this.bankDetailsForm.value.bankBranch,this.bankDetailsForm.value.ifscCode,this.bankDetailsForm.value.bankAcNum)
      .subscribe(async response => {
        console.log(response);
        if (response['errorCode']==0) {
          var createdPopver = await this.popover.create({
            component: PopoverComponent,
            componentProps: {
              title: 'Details Updated',
              content: 'You bank details have been successfully updated.'
            },
            cssClass: "popovercss"
          })
          await createdPopver.present();
        } else {
          var createdPopver = await this.popover.create({
            component: PopoverComponent,
            componentProps: {
              title:'Details Updated',
              content:response['message']
            },
            cssClass: "popovercss"
          })
          await createdPopver.present();
          await createdPopver.onDidDismiss()
            .then(() => {
              this.bankDetailsForm.setValue({
                bankName:"",
                bankBranch:"",
                bankAcNum:"",
                ifscCode:"",
              })
            })
        }
      })
  }

  ngOnInit() {
  }

}
