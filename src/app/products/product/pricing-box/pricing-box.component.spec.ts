import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingBoxComponent } from './pricing-box.component';

describe('PricingBoxComponent', () => {
  let component: PricingBoxComponent;
  let fixture: ComponentFixture<PricingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
