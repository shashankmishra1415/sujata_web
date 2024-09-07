import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseHeadsComponent } from './expense-heads.component';

describe('ExpenseHeadsComponent', () => {
  let component: ExpenseHeadsComponent;
  let fixture: ComponentFixture<ExpenseHeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseHeadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseHeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
