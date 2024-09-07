import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { CustomPromptFileOptions } from '../custom-modal.model';

@Component({
  selector: 'app-custom-prompt-file-dialog',
  templateUrl: './custom-prompt-file-dialog.component.html',
  styleUrls: ['./custom-prompt-file-dialog.component.css']
})
export class CustomPromptFileDialogComponent implements OnInit {
  @Input() customPromptFileOptions: CustomPromptFileOptions = new CustomPromptFileOptions() ;

  uploadButtonEnabled = false;
  selectedFiles: FileItem[] = [];

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
  }

  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    allowedFileType: ["xls","xlsx"],
    queueLimit: 1
  });

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
      var file = this.uploader.queue[0]
      if (this.customPromptFileOptions.isMultipleFiles) {
        this.selectedFiles.push(file);
      }
      else {
        this.selectedFiles = [];
        this.selectedFiles.push(file);
      }
      this.uploader.cancelAll();
      this.uploader.clearQueue();
    }
  }

  ok_click() {
    if (this.selectedFiles.length > 0) {
      this.activeModal.close(this.selectedFiles);
    }
    else {
      alert('Please select a file first.');
    }
  }
  dismissed() {
    this.activeModal.dismiss();
  }

  download_click() {
    if (this.customPromptFileOptions.DownloadCallback !== undefined && typeof (this.customPromptFileOptions.DownloadCallback) === 'function') {
      this.customPromptFileOptions.DownloadCallback();
    }
  }
  public inputFileChanged(event: any) {
    const fileList: FileList = event.target.files;
    const selectedFile: File = fileList[0];

    // Create a FileItem instance
    const fileItem: FileItem = new FileItem(this.uploader, selectedFile, {});


    //this.selectedFiles.push(fileItem);
    if (event.target.files.length > 0) {
      this.uploadButtonEnabled = true;
    }
    else {
      this.uploadButtonEnabled = false;
    }
  }

  removeFile_click(e: any, i: number) {
    e.stopPropagation();
    this.selectedFiles.splice(i, 1);
  }

  convertSize(size: number, sourceUnit: string, targetUnit: string): string {
    const units = {
      bytes: 1,
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
      TB: 1024 * 1024 * 1024 * 1024,
    };

    if (!units.hasOwnProperty(sourceUnit) || (!units.hasOwnProperty(targetUnit) && targetUnit !== '')) {
      return 'Invalid source or target unit';
    }

    let sizeInBytes = size;
    if (sourceUnit.toLowerCase() === 'bytes') {
      sizeInBytes = size * units.bytes;
    }
    else if (sourceUnit.toLowerCase() === 'kb') {
      sizeInBytes = size * units.KB;
    }
    else if (sourceUnit.toLowerCase() === 'mb') {
      sizeInBytes = size * units.MB;
    }
    else if (sourceUnit.toLowerCase() === 'gb') {
      sizeInBytes = size * units.GB;
    }
    else if (sourceUnit.toLowerCase() === 'tb') {
      sizeInBytes = size * units.TB;
    }

    if (targetUnit !== '') {
      if (targetUnit.toLowerCase() === 'bytes') {
        return (sizeInBytes / units.bytes).toFixed(2) + ' bytes';
      }
      else if (targetUnit.toLowerCase() === 'kb') {
        return (sizeInBytes / units.KB).toFixed(2) + ' KB';
      }
      else if (targetUnit.toLowerCase() === 'mb') {
        return (sizeInBytes / units.MB).toFixed(2) + ' MB';
      }
      else if (targetUnit.toLowerCase() === 'gb') {
        return (sizeInBytes / units.GB).toFixed(2) + ' GB';
      }
      else if (targetUnit.toLowerCase() === 'tb') {
        return (sizeInBytes / units.TB).toFixed(2) + ' TB';
      }
      else {
        return (sizeInBytes / units.bytes).toFixed(2) + ' bytes';
      }
    } else {
      if (sizeInBytes > units.TB) {
        return (sizeInBytes / units.TB).toFixed(2) + ' TB';
      }
      else if (sizeInBytes > units.GB) {
        return (sizeInBytes / units.GB).toFixed(2) + ' GB';
      }
      else if (sizeInBytes > units.MB) {
        return (sizeInBytes / units.MB).toFixed(2) + ' MB';
      }
      else if (sizeInBytes > units.KB) {
        return (sizeInBytes / units.KB).toFixed(2) + ' KB';
      }
      else if (sizeInBytes > units.bytes) {
        return (sizeInBytes / units.bytes).toFixed(2) + ' bytes';
      }
      else {
        return (sizeInBytes / units.TB).toFixed(2) + ' TB';
      }
    }
  }
}
