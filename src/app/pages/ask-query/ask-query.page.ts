import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Dropdown, FormFields, QueryResponse } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-ask-query',
  templateUrl: './ask-query.page.html',
  styleUrls: ['./ask-query.page.scss'],
})
export class AskQueryPage implements OnInit {

  askQuery: FormGroup;
  category: Dropdown[] = this.dataService.$queryCategories;
  riskQuestions = []
  riskAnswers = []

  consultant: Dropdown[] = [
    {
      value: 'SEBI',
      text: 'SEBI Registered Investment Advisers'
    },
    {
      value: 'CA',
      text: 'Chartered Accountants'
    },
    {
      value: 'LS',
      text: 'Lawyers/Solicitors'
    },
    {
      value: 'CS',
      text: 'Company Secretaries'
    },
    {
      value: 'ICWA',
      text: 'Indian Cost and Work Accountants'
    },
    {
      value: 'CWM',
      text: 'Chartered Wealth Manager'
    },
    {
      value: 'WMC',
      text: 'Wealth Management Certification'
    },
    {
      value: 'CPA',
      text: 'Certified Public Accountants'
    },
    {
      value: 'NA',
      text: 'No Prefrence'
    },
  ]

  categoryActionSheetOptions: any = {
    header: "Select the Category",
    cssClass: "action-sheet-class"
  }
  subCategoryActionSheetOptions: any = {
    header: "Select the Sub Category",
    cssClass: "action-sheet-class"
  }
  consultantActionSheetOptions: any = {
    header: "Select Your Preferred Consultant",
    cssClass: "action-sheet-class"
  }

  askQueryFields: FormFields[] = [
    {
      placeholder: "eg. mutual fund, stocks, investment",
      labelPosition: "stacked",
      controlName: "title",
      inputType: "text",
      type: "input",
      label: "What is your query about?",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Category",
      labelPosition: "floating",
      controlName: "category",
      inputType: null,
      type: "dropdown",
      label: "Category",
      required: true,
      interfaceOptions: this.categoryActionSheetOptions,
      interface: "action-sheet",
      data: this.category,
      validators: [Validators.required],
      defaultValue: 1
    },
    {
      placeholder: "Sub Category",
      labelPosition: "floating",
      controlName: "subCategory",
      inputType: null,
      type: "subDropdown",
      label: "Sub Category",
      required: true,
      interfaceOptions: this.subCategoryActionSheetOptions,
      interface: "action-sheet",
      data: this.category,
      validators: [Validators.required],
      parentControlName:'category',
      defaultValue: 1
    },
    {
      placeholder: "Enter Query Details",
      labelPosition: "stacked",
      controlName: "query",
      inputType: "text",
      type: "textarea",
      label: "Ask Your Query",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Consultant",
      labelPosition: "floating",
      controlName: "consultant",
      inputType: null,
      type: "dropdown",
      label: "Ask Your Query To?",
      required: true,
      interfaceOptions: this.consultantActionSheetOptions,
      interface: "action-sheet",
      data: this.consultant,
      validators: [Validators.required],
      defaultValue: 'SEBI'
    },
    {
      placeholder: "Enter Your Resolution",
      labelPosition: "stacked",
      controlName: "resolution",
      inputType: "text",
      type: "input",
      label: "Expected Resolution",
      required: false,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: []
    },
  ]

  queryType:string = "";

  constructor(
    private route:Router,
    private popover:PopoverController,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    private dataService:DataService,
    private alertController:AlertController,) {
    this.askQuery = this.util.formFieldsToFormGroup(this.formBuilder, this.askQueryFields, this.askQuery)
    this.queryType = this.dataService.$queryType
    this.askQuery.get('subCategory').valueChanges.subscribe( subCat => {
      var cat = this.askQuery.get('category').value;
      console.log("subcategory==>",subCat);
      console.log("category==>", cat);
      if (subCat==2 && cat==1) {
        this.apiService.checkRisk()
          .subscribe( async response => {
            console.log(response);
            if (response['errorCode']==0) {
              var data = JSON.parse(response['data'])
              console.log(data);

              if (data.riskQuestionStatus) {
                await this.apiService.getRisk().subscribe(async response => {
                  if (response['errorCode']==0) {
                    console.log(JSON.parse(response['data']));
                    this.riskQuestions = JSON.parse(response['data'])
                    console.log(this.riskQuestions)

                    var counter = new BehaviorSubject(0)
                    counter.subscribe(async value => {
                      var questionAlert = await this.alertController.create({
                        header: this.riskQuestions[value].questionTitle,
                        inputs: this.getRiskInputs(this.riskQuestions[value]),
                        cssClass: 'alert-class',
                        backdropDismiss: false,
                        buttons: [
                          this.riskQuestions.length - 1 == value ?
                            {
                              text: "Submit",
                              handler: (data) => {
                                this.riskAnswers.push({ questionId: this.riskQuestions[value].riskQuestionId, answerId: data })
                                console.log("Answers ==> ", this.riskAnswers);
                                this.apiService.submitRisk(this.riskAnswers)
                                  .subscribe( response => {
                                    console.log(response);
                                    this.alertController.create({
                                      header: response['errorCode']==0? 'Success':'Error',
                                      message: response['message'],
                                      buttons: [
                                        {text:'Okay'}
                                      ]
                                    })
                                  })
                              }
                            } : {
                              text: "Next",
                              handler: (data) => {
                                this.riskAnswers.push({ questionId: this.riskQuestions[value].riskQuestionId, answerId: data})
                                console.log(data);
                                counter.next(value+1)
                              }
                            }
                        ]
                      })
                      questionAlert.present()
                    })
                  }
                })
              } 
            } else {
              var toast = await this.util.showToast(response['message'])
            }
          })
      }
    })
  }

  getRiskInputs(question) {
    var arr = []
    question.riskOptions.forEach(element => {
      arr.push({
        name: 'radio1',
        type: 'radio',
        label: element.optionDesc ,
        value: element.optionId,
      })
    });
    return arr;
  }

  submit() {
    var queryData: QueryResponse = {
      title: this.askQuery.get('title').value,
      categoryId: this.askQuery.get('category').value,
      subCategoryId: this.askQuery.get('subCategory').value,
      queryDesc: this.askQuery.get('query').value.replace(/\n/g, "<br>"),
      queryType: 1,
    }
    console.log(queryData);
    

    if (this.queryType == 'MEET') {
      this.route.navigate(['/sidebar/set-meeting'], { queryParams: { queryData: JSON.stringify(queryData) } })
    }
    if (this.queryType == 'ANS') {
      this.apiService.askQuery(queryData)
        .subscribe( async response => {
          console.log(response);
          if (response['errorCode'] == 0) {
            var data = JSON.parse(response['data'])
                this.route.navigate(['/sidebar/file-upload'], { queryParams: { queryId: data.queryId, amount: data.amount, transId:data.transId } })
          } else { }
        })
    }
  }

  ngOnInit() {
  }


}
