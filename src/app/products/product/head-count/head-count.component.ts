import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomConfirmOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';
import { HeadcountService } from 'src/app/_services/products/headcount.service';
import { HeadcountPopupComponent } from '../headcount-popup/headcount-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Headcount } from 'src/app/_models/headcount.model';
import { EmploymentCategory } from '../../../_models/employment_category.model';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-head-count',
  templateUrl: './head-count.component.html',
  styleUrls: ['./head-count.component.css']
})
export class HeadCountComponent {
  ProductID: number = 0;
  headcountData: Headcount[] = [];
  years = Array(5).fill(0).map((x, i) => i + 1);
  isModified = false;

  constructor(private toastr: ToastrService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private customModalService: CustomModalService, private headCountService: HeadcountService) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(
        (params: Params) => {
          if (params["id"]) {
            this.ProductID = params["id"];
          }
        }
      );
    }


    this.loadData();
  }

  loadData() {
    this.headCountService.list(this.ProductID,
      // successCallback
      (data: Headcount[]) => {
        this.headcountData = data;
      })
  }

  getUniqueCategories():EmploymentCategory[] {
    var uniqueCategories: EmploymentCategory[] = [];

    this.headcountData.forEach(entry => {
      const found = uniqueCategories.some(cat =>
        cat.id === entry.employmentCategoryId
      );
      if (!found) {
        uniqueCategories.push({ id: entry.employmentCategoryId, name: entry.employmentCategoryName });
      }
    });

    return uniqueCategories
  }

  getSubCategoriesByCategoryId(catId: number): EmploymentSubCategory[] {
    var SubCategories: EmploymentSubCategory[] = [];

    this.headcountData.filter(x=> x.employmentCategoryId === catId).forEach(entry => {
      const found = SubCategories.some(subcat =>
        subcat.id === entry.employmentSubCategoryId
      );
      if (!found) {
        SubCategories.push({ id: entry.employmentSubCategoryId, name: entry.employmentSubCategoryName });
      }
    });

    return SubCategories
  }

  calculateTotalAmountByYear(year: number): number {
    let totalSum = 0;

    // Filter data for the specified year
    const filteredData = this.headcountData.filter(item => item.year === year);

    // Calculate the sum of (count * subcategorySalary) for all subcategories within all categories
    filteredData.forEach(item => {
      totalSum += item.count * item.ratePerMonth;
    });

    return totalSum;
  }

  calculateTotalEmployeeCountByYear(year: number): number {
    let total = 0;
    let dataTotal = this.headcountData.filter(x => x.year === year);
    dataTotal.forEach((dataTotal, headcountIndex) => {
      total += +dataTotal.count;
    })
    return total;
  }

  calculateTotalEmployeeIncrementPercentByYear(year: number): string {
    let retVal = '';
    if (year === 1) {
      retVal = '+0%';
    }
    else {
      let prevYearVal = this.calculateTotalEmployeeCountByYear(year - 1);
      let currYearVal = this.calculateTotalEmployeeCountByYear(year);

      let diff = currYearVal - prevYearVal;

      let percent = (diff * 100) / prevYearVal;

      if (percent < 0)
        retVal = '-'
      else
        retVal = '+';

      if (Number.isInteger(percent)) {
        retVal += `${percent}%`; // No decimal point, return the integer value as is
      } else {
        retVal += `${percent.toFixed(2)}`; // Fix value to two decimals
      }

    }

    return retVal;
  }

  calculateTotalEmployeeCountByYearAndCategory(year: number, catId: number): number {
    const filteredData = this.headcountData.filter(entry => entry.year === year && entry.employmentCategoryId === catId);
    const categorySum = +filteredData.reduce((acc, entry) => acc + Number(entry.count), 0);
    return categorySum;
  }

  getHeadCountByCategory_SubCategtory_year(year: number, catId: number, subcatid: number): Headcount {
    /*console.log(`year: ${year}-------------------catId:${catId}-------------------subCatId:${subcatid}`)*/
    var item = this.headcountData.filter(x => x.year === year && x.employmentCategoryId === catId && x.employmentSubCategoryId === subcatid);
    return item[0];
  }

  editHeadCount_Click() {
    const modalRef = this.modalService.open(HeadcountPopupComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    modalRef.componentInstance.headcountData = JSON.parse(JSON.stringify(this.headcountData));
    modalRef.result.then((data) => {
      this.headCountService.save(this.ProductID, data.data,
        // successCallback
        () => {
          this.toastr.success('Item successfully updated', 'HeadCount Process');
          this.loadData();
        }
      );
    }).catch(() => {
    });
  }
 
  prev_click(e: any) {
    if (this.isModified) {
      var options: CustomConfirmOptions = new CustomConfirmOptions();
      options.dialogSize = 'sm';
      options.icon = 'warning';
      options.title = "";
      options.message = "There are some unsaved shanges. Are you sure you want to go back. Your changes will be dicarded."
      options.OkButtonText = "Yes, Go Back";
      options.CancelButtonText = "No, Cancel";

      options.OkCallback = () => {
        this.router.navigate(['..', 'production-capacity'], { relativeTo: this.route });
      }
      this.customModalService.confirm(options);
    }
    else {
      this.router.navigate(['..', 'production-capacity'], { relativeTo: this.route });
    }
  }
  next_click() {
    this.router.navigate(['..', 'raw-material'], { relativeTo: this.route });
  }
}
