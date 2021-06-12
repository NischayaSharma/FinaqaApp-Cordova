import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  responseMssg: string;

  constructor(
    private apiService:ApiService,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private dataService:DataService,
    private auth:AuthService,
    private router:Router) {
    this.changePasswordForm = util.formFieldsToFormGroup(this.formBuilder, this.changePassFields, this.changePasswordForm);
  }

  changePassFields: FormFields[] = [
    {
      placeholder: "Enter your Old Password",
      labelPosition: "floating",
      label: "Old Password",
      controlName: "oldPass",
      inputType: "password",
      type: "input",
      required: true,
      validators: [Validators.required],
      defaultValue: this.auth.$loginDetails.password
    },
    {
      placeholder: "Enter your New Password",
      labelPosition: "floating",
      label: "New Password",
      controlName: "newPass",
      inputType: "password",
      type: "input",
      required: true,
      validators: [Validators.required]
    },
    {
      placeholder: "Re-Type the Password to confirm",
      labelPosition: "floating",
      label: "Confirm Password",
      controlName: "cnfPass",
      inputType: "password",
      type: "input",
      required: true,
      validators: [Validators.required]
    }
  ]

  ngOnInit() {
  }

  resetPass(){
    var data = this.changePasswordForm.value
    if (data.oldPass == this.auth.$loginDetails.password){
      if (data.newPass == data.cnfPass) {
        this.apiService.changePass(data.newPass)
          .subscribe( response => {
            console.log(response);
            if (response['errorCode'] == 0) {
              this.responseMssg = "Password Changed Successfully"
              this.changePasswordForm.setValue({ oldPass: "", newPass: "", cnfPass: "" })
              this.auth.$isClient = true;
              this.auth.$isLoggedIn = false;
              this.auth.$loginDetails = { loginType: 2, password: "", userId: 0 }
              this.router.navigateByUrl('/')
            }
          })
      } else {
        this.responseMssg = "Passwords don't match"
      }
    } else {
      this.responseMssg = "Incorrect Old Password"
    }
  }

}
