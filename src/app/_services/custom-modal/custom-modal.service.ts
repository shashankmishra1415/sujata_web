import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomAlertDialogComponent } from './custom-alert-dialog/custom-alert-dialog.component';
import { CustomConfirmDialogComponent } from './custom-confirm-dialog/custom-confirm-dialog.component';
import { CustomAlertOptions, CustomConfirmOptions, CustomModalButtons, CustomModalField, CustomModalOptions, CustomPromptFileOptions, CustomPromptOptions } from './custom-modal.model';
import { CustomPromptDialogComponent } from './custom-prompt-dialog/custom-prompt-dialog.component';
import { CustomPromptFileDialogComponent } from './custom-prompt-file-dialog/custom-prompt-file-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  constructor(private modalService: NgbModal) { }


  public close() {
    this.modalService.dismissAll();
  }

  public confirm(customConfirmOptions: CustomConfirmOptions) {
    const modalRef = this.modalService.open(CustomConfirmDialogComponent, {
      size: customConfirmOptions.dialogSize,
      centered: true,
      backdrop: 'static',
      keyboard: customConfirmOptions.isKeyboardEvents,
      container: customConfirmOptions.containerSelector
    });
    modalRef.componentInstance.customConfirmOptions = customConfirmOptions;

    modalRef.result.then((confirmed) => {
      if (confirmed === true) {
        if (typeof (customConfirmOptions.OkCallback) == 'function') {
          customConfirmOptions.OkCallback();
        }
      }
      else if (confirmed === false) {
        if (typeof (customConfirmOptions.CancelCallback) == 'function') {
          customConfirmOptions.CancelCallback();
        }
      }
    }).catch(() => {
      if (typeof (customConfirmOptions.DismissCallback) == 'function') {
        customConfirmOptions.DismissCallback();
      }
    });
  }

  public alert(customAlertOptions: CustomAlertOptions) {
    const modalRef = this.modalService.open(CustomAlertDialogComponent, {
      size: customAlertOptions.dialogSize,
      centered: true,
      backdrop: 'static',
      keyboard: customAlertOptions.isKeyboardEvents,
      container: customAlertOptions.containerSelector
    });
    modalRef.componentInstance.customAlertOptions = customAlertOptions;

    modalRef.result.then(() => {
      if (typeof (customAlertOptions.OkCallback) == 'function') {
        customAlertOptions.OkCallback();
      }
    }).catch(() => {
      if (typeof (customAlertOptions.DismissCallback) == 'function') {
        if (typeof (customAlertOptions.OkCallback) == 'function') {
          customAlertOptions.OkCallback();
        }
      }
    });
  }

  public prompt(customPromptOptions: CustomPromptOptions) {
    const modalRef = this.modalService.open(CustomPromptDialogComponent, {
      size: customPromptOptions.dialogSize,
      centered: true,
      backdrop: 'static',
      keyboard: customPromptOptions.isKeyboardEvents,
      container: customPromptOptions.containerSelector
    });
    modalRef.componentInstance.customPromptOptions = customPromptOptions;

    modalRef.componentInstance.onSubmit.subscribe((modalParam: { DataFields: CustomModalField[], closeModal: Function, cancelSubmit: Function }) => {
      if (typeof (customPromptOptions.OkCallback) !== 'function') {
        modalParam.closeModal();
      }
      else {
        customPromptOptions.OkCallback(modalParam.DataFields, modalParam.closeModal, modalParam.cancelSubmit);
      }
    });

    modalRef.result.then((confirmed) => {
      if (confirmed === false) {
        if (typeof (customPromptOptions.CancelCallback) == 'function') {
          customPromptOptions.CancelCallback();
        }
      }
    }).catch(() => {
      if (typeof (customPromptOptions.DismissCallback) == 'function') {
        customPromptOptions.DismissCallback();
      }
    });
  }

  public promptFile(customPromptFileOptions: CustomPromptFileOptions) {
    const modalRef = this.modalService.open(CustomPromptFileDialogComponent, {
      size: 'md',
      centered: true,
      backdrop: 'static',
      keyboard: customPromptFileOptions.isKeyboardEvents
    });
    modalRef.componentInstance.customPromptFileOptions = customPromptFileOptions;

    modalRef.result.then((selectedFiles) => {
      if (selectedFiles !== undefined && selectedFiles !== null && selectedFiles.length !== 0) {
        if (customPromptFileOptions.OkCallback !== undefined && typeof (customPromptFileOptions.OkCallback) === 'function') {
          customPromptFileOptions.OkCallback(selectedFiles);
        }
      }
    }).catch(() => {
    });
  }
}
