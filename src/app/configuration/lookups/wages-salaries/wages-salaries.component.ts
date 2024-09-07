import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { wageAndSalaryCategories, WagesSalaries } from 'src/app/_models/wages_salaries.model';
/*import { WagesSalariesPopup } from 'src/app/_models/wages_salaries_popup.model';*/
import { WagesSalariesService } from 'src/app/_services/configuration/lookups/wages-salaries.service';
import { EmploymentCategory } from '../../../_models/employment_category.model';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';
import { State } from '../../../_models/state.model';
import { EmploymentCategoryService } from '../../../_services/configuration/lookups/employment-category.service';
import { EmploymentSubCategoryService } from '../../../_services/configuration/lookups/employment-sub-category.service';
import { CustomConfirmOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';
import { StateService } from '../../../_services/state.service';
import { WagesSalaryPopupComponent } from '../wages-salary-popup/wages-salary-popup.component';

@Component({
  selector: 'app-wages-salaries',
  templateUrl: './wages-salaries.component.html',
  styleUrls: ['./wages-salaries.component.css']
})
export class WagesSalariesComponent {
  employmentCategories: EmploymentCategory[] = [];
  employmentSubCategories: EmploymentSubCategory[] = [];
  states: State[] = [];
  wagesAndSalaries: WagesSalaries[] = [];
  constructor(private modalService: NgbModal, private toastr: ToastrService, private customModalService: CustomModalService, private wagesAndSalariesService: WagesSalariesService, private employmentCategoryServices: EmploymentCategoryService, private employmentSubCategoryServices: EmploymentSubCategoryService, private stateService: StateService) { }

  ngOnInit(): void{
    this.employmentCategoryServices.list(
      //successCallback
      (data: EmploymentCategory[]) => {
        this.employmentCategories = data;
      }
    )

    this.employmentSubCategoryServices.list(
      //successCallback
      (data: EmploymentSubCategory[]) => {
        this.employmentSubCategories = data;
      }
    )

    this.stateService.list(
      //successCallback
      (data: State[]) => {
        this.states = data;
      }
    )

    this.loadData();
  }
  loadData() {
    this.wagesAndSalariesService.list((data: WagesSalaries[]) => {
      this.wagesAndSalaries = data
    });
  }
  //changes required in api desired output is below
  //Wages = [
  //  {
  //    StateID: 1,
  //    StateName: 'Delhi',
  //    EffectiveDate: '2023-05-04',
  //    EmploymentCategories: [
  //      {
  //        id: 1,
  //        name: 'Unskilled, semiskilled and skilled',
  //        Subcategories: [
  //          {
  //            id: 0,
  //            name: 'Un-skilled',
  //            value: 18000
  //          },
  //          {
  //            id: 0,
  //            name: 'Semi-skilled',
  //            value: 18993
  //          },
  //          {
  //            id: 0,
  //            name: 'Skilled',
  //            value: 20000
  //          }
  //        ]
  //      },
  //      {
  //        id: 2,
  //        name: 'Clerical and Supervisory Staffs',
  //        Subcategories: [
  //          {
  //            id: 0,
  //            name: 'Non matriculate',
  //            value: 18500
  //          },
  //          {
  //            id: 0,
  //            name: 'Matriculate but not graduate',
  //            value: 19993
  //          },
  //          {
  //            id: 0,
  //            name: 'Graduate and above',
  //            value: 20500
  //          }
  //        ]
  //      }
  //    ]
  //  },
  //  {
  //    StateID: 2,
  //    StateName: 'Kolkata',
  //    EffectiveDate: '2022-05-02',
  //    EmploymentCategories: [
  //      {
  //        id: 1,
  //        name: 'Unskilled, semiskilled and skilled',
  //        Subcategories: [
  //          {
  //            id: 0,
  //            name: 'Un-skilled',
  //            value: 18000
  //          },
  //          {
  //            id: 0,
  //            name: 'Semi-skilled',
  //            value: 18993
  //          },
  //          {
  //            id: 0,
  //            name: 'Skilled',
  //            value: 20000
  //          }
  //        ]
  //      },
  //      {
  //        id: 2,
  //        name: 'Clerical and Supervisory Staffs',
  //        Subcategories: [
  //          {
  //            id: 0,
  //            name: 'Non matriculate',
  //            value: 1850000
  //          },
  //          {
  //            id: 0,
  //            name: 'Matriculate but not graduate',
  //            value: 19993
  //          },
  //          {
  //            id: 0,
  //            name: 'Graduate and above',
  //            value: 20500
  //          }
  //        ]
  //      }
  //    ]
  //  }
  //]

  getUniqueCategories(salAndWag: WagesSalaries): {
    employmentCategoryId: number,
    employmentCategoryName: string,
  }[] {
    let wageAndSalaryCategories: {
      employmentCategoryId: number,
      employmentCategoryName: string,
    }[] = [];

    salAndWag.wageAndSalaryCategories.forEach((item, index) => {
      if (wageAndSalaryCategories.filter(x => x.employmentCategoryId === item.employmentCategoryId).length === 0) {
        wageAndSalaryCategories.push({
          employmentCategoryId: item.employmentCategoryId,
          employmentCategoryName: item.employmentCategoryName
        });
      }
    })
    return wageAndSalaryCategories;
  }

  getSubCategoriesByCatID(salAndWag: WagesSalaries, employmentCategoryId: number): wageAndSalaryCategories[] {
    return salAndWag.wageAndSalaryCategories.filter(x => x.employmentCategoryId === employmentCategoryId);
  }  

  add_click(){
    const modalRef = this.modalService.open(WagesSalaryPopupComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    modalRef.componentInstance.States = this.states
    modalRef.componentInstance.Categories = this.employmentCategories
    modalRef.componentInstance.SubCategories = this.employmentSubCategories
    modalRef.componentInstance.data = {
      id: 0,
      stateId: 0,
      stateName: '',
      effectiveDate: new Date(),
      wageAndSalaryCategories: []
    }

    modalRef.result.then((data) => {
      this.wagesAndSalariesService.save(data,
        // successCallback
        () => {
          this.loadData()
        }
      );
    }).catch(() => {
    }); 
  }

  EditWage_Click(originalData: WagesSalaries)
  {
    //originalData.stateName = "tet";

    var transformedData: WagesSalaries = JSON.parse(JSON.stringify(originalData))
    const modalRef = this.modalService.open(WagesSalaryPopupComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    modalRef.componentInstance.States = this.states
    modalRef.componentInstance.Categories = this.employmentCategories
    modalRef.componentInstance.SubCategories = this.employmentSubCategories
    modalRef.componentInstance.data = transformedData;

    modalRef.result.then((transformedData) => {
      this.wagesAndSalariesService.save(transformedData,
        // successCallback
        () => {
          this.loadData()
        }
      );
      //originalData.stateName = "tet1";
      //if(typeof(transformedData) !== 'undefined')
      //{
      //  var backData = {
      //    StateID: transformedData.StateID,
      //    StateName: "hello",
      //    EffectiveDate: transformedData.EffectiveDate,
      //    EmploymentCategories: transformedData.EmploymentCategories
      //      .reduce((acc: any, item: any) => {
      //        // Check if the category already exists in the accumulator
      //        const existingCategory = acc.find((cat: any) => cat.id === item.CategoryID);
      
      //        if (!existingCategory) {
      //          // If the category doesn't exist, create a new one
      //          const newCategory = {
      //            id: item.CategoryID,
      //            name: '',
      //            Subcategories: [],
      //          };
      
      //          // Add the new category to the accumulator
      //          acc.push(newCategory);
      //        }
      
      //        // Find the category in the accumulator
      //        const category = acc.find((cat: any) => cat.id === item.CategoryID);
      
      //        // Add the subcategory to the category
      //        category.Subcategories.push({
      //          id: item.SubcategoryID,
      //          name: item.SubcategoryName,
      //          value: item.Value,
      //        });
      
      //        return acc;
      //      }, [])
      //      .map((category: any) => ({
      //        id: category.id,
      //        name: category.name, // You may need to set the category name based on your actual data
      //        Subcategories: category.Subcategories,
      //      })),
      //  };

      //  originalData.stateId = backData.StateID;
      //  originalData.stateName = backData.StateName;
      //  originalData.effectiveDate = backData.EffectiveDate;
      //  originalData.wageAndSalaryCategories = backData.EmploymentCategories
      //}
    }).catch(() => {
    }); 
  }

  delete_click(wageSalary: WagesSalaries) {
    var options: CustomConfirmOptions = new CustomConfirmOptions();
    options.dialogSize = 'sm';
    options.icon = 'warning';
    options.title = "";
    options.message = "Are you sure you want to delete this?"
    options.OkButtonText = "Yes, Delete";
    options.CancelButtonText = "No, Cancel";

    options.OkCallback = () => {
      this.wagesAndSalariesService.delete(wageSalary.id,
        // successCallback
        () => {
          this.toastr.success('Item successfully deleted', 'Wages & Salaries');
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
}
