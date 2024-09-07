import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './assets/assets.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { DepreciationComponent } from './depreciation/depreciation.component';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';
import { HeadCountComponent } from './head-count/head-count.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProductionCapacityComponent } from './production-capacity/production-capacity.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { SalesForecastComponent } from './sales-forecast/sales-forecast.component';

const routes: Routes = [
  //{
  //  path: '',
  //  pathMatch: 'full',
  //  redirectTo: 'list'
  //},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'production-capacity'
  //  path: '',
  //  pathMatch: 'full',
  //  component: ProductionCapacityComponent
  },
  {
    path: 'production-capacity',
    pathMatch: 'full',
    component: ProductionCapacityComponent
  },
  {
    path: 'head-count',
    component: HeadCountComponent
  },
  {
    path: 'raw-material',
    pathMatch: 'full',
    component: RawMaterialComponent
  },
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: 'depreciation',
    component: DepreciationComponent
  },
  {
    path: 'sales-forecast',
    component: SalesForecastComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'balance-sheet',
    component: BalanceSheetComponent
  },
  {
    path: 'financial-summary',
    component: FinancialSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
