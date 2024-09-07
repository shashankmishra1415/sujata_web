import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomConfirmOptions, CustomModalButtons, CustomModalField } from '../custom-modal.model';

@Component({
  selector: 'app-custom-confirm-dialog',
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrls: ['./custom-confirm-dialog.component.css']
})
export class CustomConfirmDialogComponent implements OnInit {
  CustomModalButtons = CustomModalButtons;

  @Input() customConfirmOptions: CustomConfirmOptions = new CustomConfirmOptions() ;

  @Output() onSubmit = new EventEmitter<{ DataFields: CustomModalField[], closeModal: Function, cancelSubmit: Function }>();

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  IsSubmitInProgress: boolean = false;
  ngOnInit(): void {
  }

  ok_click() {
    this.activeModal.close(true);
  }

  cancel_click() {
    this.activeModal.close(false);
  }

  dismissed() {
    this.activeModal.dismiss();
  }
}
