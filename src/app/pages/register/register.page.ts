import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Dropdown, FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  registerForm: FormGroup;
  maxDate = moment(moment().subtract(18,'years')).format('YYYY-MM-DD');
  countries: Dropdown[] = this.data.$countries;
  genders: Dropdown[] = [
    {
      value: 'M',
      text: "Male"
    },
    {
      value: 'F',
      text: "Female"
    }]
  occupations: Dropdown[] = [
    {
      value: 1,
      text: "Salaried"
    },
    {
      value: 2,
      text: "Self-Employed"
    },
    {
      value: 3,
      text: "Home Maker"
    },
    {
      value: 4,
      text: "Un-employed"
    }]
  ResidentialStatuses: Dropdown[] = [
    {
      value: 1,
      text: 'Indian Resident'
    },
    {
      value: 2,
      text: "NRI"
    },
    {
      value: 3,
      text: "PIO"
    },
    {
      value: 4,
      text: "Foreign National"
    },
    {
      value: 5,
      text: "Others"
    }
  ]
  accntType: Dropdown[] = [
    {
      value: 1,
      text: 'Individual'
    },
    {
      value: 2,
      text: 'Start-Up'
    },
    {
      value: 3,
      text: 'Proprietary Business Owner'
    },
    {
      value: 4,
      text: 'MSME'
    },
  ]
  accntTypeInfo = [
    {
      header: 'Individual',
      content: 'To ask queries regarding personal finance like financial health check, insurance, investments and income tax.'
    },
    {
      header: 'Start Up',
      content: 'If you are looking for answers with regards to problems faced by start - ups, e.g.what licenses are needed, branding strategies, etc.'
    },
    {
      header: 'Proprietary Business Owner',
      content: 'Ask questions related to your proprietary business, e.g. Accounts, Pricing Model, etc.'
    },
    {
      header: 'MSME',
      content: 'For a solution oriented advice concerning questions like Dividend Payout policies, Enterprise Risk Management, Financial modeling, etc.'
    },
  ]
  tnc = false

  genderActionSheetOptions: any = {
    header: "Select Your Gender",
    cssClass: "action-sheet-class"
  }
  occupationActionSheetOptions: any = {
    header: "Select Your Occupation",
    cssClass: "action-sheet-class"
  }
  ResidentialActionSheetOptions: any = {
    header: "Select Your Residential Status",
    cssClass: "action-sheet-class"
  }
  countryActionSheetOptions: any = {
    header: "Select Your Country",
    cssClass: "action-sheet-class"
  }
  accntTypeActionSheetOptions: any = {
    header: "Select Your Account Type",
    cssClass: "action-sheet-class"
  }

  registerFormFields: FormFields[] = [
    {
      placeholder: "Enter your Name",
      labelPosition: "stacked",
      controlName: "name",
      inputType: "text",
      type: "input",
      label: "Your Name",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'person-outline'
    },
    {
      placeholder: "Enter your Email",
      labelPosition: "stacked",
      controlName: "email",
      inputType: "email",
      type: "input",
      label: "Email",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required, Validators.email],
      icon:'mail-outline'
    },
    {
      placeholder: "Enter your Password",
      labelPosition: "stacked",
      controlName: "password",
      inputType: "password",
      type: "input",
      label: "Password",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'lock-closed-outline'
    },
    {
      placeholder: "Enter your Password",
      labelPosition: "stacked",
      controlName: "cnfPassword",
      inputType: "password",
      type: "input",
      label: "Confirm Password",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'lock-closed-outline'
    },
    {
      placeholder: "Enter your Mobile Number",
      labelPosition: "stacked",
      controlName: "phone",
      inputType: "number",
      type: "input",
      label: "Phone",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required, Validators.maxLength(13), Validators.minLength(10), Validators.min(1000000000)],
      icon: 'call-outline'
    },
    {
      placeholder: "Enter Date Of Birth",
      labelPosition: "stacked",
      controlName: "dateOfBirth",
      inputType: null,
      type: "date",
      label: "Date Of Birth",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'calendar-number-outline',
      maxDateTime: this.maxDate,
      defaultValue: this.maxDate
    },
    {
      placeholder: "Enter your Gender",
      labelPosition: "stacked",
      controlName: "gender",
      inputType: null,
      type: "dropdown",
      label: "Gender",
      required: true,
      interfaceOptions: this.genderActionSheetOptions,
      interface: "action-sheet",
      data: this.genders,
      validators: [Validators.required],
      defaultValue: 'M',
      icon: 'male-female-outline'
    },
    {
      placeholder: "Enter your Skype Id",
      labelPosition: "stacked",
      controlName: "skypeId",
      inputType: "text",
      type: "input",
      label: "Skype Id",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'logo-skype'
    },
    {
      placeholder: "Enter your Country",
      labelPosition: "stacked",
      controlName: "country",
      inputType: null,
      type: "dropdown",
      label: "Country",
      required: true,
      interfaceOptions: this.countryActionSheetOptions,
      interface: "action-sheet",
      data: this.countries,
      validators: [Validators.required],
      defaultValue: "IN",
      icon: 'airplane-outline'
    },
    {
      placeholder: "Enter City Name",
      labelPosition: "stacked",
      controlName: "city",
      inputType: "text",
      type: "input",
      label: "City Name",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon: 'business-outline'
    },
    {
      placeholder: "Enter your Postal Code",
      labelPosition: "stacked",
      controlName: "postalCode",
      inputType: "number",
      type: "input",
      label: "Postal Code",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required, Validators.maxLength(6)],
      icon: 'barcode-outline'
    },
    {
      placeholder: "Enter your Occupation",
      labelPosition: "stacked",
      controlName: "occupation",
      inputType: null,
      type: "dropdown",
      label: "Occupation",
      required: true,
      interfaceOptions: this.occupationActionSheetOptions,
      interface: "action-sheet",
      data: this.occupations,
      validators: [Validators.required],
      defaultValue: 1,
      icon: 'folder-outline'
    },
    {
      placeholder: "Enter your Residential Status",
      labelPosition: "stacked",
      controlName: "resStatus",
      inputType: null,
      type: "dropdown",
      label: "Residential Status",
      required: true,
      interfaceOptions: this.ResidentialActionSheetOptions,
      interface: "action-sheet",
      data: this.ResidentialStatuses,
      validators: [Validators.required],
      defaultValue: 1,
      icon: 'home-outline'
    },
    {
      placeholder: "Choose Your Account Type",
      labelPosition: "stacked",
      controlName: "accntType",
      inputType: null,
      type: "dropdown",
      label: "Account Type",
      required: true,
      interfaceOptions: this.accntTypeActionSheetOptions,
      interface: "action-sheet",
      data: this.accntType,
      validators: [Validators.required],
      defaultValue: 1,
      icon: 'people-circle-outline'
    },
  ]

  constructor(
    private util: UtilService,
    private formBuilder: FormBuilder,
    private api:ApiService,
    private alertController:AlertController,
    private router:Router,
    private data:DataService) {
    this.registerForm = this.util.formFieldsToFormGroup(this.formBuilder, this.registerFormFields, this.registerForm)
    document.getElementById('accntTypeInfoSlides')
  }

  ngOnInit() {
  }

  // populate() {
  //   this.registerForm.setValue({
  //     name:"Demo Name",
  //     email:"demo@email.com",
  //     password: "demo",
  //     cnfPassword: "demo",
  //     phone: 124312341234,
  //     dateOfBirth: "2021-12-01T09:19:17.754+05:30",
  //     skypeId: "demo",
  //     country: "IN",
  //     city: "demo",
  //     postalCode: 1243,
  //     gender: "M",
  //     occupation: 1,
  //     resStatus: 1,
  //     accntType: 1,
  //   })
  // }

  async submit() {
    console.log(this.registerForm.value.email)
    if (this.registerForm.value.password === this.registerForm.value.cnfPassword) {
      await this.api.register(this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.name, moment(this.registerForm.value.dateOfBirth).format('YYYY-MM-DD'), this.registerForm.value.gender, this.registerForm.value.phone, this.registerForm.value.country, this.registerForm.value.city, this.registerForm.value.postalCode, this.registerForm.value.occupation, this.registerForm.value.skypeId, this.registerForm.value.resStatus, this.registerForm.value.accntType)
        .subscribe(async response => {
          console.log(response);
          if(response['errorCode']==0) {
            this.router.navigateByUrl('/login')
          } else {
            var alert = await this.alertController.create({
              header: 'Error',
              message: response['message'],
              buttons: ['Okay']
            })
            alert.present();
          }
        })

    } else {
      var alert = this.alertController.create({
        header: "Password Mismatch",
        message: "Password and Confirm Password do not match",
        buttons: []
      })
    }
  }

}
