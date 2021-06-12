import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { Dropdown, FormFields } from 'src/app/services/dtos.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-meeting-modal',
  templateUrl: './meeting-modal.component.html',
  styleUrls: ['./meeting-modal.component.scss'],
})
export class MeetingModalComponent implements OnInit {

  @Input() meetingTimings:Dropdown[];
  interfaceOptions = {
    header: "Select the Meeting Time",
    cssClass: "action-sheet-class"
  }
  setMeetingForm: FormGroup;
  formFields: FormFields[] = []
  constructor(
    private popoverController:PopoverController,
    private util:UtilService,
    private formBuilder:FormBuilder,
  ) {
    console.log(this.meetingTimings);
  }

  ngOnInit() {
    console.log(this.meetingTimings);
    this.formFields = [
      {
        label: 'Meeting Link',
        type: 'input',
        inputType: 'text',
        controlName: 'meetLink',
        required: true,
        validators: [Validators.required, Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")],
        labelPosition: 'stacked',
        placeholder: 'Enter the meeting Link.'
      },
      {
        label: 'Meeting Time',
        type: 'dropdown',
        controlName: 'meetTime',
        required: true,
        validators: [Validators.required],
        labelPosition: 'stacked',
        data: this.meetingTimings,
        interface: 'action-sheet',
        interfaceOptions: this.interfaceOptions,
        placeholder: 'Enter the Time Slot for meeting.',
      },
    ]
    this.setMeetingForm = this.util.formFieldsToFormGroup(this.formBuilder, this.formFields, this.setMeetingForm)
  }

  sendLink() {
    this.popoverController.dismiss(this.setMeetingForm.value)
  }

  cancel() {
    this.popoverController.dismiss();
  }
}
