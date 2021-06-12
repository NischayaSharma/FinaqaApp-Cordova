import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FileLikeObject, FileUploader } from 'ng2-file-upload';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import 'capacitor-razorpay';
import { Plugins } from '@capacitor/core';
import { UtilService } from 'src/app/services/util.service';
import { UserProfile } from 'src/app/services/dtos.service';
import { DataService } from 'src/app/services/data.service';

const { Checkout } = Plugins;

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.page.html',
  styleUrls: ['./file-upload.page.scss'],
})
export class FileUploadPage implements OnInit {

  uploadedFiles: any;
  queryId: any;
  amount: any;
  transId: string = "";
  noButtonAlert;
  alert;
  userProfile:UserProfile;
  counter = 0

  constructor(
    private auth:AuthService,
    private router: Router,
    private route:ActivatedRoute,
    private apiService:ApiService,
    private util: UtilService,
    private alertController:AlertController,
    private data:DataService,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params)
        this.queryId = params.queryId;
        this.amount = params.amount;
        this.transId = params.transId;
        console.log(this.queryId);
      });
  }

  public uploader: FileUploader = new FileUploader({});

  public onFileSelected(event: File[]) {
    const file: File = event[0];
    console.log(file);
  }

  getFiles(): FileLikeObject[] {
    return this.uploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  inputFile() {
    document.getElementById('fileInput').click();
  }

  async getProfile() {
    this.userProfile = this.data.$userProfile;
  }

  async uploadFiles() {

    var files = this.getFiles();
    console.log(files);

    for (let file of files) {
      var formData = new FormData();
      console.log("Each file's rawfile ==>", file.rawFile);
      console.log("Each file ==>", file);

      formData.append('custId', this.auth.$loginDetails.userId.toString())
      formData.append('password', this.auth.$loginDetails.password)
      formData.append('queryId', this.queryId)
      formData.append('docFileUrl', file.rawFile, file.name);

      var data = await this.apiService.uploadClientDocs(formData)
      if (data['errorCode'] == 0) {
        this.counter += 1
      }
      console.log("Returned data==>", data);
    };
  }

  async submit(skip:boolean) {
    const modal = await this.util.loadingModal();
    this.getProfile();
    console.log("User Profile ==> ", this.userProfile);
    if (!skip){
      await this.uploadFiles();
    }
    console.log("Counter ==>", this.counter, ":: files.length ==>", this.uploader.queue.length);
    await setTimeout(() => {modal.dismiss()}, 500)

    console.log("Modal Dismiss");
    await this.util.paymentAlert(this.amount, this.queryId, this.userProfile, this.transId)
    this.uploader.clearQueue();
  }
}
