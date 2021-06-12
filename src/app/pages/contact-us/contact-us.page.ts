import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Dropdown, FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
  contactUsForm: FormGroup;
  topics: Dropdown[] = [
    {
      value: "General",
      text: "General"
    },
    {
      value: "Request To Join",
      text: "Request To Join"
    },
    {
      value: "App Feedback",
      text: "App Feedback"
    },
    {
      value: "Website Feedback",
      text: "Website Feedback"
    }
  ]
  topicActionSheetOptions: any = {
    header: "Select The Topic"
  }
  constructor(
    private util: UtilService,
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    private alertController:AlertController,
    private router:Router,
    private data:DataService,
  ) {
    this.contactUsForm = this.util.formFieldsToFormGroup(this.formBuilder, this.contactUsFormFields, this.contactUsForm);
  }

  ionViewDidEnter() {
    var profile = this.data.$userProfile;
    this.contactUsForm.setValue({ name: profile.userName, phone: profile.phone, email: profile.emailId, message: "", topic: 'General' })
  }

  contactUsFormFields: FormFields[] = [
    {
      placeholder: "Enter Your Name",
      labelPosition: "floating",
      controlName: "name",
      inputType: "text",
      type: "input",
      label: "Your Name",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Enter Your Phone Number",
      labelPosition: "floating",
      controlName: "phone",
      inputType: "number",
      type: "input",
      label: "Phone Number",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Enter Your email Id",
      labelPosition: "floating",
      controlName: "email",
      inputType: "email",
      type: "input",
      label: "Email",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Enter the message",
      labelPosition: "floating",
      controlName: "message",
      inputType: "text",
      type: "input",
      label: "Message",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required]
    },
    {
      placeholder: "Topic",
      labelPosition: "floating",
      controlName: "topic",
      inputType: null,
      type: "dropdown",
      label: "Topic",
      required: true,
      interfaceOptions: this.topicActionSheetOptions,
      interface: "action-sheet",
      data: this.topics,
      validators: [Validators.required],
      defaultValue: 'General',
    },
  ]

  ngOnInit() {
  }

  submit() {
    console.log(this.contactUsForm.value)
    this.apiService.contactUs(this.contactUsForm.controls['name'].value, this.contactUsForm.controls['phone'].value, this.contactUsForm.controls['email'].value, this.contactUsForm.controls['message'].value, this.contactUsForm.controls['topic'].value)
      .subscribe(async response => {
        console.log(response);
        var alert = await this.alertController.create({
          header: response['errorCode']==0? 'Success':'Error',
          message: response['message'],
          buttons: [{text:'Okay'}]
        })

        alert.present();
      })
  }

}
