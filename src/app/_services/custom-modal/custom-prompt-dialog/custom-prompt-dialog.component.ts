import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalField, CustomPromptOptions } from '../custom-modal.model';

@Component({
  selector: 'app-custom-prompt-dialog',
  templateUrl: './custom-prompt-dialog.component.html',
  styleUrls: ['./custom-prompt-dialog.component.css']
})
export class CustomPromptDialogComponent implements OnInit {
  @Input() customPromptOptions: CustomPromptOptions = new CustomPromptOptions() ;

  @Output() onSubmit = new EventEmitter<{ DataFields: CustomModalField[], closeModal: Function, cancelSubmit: Function }>();

  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  emailPattern2 = /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = '[0-9]{10}';

  IsSubmitInProgress: boolean = false;
  frmCustomForm = this.formBuilder.group({});
  IsFrmCustomForm: boolean = false; 
  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
      this.customPromptOptions.DataFields.forEach((ele, index) => {
        var frmControl = new FormControl();
        frmControl.setValue(ele.value);
        if (ele.validations != undefined) {
          ele.validations.forEach((validationEle, validationIndex) => {
            if (validationEle === 'required') {
              frmControl.addValidators(Validators.required);
            }
            else if (validationEle === 'email') {
              frmControl.addValidators(Validators.pattern(this.emailPattern2));
            }
            else if (validationEle === 'phone') {
              frmControl.addValidators(Validators.pattern(this.phonePattern));
            }
          });
        }
        this.frmCustomForm.addControl(this.getFieldName(ele), frmControl);
      })
  }

  getFieldName(modalField: CustomModalField) {
    return modalField.title.replace(' ', '').replace('.', '').replace('-', '').replace(',', '').replace('*', '');
  }

  getFieldTitle(modalField: CustomModalField) {
    var _title = modalField.title;
    if (modalField.validations !== undefined && modalField.validations.indexOf('required') !== -1) {
      _title += "*";
    }
    return _title;
  }

  fieldTextChanged(dataField: CustomModalField) {
    if (dataField.validations?.filter(x => x === 'trimOnChange').length != 0) {
      dataField.value = dataField.value.toString().trim();
    }
  }

  ok_click() {
    this.IsFrmCustomForm = true;
    if (this.frmCustomForm.valid) {
      if (!this.IsSubmitInProgress) {
        if (this.customPromptOptions.isShowProgressWhenSubmit) {
          this.IsSubmitInProgress = true;
        }
        this.onSubmit.emit({
          DataFields: this.customPromptOptions.DataFields,
          closeModal: () => {
            this.activeModal.close();
          },
          cancelSubmit: () => {
            if (this.customPromptOptions.isShowProgressWhenSubmit) {
              this.IsSubmitInProgress = false;
            }
          }
        });
      }
    }
  }

  cancel_click() {
    this.activeModal.close(false);
  }

  dismissed() {
    this.activeModal.dismiss();
  }
}
