import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomAlertOptions, CustomConfirmOptions, CustomModalField } from '../custom-modal.model';

@Component({
  selector: 'app-custom-alert-dialog',
  templateUrl: './custom-alert-dialog.component.html',
  styleUrls: ['./custom-alert-dialog.component.css']
})
export class CustomAlertDialogComponent implements OnInit {
  @Input() customAlertOptions: CustomAlertOptions = new CustomAlertOptions() ;

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  ok_click() {
    this.activeModal.close();
  }
  dismissed() {
    this.activeModal.dismiss();
  }
}
