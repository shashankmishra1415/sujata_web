import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmploymentCategory } from '../../../_models/employment_category.model';
import { EmploymentCategoryService } from '../../../_services/configuration/lookups/employment-category.service';
import { CustomConfirmOptions, CustomModalField, CustomPromptOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-employment-categories',
  templateUrl: './employment-categories.component.html',
  styleUrls: ['./employment-categories.component.css']
})
export class EmploymentCategoriesComponent {
  EmploymentCategories: EmploymentCategory[] = [];

  constructor(private toastr: ToastrService, private customModalService: CustomModalService, private employementCategeoryService: EmploymentCategoryService) {

  }

  ngOnInit(): void {
    this.employementCategeoryService.list((data: EmploymentCategory[]) => {
      this.EmploymentCategories = data
    });
  }

  loadData() {
    this.employementCategeoryService.list((data: EmploymentCategory[]) => {
      this.EmploymentCategories = data
    });
  }

  item_remove_click(empCat: EmploymentCategory, index: number) {
    if (empCat.id !== 0) {
      var options: CustomConfirmOptions = new CustomConfirmOptions();
      options.dialogSize = 'sm';
      options.icon = 'warning';
      options.title = "";
      options.message = "Are you sure you want to delete this?"
      options.OkButtonText = "Yes, Delete";
      options.CancelButtonText = "No, Cancel";

      options.OkCallback = () => {
        this.employementCategeoryService.delete(empCat.id,
          // successCallback
          () => {
            this.toastr.success('Item successfully deleted', 'Employment Category');
            this.loadData();
          },
          // errorCallback
          (error: any) => {
            if (error.status === 404) {
              this.toastr.error('Item not found', 'Employment Category');
            }
            else {
              console.log('Error in deleting employment category: ', error);
            }
          }
        );
      }
      this.customModalService.confirm(options);
    }
    else {
      this.EmploymentCategories.splice(index, 1);
    }
  }

  add_item_click() {
    var empCat: EmploymentCategory = {
      id: 0,
      name: ''
    }

    this.EmploymentCategories.push(empCat);
  }

  item_changed(empCat: EmploymentCategory) {
    empCat.name = empCat.name.trim();
    if (empCat.name === '') {
      return;
    }
    this.employementCategeoryService.save(empCat,
      // successCallback
      () => {
        if (empCat.id === 0) {
          this.toastr.success('Item saved successfully', 'Employment Category');
        }
        else {
          this.toastr.success('Item updated successfully', 'Employment Category');
        }
        this.loadData();
      }
    )
  }
}
