import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthcheckLoanTableComponent } from './healthcheck-loan-table.component';

describe('HealthcheckLoanTableComponent', () => {
  let component: HealthcheckLoanTableComponent;
  let fixture: ComponentFixture<HealthcheckLoanTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthcheckLoanTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthcheckLoanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
