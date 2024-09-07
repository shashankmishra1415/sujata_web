import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { LookupsComponent } from './lookups/lookups.component';
import { ComponentMasterComponent } from './component-master/component-master.component';
import { ComponentPopupComponent } from './component-popup/component-popup.component';
import { FormsModule } from '@angular/forms';
import { NumericOnlyDirective } from '../_directives/NumericOnly/numeric-only.directive';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ConfigurationComponent,
    LookupsComponent,
    ComponentMasterComponent,
    ComponentPopupComponent,
    NumericOnlyDirective
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    NgSelectModule
  ]
})
export class ConfigurationModule { }
