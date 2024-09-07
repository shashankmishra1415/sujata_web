import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialPopupComponent } from './rawmaterial-popup.component';

describe('RawmaterialPopupComponent', () => {
  let component: RawmaterialPopupComponent;
  let fixture: ComponentFixture<RawmaterialPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawmaterialPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawmaterialPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
