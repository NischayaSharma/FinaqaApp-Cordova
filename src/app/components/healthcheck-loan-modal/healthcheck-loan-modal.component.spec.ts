import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthcheckLoanModalComponent } from './healthcheck-loan-modal.component';

describe('HealthcheckLoanModalComponent', () => {
  let component: HealthcheckLoanModalComponent;
  let fixture: ComponentFixture<HealthcheckLoanModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcheckLoanModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthcheckLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
