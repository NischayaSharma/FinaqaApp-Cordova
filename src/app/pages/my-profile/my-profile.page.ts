import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { LoadingModalComponent } from 'src/app/components/loading-modal/loading-modal.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  profileForm: FormGroup;
  photoUrl: string = "assets/ic_users.png";
  accntType = {
      1: 'Individual',
      2: 'Start-Up',
      3: 'Proprietary Business Owner',
      4: 'MSME',
  }
  noButtonAlert;


  constructor(
    private apiService: ApiService,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private auth:AuthService,
    private modalController:ModalController,
    private alertController:AlertController,
    private data:DataService,
  ) {
    this.profileForm = this.util.formFieldsToFormGroup(this.formBuilder, this.profileFormFields, this.profileForm);
  }

  public uploader: FileUploader = new FileUploader({});

  public onFileSelected(event: File[]) {
    const file: File = event[0];
    console.log(file);
  }

  async getProfile() {
    await this.data.getUserProfile();
    var profile = this.data.$userProfile;
    this.photoUrl = profile.photoUrl == null ? "assets/ic_users.png" : profile.photoUrl;
    this.profileForm.setValue({ name: profile.userName, phone: profile.phone, email: profile.emailId, skypeId: profile.skypeId, accountType: this.auth.$accountType == undefined || this.auth.$accountType == null ? "Individual" : this.accntType[this.auth.$accountType] })
  }

  ionViewDidEnter() {
    this.getProfile();
  }

  profileFormFields: FormFields[] = [
    {
      placeholder: "Enter your Name",
      labelPosition: "floating",
      controlName: "name",
      inputType: "text",
      type: "input",
      label: "Your Name",
      required: true,
      validators: [Validators.required],
    },
    {
      placeholder: "Enter your Email",
      labelPosition: "floating",
      controlName: "email",
      inputType: "email",
      type: "input",
      label: "Email",
      required: true,
      validators: [Validators.required, Validators.email],
      disabled: true,
    },
    {
      placeholder: "Enter your Mobile Number",
      labelPosition: "floating",
      controlName: "phone",
      inputType: "number",
      type: "input",
      label: "Phone Number",
      required: true,
      validators: [Validators.required],
    },
    {
      placeholder: "Enter your Skype Id",
      labelPosition: "floating",
      controlName: "skypeId",
      inputType: "text",
      type: "input",
      label: "Skype Id",
      required: true,
      validators: [Validators.required],
    },
    {
      placeholder: "Enter Your account type",
      labelPosition: "floating",
      controlName: "accountType",
      inputType: "text",
      type: "input",
      label: "Account Type",
      required: true,
      validators: [Validators.required],
      disabled: true,
    },
  ]

  ngOnInit() {
  }

  inputFile() {
    document.getElementById('fileInput').click();
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  async submit() {
    console.log(this.profileForm.value)
    var formdata = new FormData();
    var file= await this.getFiles()
    console.log("file==>", file.length);

    const modal = await this.modalController.create({
      component: LoadingModalComponent,
      cssClass: "loadingModal",
      backdropDismiss: false,
    })

    modal.present();


    formdata.append('userId',  this.auth.$loginDetails.userId.toString());
    formdata.append('password', this.auth.$loginDetails.password);
    formdata.append('loginType', this.auth.$loginDetails.loginType.toString());
    formdata.append('userName', this.profileForm.controls['name'].value);
    if (file.length>0){
      formdata.append('photoUrl', file[0].rawFile, file[0].name);
    }
    formdata.append('phone', this.profileForm.controls['phone'].value);
    formdata.append('skypeId', this.profileForm.controls['skypeId'].value);

    console.log(formdata.get('photoUrl'))
    this.apiService.updateProfile(formdata)
      .subscribe(async response => {
        console.log(response);
        if (response) {
          modal.dismiss();
          this.uploader.clearQueue();
        }
        if(response['errorCode']==0) {
          await this.getProfile();
          this.util.showToast('Profile Updated Successfully')
        } else {
          this.noButtonAlert = await this.alertController.create({
            header: 'Error',
            message: response['message'],
            buttons: []
          });
          this.noButtonAlert.present()
        }
      })
  }

}
