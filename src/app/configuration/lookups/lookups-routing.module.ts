import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmploymentCategoriesComponent } from './employment-categories/employment-categories.component';
import { EmploymentSubCategoriesComponent } from './employment-sub-categories/employment-sub-categories.component';
import { ExpenseHeadsComponent } from './expense-heads/expense-heads.component';
import { ManufacturingComponent } from './manufacturing/manufacturing.component';
import { WagesSalariesComponent } from './wages-salaries/wages-salaries.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'manufacturing'
  },
  {
    path: 'manufacturing',
    pathMatch: 'full',
    component: ManufacturingComponent
  },
  {
    path: 'expense',
    pathMatch: 'full',
    component: ExpenseHeadsComponent
  },
  {
    path: 'employment-categories',
    pathMatch: 'full',
    component: EmploymentCategoriesComponent
  },
  {
    path: 'employment-sub-categories',
    pathMatch: 'full',
    component: EmploymentSubCategoriesComponent
  },
  {
    path: 'wages-salaries',
    pathMatch: 'full',
    component: WagesSalariesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
