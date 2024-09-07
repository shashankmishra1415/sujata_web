import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesSalaryPopupComponent } from './wages-salary-popup.component';

describe('WagesSalaryPopupComponent', () => {
  let component: WagesSalaryPopupComponent;
  let fixture: ComponentFixture<WagesSalaryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesSalaryPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesSalaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
