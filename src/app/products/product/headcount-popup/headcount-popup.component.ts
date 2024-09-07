import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Headcount } from 'src/app/_models/headcount.model';
import { EmploymentCategory } from '../../../_models/employment_category.model';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';

@Component({
  selector: 'app-headcount-popup',
  templateUrl: './headcount-popup.component.html',
  styleUrls: ['./headcount-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadcountPopupComponent {

  @Input() headcountData!: Headcount[];
  years = Array(5).fill(0).map((x, i) => i + 1);

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  get getUniqueCategories(): EmploymentCategory[] {
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

    this.headcountData.filter(x => x.employmentCategoryId === catId).forEach(entry => {
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
    var item = this.headcountData.filter(x => x.year === year && x.employmentCategoryId === catId && x.employmentSubCategoryId === subcatid);
    return item[0];
  }


  item_changed(e: any, dataValue: Headcount) {
    if (e.target.value.trim() === '' || dataValue.count === null || undefined) {
      dataValue.count = 0;
    }
    else {
      dataValue.count = e.target.value;
    }
  }

  cancel_click(e: any) {
    e.preventDefault();
    this.activeModal.close({ isSuccess: false });
  }
  save_click(e: any) {
    e.preventDefault();
    this.activeModal.close({ isSuccess: true, data: this.headcountData });
  }

  dismiss_click(e: any) {
    e.preventDefault();
    this.activeModal.dismiss();
  }
}
