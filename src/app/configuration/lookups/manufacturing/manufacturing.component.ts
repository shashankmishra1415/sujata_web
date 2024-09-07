import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManufacturingProcess } from '../../../_models/manufacturing.model';
import { ManufacturingService } from '../../../_services/configuration/lookups/manufacturing.service';
import { CustomConfirmOptions, CustomModalField, CustomPromptOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-manufacturing',
  templateUrl: './manufacturing.component.html',
  styleUrls: ['./manufacturing.component.css']
})
export class ManufacturingComponent {
  ManufacturingProcesses: ManufacturingProcess[] = [];

  constructor(private toastr: ToastrService, private customModalService: CustomModalService, private manufacturingService: ManufacturingService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.manufacturingService.list((data: ManufacturingProcess[]) => {
      this.ManufacturingProcesses = data
    });
  }

  item_remove_click(manufacturingProc: ManufacturingProcess, index: number) {
    if (manufacturingProc.id !== 0) {
      var options: CustomConfirmOptions = new CustomConfirmOptions();
      options.dialogSize = 'sm';
      options.icon = 'warning';
      options.title = "";
      options.message = "Are you sure you want to delete this?"
      options.OkButtonText = "Yes, Delete";
      options.CancelButtonText = "No, Cancel";

      options.OkCallback = () => {
        this.manufacturingService.delete(manufacturingProc.id,
          // successCallback
          () => {
            this.toastr.success('Item successfully deleted', 'Manufacturing Process');
            this.loadData();
          },
          // errorCallback
          (error: any) => {
            if (error.status === 404) {
              this.toastr.error('Item not found', 'Manufacturing Process');
            }
            else {
              alert('test');
            }
          }
        );
      }
      this.customModalService.confirm(options);
    }
    else {
      this.ManufacturingProcesses.splice(index, 1);
    }
  }

  add_item_click() {
    var manufacturingProc: ManufacturingProcess = {
      id: 0,
      name: ''
    }
    this.ManufacturingProcesses.push(manufacturingProc);
  }

  item_changed(manufacturingProc: ManufacturingProcess) {
    manufacturingProc.name = manufacturingProc.name.trim();
    if (manufacturingProc.name === '') {
      return;
    }
    this.manufacturingService.save(manufacturingProc,
      // successCallback
      () => {
        if (manufacturingProc.id === 0) {
          this.toastr.success('Item saved successfully', 'Manufacturing Process');
        }
        else {
          this.toastr.success('Item updated successfully', 'Manufacturing Process');
        }
        this.loadData();
      }
    )
  }
}
