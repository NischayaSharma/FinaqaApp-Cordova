import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
// import { IonicRatingModule } from 'ionic-rating-component';
import { StarRatingModule } from "ionic5-star-rating";
import { FileUploadModule } from "ng2-file-upload";
import { FeedbackRatingComponent } from "./feedback-rating/feedback-rating.component";
import { FormComponent } from "./form/form.component";
import { HeaderComponent } from "./header/header.component";
import { HealthcheckLoanModalComponent } from "./healthcheck-loan-modal/healthcheck-loan-modal.component";
import { HealthcheckLoanTableComponent } from "./healthcheck-loan-table/healthcheck-loan-table.component";
import { LoadingModalComponent } from "./loading-modal/loading-modal.component";
import { MeetingModalComponent } from "./meeting-modal/meeting-modal.component";
import { PopoverComponent } from "./popover/popover.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, FileUploadModule, StarRatingModule],
    declarations: [FormComponent, HeaderComponent, HealthcheckLoanModalComponent, HealthcheckLoanTableComponent, PopoverComponent, FeedbackRatingComponent, LoadingModalComponent, MeetingModalComponent],
    exports: [FormComponent, HeaderComponent, HealthcheckLoanModalComponent, HealthcheckLoanTableComponent, PopoverComponent, FeedbackRatingComponent, LoadingModalComponent, MeetingModalComponent],
})
export class ComponentsModule {}