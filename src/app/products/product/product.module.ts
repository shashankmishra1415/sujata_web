import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from '../product/product.component';
import { ProductionCapacityComponent } from './production-capacity/production-capacity.component';
import { HeadCountComponent } from './head-count/head-count.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { AssetsComponent } from './assets/assets.component';
import { DepreciationComponent } from './depreciation/depreciation.component';
import { SalesForecastComponent } from './sales-forecast/sales-forecast.component';
import { PricingComponent } from './pricing/pricing.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';
import { SalesForecastPopupComponent } from './sales-forecast-popup/sales-forecast-popup.component';
import { RawmaterialPopupComponent } from './rawmaterial-popup/rawmaterial-popup.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeadcountPopupComponent } from './headcount-popup/headcount-popup.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { PricingBoxComponent } from './pricing-box/pricing-box.component';



@NgModule({
  declarations: [
    ProductComponent,
    ProductionCapacityComponent,
    HeadCountComponent,
    RawMaterialComponent,
    AssetsComponent,
    DepreciationComponent,
    SalesForecastComponent,
    PricingComponent,
    BalanceSheetComponent,
    FinancialSummaryComponent,
    HeadcountPopupComponent,
    DashboardComponent,
    SalesForecastPopupComponent,
    RawmaterialPopupComponent,
    PricingBoxComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgApexchartsModule,
    FormsModule,
  
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }