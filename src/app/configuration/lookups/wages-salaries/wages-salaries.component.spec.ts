import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesSalariesComponent } from './wages-salaries.component';

describe('WagesSalariesComponent', () => {
  let component: WagesSalariesComponent;
  let fixture: ComponentFixture<WagesSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesSalariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WagesSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
