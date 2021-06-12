import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  responseMssg = ""
  forgotFormFields: FormFields[] = [
    {
      placeholder: "Enter your Email",
      labelPosition: "stacked",
      controlName: "email",
      inputType: "email",
      type: "input",
      label: "Email",
      required: true,
      validators: [Validators.required]
    },
  ]
  forgotPasswordForm: FormGroup;
  constructor(private util: UtilService, private formBuilder: FormBuilder, private apiService:ApiService) {
    this.forgotPasswordForm = util.formFieldsToFormGroup(this.formBuilder, this.forgotFormFields, this.forgotPasswordForm)
  }

  ngOnInit() {
  }
  submit() {
    console.log(this.forgotPasswordForm.value);
    this.apiService.forgotPass(this.forgotPasswordForm.value.email)
      .subscribe( response => {
        console.log(response);
        this.responseMssg = response['message'];
      })
  }

}
