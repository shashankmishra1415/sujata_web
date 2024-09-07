import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentSubCategoriesComponent } from './employment-sub-categories.component';

describe('EmploymentSubCategoriesComponent', () => {
  let component: EmploymentSubCategoriesComponent;
  let fixture: ComponentFixture<EmploymentSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentSubCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
