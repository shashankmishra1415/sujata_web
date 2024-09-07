import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPromptDialogComponent } from './custom-prompt-dialog.component';

describe('CustomPromptDialogComponent', () => {
  let component: CustomPromptDialogComponent;
  let fixture: ComponentFixture<CustomPromptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPromptDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPromptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
