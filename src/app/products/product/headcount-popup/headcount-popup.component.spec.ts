import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadcountPopupComponent } from './headcount-popup.component';

describe('HeadcountPopupComponent', () => {
  let component: HeadcountPopupComponent;
  let fixture: ComponentFixture<HeadcountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadcountPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadcountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
