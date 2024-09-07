import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsRoutingModule } from './lookups-routing.module';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { RouterModule } from '@angular/router';
import { ExpenseHeadsComponent } from './expense-heads/expense-heads.component';
import { EmploymentCategoriesComponent } from './employment-categories/employment-categories.component';
import { WagesSalariesComponent } from './wages-salaries/wages-salaries.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WagesSalaryPopupComponent } from './wages-salary-popup/wages-salary-popup.component';
import { EmploymentSubCategoriesComponent } from './employment-sub-categories/employment-sub-categories.component';


@NgModule({
  declarations: [
    ManufacturingComponent,
    ExpenseHeadsComponent,
    EmploymentCategoriesComponent,
    WagesSalariesComponent,
    WagesSalaryPopupComponent,
    EmploymentSubCategoriesComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CommonModule,
    LookupsRoutingModule
  ]
})
export class LookupsModule { }
