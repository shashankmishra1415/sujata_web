import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ProductsComponent } from '../products/products.component';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    ListComponent,
    ProductsComponent
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    RouterModule,
    TableModule,
    PaginatorModule
  ]
})
export class ProductsModule { }
