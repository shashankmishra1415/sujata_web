import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmploymentCategory } from 'src/app/_models/employment_category.model';
import { State } from 'src/app/_models/state.model';
/*import { WagesSalariesPopup } from 'src/app/_models/wages_salaries_popup.model';*/
import { StateService } from 'src/app/_services/state.service';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';
import { wageAndSalaryCategories, WagesSalaries } from '../../../_models/wages_salaries.model';

@Component({
  selector: 'app-wages-salary-popup',
  templateUrl: './wages-salary-popup.component.html',
  styleUrls: ['./wages-salary-popup.component.css']
})
export class WagesSalaryPopupComponent implements OnChanges {
  @Input() States: State[] = []
  @Input() Categories: EmploymentCategory[] = []
  @Input() SubCategories: EmploymentSubCategory[] = []
  @Input() data!: WagesSalaries;

  constructor(private activeModal: NgbActiveModal,private statesName:StateService) {

  }
  ngOnInit(): void{
    this.loadData();
    
  }
  loadData() {
    this.statesName.list((data: State[]) => {
      this.States = data
    });
  }

  filterNonDeleted(cats: wageAndSalaryCategories[]): wageAndSalaryCategories[] {
    return cats.filter(x => x.isDeleted !== true);
  }

  addSubCat_Click() {
    this.data.wageAndSalaryCategories.push({
      id: 0,
      employmentCategoryId: 0,
      employmentCategoryName: '',
      employmentSubCategoryId: 0,
      employmentSubCategoryName: '',
      ratePerMonth: 0,
      isDeleted: false
    })
  }

  removeSubCat_Click(index: number)
  {
    if (this.data.wageAndSalaryCategories[index].id === 0) {
      this.data.wageAndSalaryCategories.splice(index, 1);
    }
    else {
      this.data.wageAndSalaryCategories[index].isDeleted = true;
    }
  }

  save_click()
  {
    // check validation
    this.activeModal.close(this.data);
  }

  cancel_click()
  {
    this.activeModal.close();
  }


  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if(changes["States"] !== undefined && changes["States"].currentValue !== changes["States"].previousValue)
    {
      this.States = changes["States"].currentValue
    }

    if(changes["Categories"] !== undefined && changes["Categories"].currentValue !== changes["Categories"].previousValue)
    {
      this.States = changes["Categories"].currentValue
    }

    if(changes["data"] !== undefined && changes["data"].currentValue !== changes["data"].previousValue)
    {
      this.States = changes["data"].currentValue
    }
  }

  onDateInput(event: Event) {
    this.data.effectiveDate = (event.target as HTMLInputElement).value + 'T00:00:00';
  }
}
