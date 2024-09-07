import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPopupComponent } from './component-popup.component';

describe('ComponentPopupComponent', () => {
  let component: ComponentPopupComponent;
  let fixture: ComponentFixture<ComponentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
