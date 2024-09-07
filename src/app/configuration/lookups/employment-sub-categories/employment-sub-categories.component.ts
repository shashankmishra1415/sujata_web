import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';
import { EmploymentSubCategoryService } from '../../../_services/configuration/lookups/employment-sub-category.service';
import { CustomConfirmOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-employment-sub-categories',
  templateUrl: './employment-sub-categories.component.html',
  styleUrls: ['./employment-sub-categories.component.css']
})
export class EmploymentSubCategoriesComponent {
  EmploymentSubCategories: EmploymentSubCategory[] = [];

  constructor(private toastr: ToastrService, private customModalService: CustomModalService, private employementSubCategeoryService: EmploymentSubCategoryService) {

  }

  ngOnInit(): void {
    this.employementSubCategeoryService.list((data: EmploymentSubCategory[]) => {
      this.EmploymentSubCategories = data
    });
  }

  loadData() {
    this.employementSubCategeoryService.list((data: EmploymentSubCategory[]) => {
      this.EmploymentSubCategories = data
    });
  }

  item_remove_click(empSubCat: EmploymentSubCategory, index: number) {
    if (empSubCat.id !== 0) {
      var options: CustomConfirmOptions = new CustomConfirmOptions();
      options.dialogSize = 'sm';
      options.icon = 'warning';
      options.title = "";
      options.message = "Are you sure you want to delete this?"
      options.OkButtonText = "Yes, Delete";
      options.CancelButtonText = "No, Cancel";

      options.OkCallback = () => {
        this.employementSubCategeoryService.delete(empSubCat.id,
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
      this.EmploymentSubCategories.splice(index, 1);
    }
  }

  add_item_click() {
    var empSubCat: EmploymentSubCategory = {
      id: 0,
      name: ''
    }

    this.EmploymentSubCategories.push(empSubCat);
  }

  item_changed(empSubCat: EmploymentSubCategory) {
    empSubCat.name = empSubCat.name.trim();
    if (empSubCat.name === '') {
      return;
    }
    this.employementSubCategeoryService.save(empSubCat,
      // successCallback
      () => {
        if (empSubCat.id === 0) {
          this.toastr.success('Item saved successfully', 'Employment Sub Category');
        }
        else {
          this.toastr.success('Item updated successfully', 'Employment Sub Category');
        }
        this.loadData();
      }
    )
  }
}
