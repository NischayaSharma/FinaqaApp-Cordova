import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { FileUploader } from 'ng2-file-upload';
import { DataService } from 'src/app/services/data.service';
import { Dropdown, FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';
import { PopoverComponent } from '../popover/popover.component';

const URL = "http://localhost:3000/fileupload/";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() formFields: FormFields[];
  @Input() labelColor: string;
  infoColor = 'primary'

  subValue(parentControlName:string, data:Dropdown[]): Dropdown[] {
    var sub:Dropdown[] = [] 
    console.log(this.formGroup.get(parentControlName).value)
    data.forEach( element => {
      if (element.value == this.formGroup.get(parentControlName).value){
        sub = element.subValue
      }
    });
    return sub;
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: true,
    method: "post",
    itemAlias: "attachment",
  });

  public onFileSelected(event: File[]) {
    const file: File = event[0];
    console.log(file);
  }

  f(controlName) {
    return this.formGroup.controls[controlName];
  }

  constructor(private util:UtilService, private alert: AlertController, private popover: PopoverController) { }

  inputFile() {
    document.getElementById('fileInput').click();
  }

  passwordIcon = "eye-off-outline";
  passwordType = "password";

  ngOnInit() { }

  async infoPressed(field:FormFields) {
    console.log("Info Pressed");

    var noButtonAlert = await this.alert.create({
      cssClass: "alert-class",
      header: field.helpInfo.header,
      subHeader: field.helpInfo.subHeader,
      message: field.helpInfo.info,
      buttons: [{ text: 'Close' }]
    });
    noButtonAlert.present()
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }

  getType(type) {
    if (type=="password"){
      return this.passwordType;
    } else {
      return type
    }
  }

}
