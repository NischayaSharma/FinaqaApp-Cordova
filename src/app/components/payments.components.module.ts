import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { StarRatingModule } from "ionic5-star-rating";
import { FileUploadModule } from "ng2-file-upload";
import { ClientPaymentComponent } from "./client-payment/client-payment.component";
import { ConsultantPaymentComponent } from "./consultant-payment/consultant-payment.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule, FileUploadModule, StarRatingModule],
    declarations: [ClientPaymentComponent, ConsultantPaymentComponent],
    exports: [ClientPaymentComponent, ConsultantPaymentComponent]
})
export class PaymentsComponentsModule { }