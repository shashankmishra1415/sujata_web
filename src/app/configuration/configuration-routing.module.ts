import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentMasterComponent } from './component-master/component-master.component';
import { ConfigurationComponent } from './configuration.component';
import { LookupsComponent } from './lookups/lookups.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  },
  {
    path: 'lookups',
    component: LookupsComponent,
    loadChildren: () => import('./lookups/lookups.module').then(m => m.LookupsModule)
  },
  {
    path: 'component-master',
    component: ComponentMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
