import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DashboardComponent } from './product/dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'add',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    component: ProductComponent
  },
  {
    path: ':id/dashboard',
    component: DashboardComponent
  },
  {
    path: ':id',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    component: ProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
