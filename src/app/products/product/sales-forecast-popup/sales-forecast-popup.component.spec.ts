import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesForecastPopupComponent } from './sales-forecast-popup.component';

describe('SalesForecastPopupComponent', () => {
  let component: SalesForecastPopupComponent;
  let fixture: ComponentFixture<SalesForecastPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesForecastPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesForecastPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
