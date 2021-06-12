import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormFields } from 'src/app/services/dtos.service';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  client: boolean = this.auth.$isClient;
  user: string = this.client ? "Client" : "Consultant";
  loginForm: FormGroup;
  responseMssg:string = ""

  constructor(
    private router:Router,
    private auth: AuthService,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private data: DataService,
  ) {
    this.loginForm = util.formFieldsToFormGroup(this.formBuilder, this.loginFormFields, this.loginForm)
  }

  loginFormFields: FormFields[] = [
    {
      placeholder: "Enter Your Email",
      labelPosition: "floating",
      controlName: "email",
      inputType: "email",
      type: "input",
      label: "Email",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required, Validators.email],
      icon: 'mail-outline'
    },
    {
      placeholder: "Enter your Password",
      labelPosition: "floating",
      controlName: "password",
      inputType: "password",
      type: "input",
      label: "Password",
      required: true,
      interfaceOptions: null,
      interface: null,
      data: null,
      validators: [Validators.required],
      icon:'key-outline'
    },
  ]
  ngOnInit() {
    this.responseMssg=""
  }

  ionViewDidEnter() {
    if(this.auth.$isLoggedIn) {
      this.router.navigate(['/sidebar/tabs/tabs/answer'])
    }
  }

  submit() {
    console.log(this.loginForm.value)
    this.responseMssg = ""
    if (this.auth.$isClient){
      var loginEvent = this.apiService.clientLogin(this.loginForm.value.email, this.loginForm.value.password)
      loginEvent.subscribe(result => {
        console.log(result);
        
        if (result['errorCode'] == 0) {
          this.router.navigate(['/sidebar/tabs/tabs/query'])
          var userData = JSON.parse(result['data'])
          this.auth.$loginDetails = {loginType: this.auth.$isClient? 2:1, password: this.loginForm.value.password, userId:userData.userId}
          this.auth.$accountType = userData.accountType;
          this.auth.$isLoggedIn = true;
          this.data.getUserProfile();
        } else {
          this.responseMssg = "Incorrect Email or Password"
        }
      })
    } else {
      console.log("Consultant");
      var loginEvent = this.apiService.consultantLogin(this.loginForm.value.email, this.loginForm.value.password)
      loginEvent.subscribe(result => {
        console.log(result);
        this.responseMssg = result['message']
        if (result['errorCode'] == 0) {
          this.router.navigate(['/sidebar/tabs/tabs/answer'])
          var userData = JSON.parse(result['data'])
          this.auth.$loginDetails = { loginType: this.auth.$isClient ? 2 : 1, password: this.loginForm.value.password, userId: userData.userId }
          this.auth.$accountType = userData.accountType;
          this.auth.$isLoggedIn = true;
          this.data.getUserProfile();
        }
      })
    }
  }

}
