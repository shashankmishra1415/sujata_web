import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCategoriesComponent } from './employment-categories.component';

describe('EmploymentCategoriesComponent', () => {
  let component: EmploymentCategoriesComponent;
  let fixture: ComponentFixture<EmploymentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
